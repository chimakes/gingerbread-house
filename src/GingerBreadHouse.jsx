import { useAnimations, useGLTF, useTexture } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function GingerBreadHouse({scale, positionY}) {
    const { scene, animations } = useGLTF('./models/gingerbreadhouse4.glb')
    const waveAnimation = useAnimations(animations, scene)
    const bakedTexture = useTexture('./textures/baked_texture4.webp')
    bakedTexture.flipY = false
    bakedTexture.colorSpace = THREE.SRGBColorSpace
    
    const timer = useRef(0)
    const animationPlayed = useRef(false)

    const action = waveAnimation.actions.Wave

    const playWaveAnimation = () => {
        action.reset()
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play()
    }
    
    // loop animation
    const initialDelay = 1.5
    const loopInterval = 8
    timer.current = -initialDelay
    useFrame((_, delta) => {
        timer.current += delta
        if(timer.current >= loopInterval){
            playWaveAnimation()
            timer.current = 0
        }
    })

    // texture
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    map: bakedTexture
                })
            }
        })
    }, [scene, bakedTexture])

    // play first animation
    useEffect(() => {
        setTimeout(() => {
            playWaveAnimation()
            animationPlayed.current = true
        }, initialDelay * 1000)
    }, [])

    return <>
        <primitive object={scene} position-y={positionY} scale={scale}/>
    </>
}