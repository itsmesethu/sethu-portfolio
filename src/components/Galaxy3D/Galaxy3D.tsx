'use client';
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface GalaxyProps {
    scrollProgress: React.MutableRefObject<number>;
    mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const PARTICLE_COUNT = 8000;
const BRANCHES = 5;
const RADIUS = 9;
const SPIN = 1.1;
const RANDOMNESS = 0.55;
const RANDOMNESS_POWER = 2.6;
const INNER_COLOR = new THREE.Color('#ff6ad5');
const OUTER_COLOR = new THREE.Color('#3b1aff');

function GalaxyPoints({ scrollProgress, mouse }: GalaxyProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);

    const { positions, colors, scales } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const scales = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const radius = Math.pow(Math.random(), 1.4) * RADIUS;
            const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
            const spinAngle = radius * SPIN;

            const randomX =
                Math.pow(Math.random(), RANDOMNESS_POWER) *
                (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;
            const randomY =
                Math.pow(Math.random(), RANDOMNESS_POWER) *
                (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius * 0.4;
            const randomZ =
                Math.pow(Math.random(), RANDOMNESS_POWER) *
                (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = INNER_COLOR.clone();
            mixedColor.lerp(OUTER_COLOR, radius / RADIUS);
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            scales[i] = Math.random();
        }
        return { positions, colors, scales };
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        const t = state.clock.elapsedTime;
        const scroll = scrollProgress.current;

        // Continuous slow rotation + scroll-driven spin
        pointsRef.current.rotation.y = t * 0.05 + scroll * Math.PI * 2;
        pointsRef.current.rotation.x = -0.35 + scroll * 0.6 + mouse.current.y * 0.15;
        pointsRef.current.rotation.z = mouse.current.x * 0.1;

        // Scroll-driven dolly: galaxy recedes and tilts as you scroll
        const targetScale = 1 - scroll * 0.35;
        pointsRef.current.scale.setScalar(THREE.MathUtils.lerp(pointsRef.current.scale.x, targetScale, 0.1));
        pointsRef.current.position.y = scroll * 4;

        if (materialRef.current) {
            materialRef.current.opacity = THREE.MathUtils.lerp(0.9, 0.25, scroll);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                size={0.05}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors
                transparent
                opacity={0.9}
            />
        </points>
    );
}

function CoreGlow({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;
        const pulse = 1 + Math.sin(t * 1.5) * 0.08;
        meshRef.current.scale.setScalar(pulse * (1 - scrollProgress.current * 0.3));
        const mat = meshRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.55 * (1 - scrollProgress.current * 0.7);
    });
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshBasicMaterial color="#ffd1f5" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
        </mesh>
    );
}

function FloatingDust({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(400 * 3);
        for (let i = 0; i < 400; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 30;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return arr;
    }, []);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.current.x * 0.05;
    });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#9fb4ff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
        </points>
    );
}

function Rig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const { camera } = useThree();
    useFrame(() => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 1.5, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 1.2 + 1.5, 0.04);
        camera.lookAt(0, 0, 0);
    });
    return null;
}

const Galaxy3D: React.FC<GalaxyProps> = ({ scrollProgress, mouse }) => {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.75]}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={62} />
            <Suspense fallback={null}>
                <GalaxyPoints scrollProgress={scrollProgress} mouse={mouse} />
                <CoreGlow scrollProgress={scrollProgress} />
                <FloatingDust mouse={mouse} />
            </Suspense>
            <Rig mouse={mouse} />
            <fog attach="fog" args={['#05030f', 10, 22]} />
        </Canvas>
    );
};

export default Galaxy3D;
