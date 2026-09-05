import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Canvas, useFrame  } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Leva, useControls } from 'leva'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { easing } from 'maath'
import OverlayText from './OverlayText.jsx'

const root = createRoot(document.querySelector('#root'))

const isDesktop = window.innerWidth > 1200

const cameraPosition = {
    x: 2.0,
    y: 1.0,
    z: 2.25
}

function RotateCamera() {
    const startX = cameraPosition.x
    const startZ = cameraPosition.z

    const radius = Math.sqrt(startX ** 2 + startZ ** 2) 
    const initialAngle = Math.atan2(startX, startZ)
    const height = 1.0

    useFrame((state, delta) => {
        const angleOffset = - state.pointer.x * 0.1
        const angle = initialAngle + angleOffset

        const target = [
            Math.sin(angle) * radius,
            height + state.pointer.y * 0.1,
            Math.cos(angle) * radius
        ]

        easing.damp3(state.camera.position, target, 0.5, delta)

        state.camera.lookAt(0, 0, 0)
    })

    return null
}


root.render(
    <StrictMode>
        <Leva hidden={!isDesktop} />
        <Canvas
            gl={{ antialias: true }}
            dpr={[ 1, 2 ]}
            orthographic
            flat
            camera={ {
                zoom: 360,
                near: 0.1,
                far: 12,
                position: [cameraPosition.x, cameraPosition.y, cameraPosition.z]
            } }
        >
            <RotateCamera />
            <Experience />
        </Canvas>
        <OverlayText />
    </StrictMode>
)
