import React, { useRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { Skull } from './Skull'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer, Bloom } from '@react-three/postprocessing'

extend({ OrbitControls });
function GhostCard() {
    // const camera=useRef()
    // const gl=useRef()
    const CameraControls = () => {
        const {
            camera,
            gl: { domElement },
        } = useThree();

        // Ref to the controls, so that we can update them on every frame using useFrame
        const controls = useRef();
        useFrame((state) => controls.current.update());
        return (
            <orbitControls
                ref={controls}
                args={[camera, domElement]}
                enableZoom={false}
            
            />
        );
    };

    return (
        <Canvas >
            <Suspense fallback={null}>
                <CameraControls />
                <perspectiveCamera makeDefault fov={30} near={1} far={10000} aspect={1301 / 2 / window.innerHeight} position={[0, -3.5, 30]} />
                {/* <directionalLight color="white" intensity={0.8} position={[200, 200, 200]} castShadow={true} /> */}
                <group position={[0,1,0]}>
                    <EffectComposer>
                        <Bloom luminanceThreshold={0} intensity={0.8} radius={1.29} levels={10} />
                    </EffectComposer>

                    <Skull />
                    <mesh position={[-0.55, -0.6, 1]} scale={[0.27, 0.27, 0.27]}>
                        <sphereGeometry args={[1.5, 32, 32]} />
                        <meshBasicMaterial color="#0096FF" />
                    </mesh>
                    <mesh position={[0.55, -0.6, 1]} scale={[0.27, 0.27, 0.27]}>
                        <sphereGeometry args={[1.5, 32, 32]} />
                        <meshBasicMaterial color="#0096FF" />
                    </mesh>
                </group>

            </Suspense>
        </Canvas>
    )
}

export default GhostCard
