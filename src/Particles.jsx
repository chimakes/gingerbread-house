import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Particles({ count}) {
    const meshRef = useRef()
    const particles = useRef([])
    const dummy = new THREE.Object3D()

    useEffect(() => {
        particles.current = []

        for (let i = 0; i < count; i++) {
            const particle = {
                x: (Math.random() - 0.5) * 4,
                y: Math.random() * 2.3 - 0.8,
                z: (Math.random() - 0.5) * 4,
                scale: Math.random() * 2 + 0.5,
                speedX: Math.random() * 1.0 + 0.2,
                speedY: Math.random() * 1.0 + 0.2,
                speedZ: Math.random() * 1.0 + 0.2
            }

            particles.current.push(particle)
        }
    }, [count])

    useFrame((state) => {
        const time = state.clock.elapsedTime

        particles.current.forEach((position, i) => {
            const x = position.x + Math.sin(time * position.speedX + i) * 0.05
            const y = position.y + Math.sin(time * position.speedY + i) * 0.03
            const z = position.z + Math.sin(time * position.speedZ + i) * 0.05

            dummy.position.set(x, y, z)
            dummy.scale.setScalar(position.scale)

            dummy.updateMatrix()

            meshRef.current.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })
    
    return (
        <>
            <instancedMesh ref={meshRef} args={[null, null, count]}>
                <sphereGeometry args={[0.005, 8, 8]} />
                <meshBasicMaterial color={[2.0, 2.0, 2.8]} transparent opacity={0.7} />
            </instancedMesh>
        </>
    )
}