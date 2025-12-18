
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Experience from './components/Experience';
import UIOverlay from './components/UIOverlay';
import { TreeMorphState } from './types';

// Removed manual JSX augmentation as it can conflict with @react-three/fiber's built-in types

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeMorphState>(TreeMorphState.SCATTERED);

  const handleToggle = () => {
    setTreeState(prev => 
      prev === TreeMorphState.SCATTERED 
        ? TreeMorphState.TREE_SHAPE 
        : TreeMorphState.SCATTERED
    );
  };

  return (
    <div className="relative w-full h-full bg-[#212529]">
      <Suspense fallback={null}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ 
            antialias: false, 
            toneMapping: 4, 
            toneMappingExposure: 1.5 
          }}
        >
          <color attach="background" args={['#212529']} />
          <fog attach="fog" args={['#212529', 20, 60]} />
          
          <Experience treeState={treeState} />
        </Canvas>
      </Suspense>
      
      <UIOverlay 
        currentState={treeState} 
        onToggleState={handleToggle} 
      />
      
      <Loader 
        containerStyles={{ background: '#212529' }}
        barStyles={{ background: '#FFD700', height: '2px' }}
        dataStyles={{ fontFamily: 'serif', color: '#FFD700' }}
      />
    </div>
  );
};

export default App;
