import { OrbitControls } from "@react-three/drei"
import GingerBreadHouse from "./GingerBreadHouse.jsx"
import { Perf } from 'r3f-perf'
import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { useThree } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing"
import { Leva, useControls } from "leva"
import Particles from "./Particles.jsx"

function ResponsiveGingerBreadHouse() {
  const [scale, setScale] = useState(6)
  const [positionY, setPositionY] = useState(-0.85)

  useLayoutEffect(() => {
    function updateSize() {
        const width = window.innerWidth;

        if(width <= 500) {
            setScale(3.2)
            setPositionY(-0.6)
        }
        else if (width <= 800) {
            setScale(4.5)
        } else {
            setScale(5.7)
            setPositionY(-0.85)
        }
    }

    updateSize()

    window.addEventListener("resize", updateSize)

    return () => window.removeEventListener("resize", updateSize);
    
  }, [])

  return <GingerBreadHouse positionY={positionY} scale={scale} />
}

const isDesktop = window.innerWidth > 1200

export default function Experience()
{    
    const {showPerf, enableBloom, enableDOF, focusDistance, focalLength, bokehScale} = useControls({
        showPerf: false,
        enableBloom: true,
        enableDOF: true
    })

    return <>
        <EffectComposer>
            {enableDOF && isDesktop && (
                <DepthOfField
                    focusDistance={1.12}
                    focalLength={6.05}
                    bokehScale={2.0}
                />
            )}
            {enableBloom && (
                <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.3} />
            )}
        </EffectComposer>
        
        {showPerf && (<Perf position="top-left" /> )}

        <color args={ ['#626877'] } attach={"background"} />
        <OrbitControls makeDefault enableZoom={false} enablePan={false} enableRotate={false} />

        <Suspense>
            <ResponsiveGingerBreadHouse />
        </Suspense>
        <Particles count={50} />
    </>
}