"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min"; 

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
            el: vantaRef.current,
            THREE,
            highlightColor: 0xe19524,
            midtoneColor: 0xc8898d,
            lowlightColor: 0xdfdfdf,
            baseColor: 0xffe0cd,
            blurFactor: 0.50,
            preserveDrawingBuffer: true 
        })
      );
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}