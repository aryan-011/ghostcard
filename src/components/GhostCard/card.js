
import React,{useRef} from 'react'
import Plane from './plane';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { Skull } from './Skull'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer, Bloom } from '@react-three/postprocessing'

extend({ OrbitControls });
function Card() {
    const composer=useRef(null);
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
            <group position={[0,0,0]} scale={[0.1,0.1,0.1]}>
                <EffectComposer ref={composer}>
                    <Bloom luminanceThreshold={0} intensity={0.8} radius={1.29} levels={10} />
                </EffectComposer>

                <Plane composer={composer}/>
            </group>

        </Suspense>
    </Canvas>
    )
}

export default Card
