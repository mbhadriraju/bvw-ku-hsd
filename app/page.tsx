'use client'

import Image from "next/image";
import VantaBackground from "../components/VantaBackground"
import Input from "../components/Input"
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bottomText, setBottomText] = useState("");

  function uploadImage() {
    console.log("Image uploaded")
  }

  return (
    <div>
      <div className="position-relative">
        <VantaBackground />
      </div>
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-8xl font-title underline mt-10">Wild West Poster Generator</h1>
        <h2 className="text-4xl font-title mt-20">Generate your Wild West Poster in 3 easy steps!</h2>
        <p className="mt-10 font-subtitle text-xl">1. Upload your image!<br />2. Customize your poster!<br />3. Download and print!</p>
      </div>
      <div className="flex mt-20 items-start gap-10">
        <div className="flex-1">
        <div className="items-center justify-center flex flex-col">
            <h1 className="text-4xl font-title mb-4">Edit your poster</h1>
        </div>
        <div className="space-y-30 mt-12">
            <Input placeholder="Title" className="h-15" onChange={(e) => setTitle(e.target.value)}/>
            <Input placeholder="Subtitle" className="h-15" onChange={(e) => setSubtitle(e.target.value)}/>
            <Input placeholder="Bottom Text" className="h-15" onChange={(e) => setSubtitle(e.target.value)}/>
            <button className="w-full transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-title py-2 px-4 rounded-xl mt-10 h-15 text-2xl" onClick={uploadImage}>Upload Image</button>
        </div>
        </div>

        {/* Right side: poster preview */}
        <div className="flex-1">
          <Image
            src="/example_poster.png"
            alt="Example Poster"
            width={600}
            height={800}
            className="rounded-lg shadow-lg"
          />
          <p>{title}</p>
          <p>{subtitle}</p>
          <p>{bottomText}</p>
        </div>
      </div>
    </div>
  );
}
