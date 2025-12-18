
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { TreeMorphState } from '../types';
import { easing } from 'maath';
import * as THREE from 'three';

// Removed manual JSX augmentation as it can conflict with @react-three/fiber's built-in types

interface FloatingOrnamentsProps {
  state: TreeMorphState;
}

const FloatingOrnaments: React.FC<FloatingOrnamentsProps> = ({ state }) => {
  const starRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const blendRef = useRef(0);

  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1;
    const innerRadius = 0.5;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    });
  }, []);

  useFrame((stateThree, delta) => {
    if (!starRef.current) return;

    const targetBlend = state === TreeMorphState.TREE_SHAPE ? 1 : 0;
    easing.damp(blendRef, 'current', targetBlend, 1.0, delta);
    const t = blendRef.current;

    const treeTopY = 8.2;
    const scatterY = 15;
    
    starRef.current.position.y = THREE.MathUtils.lerp(scatterY, treeTopY, t);
    starRef.current.scale.setScalar(THREE.MathUtils.lerp(0, 1.2, t));
    starRef.current.rotation.y += delta * 0.8;
    starRef.current.position.y += Math.sin(stateThree.clock.elapsedTime * 2) * 0.05;

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.8 + Math.sin(stateThree.clock.elapsedTime * 2) * 0.4;
    }
  });

  return (
    <group ref={starRef} position={[0, 0, 0]}>
      <mesh geometry={starGeometry}>
        <meshStandardMaterial 
          ref={materialRef}
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={1}
          toneMapped={false}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

export default FloatingOrnaments;
