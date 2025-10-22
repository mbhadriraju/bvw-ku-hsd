"use client"; // Marks this component as client-side for Next.js
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Three.js library required by Vanta.js
import FOG from "vanta/dist/vanta.fog.min"; // Import the Vanta Fog effect

export default function VantaBackground() {
  // Ref to attach the Vanta effect to a DOM element
  const vantaRef = useRef<HTMLDivElement | null>(null);

  // State to store the Vanta effect instance
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null);

  // Initialize Vanta effect on mount and clean up on unmount
  useEffect(() => {
    // Only initialize if there is no existing effect and the ref is attached
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
            el: vantaRef.current, // DOM element to attach the effect
            THREE, // Pass Three.js instance
            highlightColor: 0xe19524, // Highlight color for fog
            midtoneColor: 0xc8898d,   // Midtone color for fog
            lowlightColor: 0xdfdfdf,  // Lowlight color for fog
            baseColor: 0xffe0cd,      // Background/base color
            blurFactor: 0.50,         // Amount of blur in the effect
            preserveDrawingBuffer: true // Keeps the canvas image after rendering
        })
      );
    }

    // Cleanup: destroy Vanta effect on component unmount
    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]); // Re-run effect only if vantaEffect changes

  // Render a div that will hold the Vanta background effect
  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}