'use client'

import Image from "next/image";
import VantaBackground from "../components/VantaBackground"
import Input from "../components/Input"
import { useState, useRef, useEffect } from "react";
import Slider from '@mui/material/Slider';
import html2canvas from "html2canvas";


export default function Home() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bottomText, setBottomText] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [option, setOption] = useState("option1");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [titleSize, setTitleSize] = useState(30)
  const [subtitleSize, setSubtitleSize] = useState(16);
  const [bottomTextSize, setBottomTextSize] = useState(12);
  const [titleFont, setTitleFont] = useState("font-1");
  const [subTitleFont, setSubTitleFont] = useState("font-1");
  const [bottomTextFont, setBottomTextFont] = useState("font-1");
  const [titlePosition, setTitlePosition] = useState(8);
  const [subTitlePosition, setSubtitlePosition] = useState(15);
  const [bottomtextPosition, setBottomTextPosition] = useState(68);
  const [imagePosition, setImagePosition] = useState(24);
  const [borderRadius, setBorderRadius] = useState(0);
  const [borderThickness, setBorderThickness] = useState(0);
  const [borderColor, setBorderColor] = useState("black");

  async function uploadFile(e?: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    const files = e?.target?.files ?? fileInput.current?.files;

    if (files && files[0]) {
      formData.append("file", files[0]);
      setSelectedFileName(files[0].name);
      console.log("Submitted", files[0].name);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Error uploading file:', response.status, response.statusText, text);
          return;
        }
        try {
          const data = await response.json();
          console.log('Upload response:', data);
          if (data && data.url) setUploadedUrl(data.url);
        } catch (e) {
          console.log('Upload succeeded but response not JSON');
        }
      } catch (error) {
        console.error('Network error uploading file:', error);
      }
    }
  }

  async function downloadFile() {
    const poster = document.getElementById("poster");
    if (!poster) return;

    const rect = poster.getBoundingClientRect();

    const canvas = await html2canvas(poster, {
      useCORS: true,
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0,
      windowWidth: rect.width,
      windowHeight: rect.height,
    });

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "WildWestPoster.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div>
      <div className="position-relative">
        <VantaBackground />
      </div>
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-8xl font-3 underline mt-10">Wild West Poster Generator</h1>
        <h2 className="text-4xl font-1 mt-20">Generate your Wild West Poster in 3 easy steps!</h2>
        <p className="mt-10 font-subtitle text-xl">1. Upload your image!<br />2. Customize your poster!<br />3. Download and print!</p>
      </div>
      <div className="flex mt-20 items-start gap-10">
        <div className="flex-1">
        <div className="items-center justify-center flex flex-col">
            <h1 className="text-4xl font-1 mb-4">Edit your poster</h1>
        </div>
        <div className="space-y-3 mt-12">
            <div className="flex flex-row">
              <Input placeholder="Title" className="h-15" onChange={(e) => setTitle(e.target.value)}/>
              <select
                value={titleFont}
                onChange={(e) => setTitleFont(e.target.value)}
                className="text-center focus:outline-0 inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer">
                <option value="font-1">Font 1</option>
                <option value="font-2">Font 2</option>
                <option value="font-3">Font 3</option>
                <option value="font-4">Font 4</option>
              </select>
            </div>
            <p className="font-subtitle text-gray-700">Title Size: {titleSize}</p>
            <Slider
              className="w-full"
              defaultValue={30}
              min={8}
              max={50}
              onChange={(e) => setTitleSize(e.target?.value as number)}
            />
            <p className="font-subtitle text-gray-700">Title Position: {titlePosition}</p>
            <Slider
              className="w-full"
              defaultValue={8}
              min={5}
              max={30}
              onChange={(e) => setTitlePosition(e.target?.value as number)}
            />
            <div className="flex flex-row">
              <Input placeholder="Subtitle" className="h-15" onChange={(e) => setSubtitle(e.target.value)}/>
              <select
                value={subTitleFont}
                onChange={(e) => setSubTitleFont(e.target.value)}
                className="text-center focus:outline-0 inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer">
                <option value="font-1">Font 1</option>
                <option value="font-2">Font 2</option>
                <option value="font-3">Font 3</option>
                <option value="font-4">Font 4</option>
              </select>
            </div>
            <p className="font-subtitle text-gray-700">Subtitle Size: {subtitleSize}</p>
            <Slider
              className="w-full"
              defaultValue={16}
              min={4}
              max={30}
              onChange={(e) => setSubtitleSize(e.target?.value as number)}
            />
            <p className="font-subtitle text-gray-700">Subtitle Position: {subTitlePosition}</p>
            <Slider
              className="w-full"
              defaultValue={15}
              min={10}
              max={65}
              onChange={(e) => setSubtitlePosition(e.target?.value as number)}
            />
            <div className="flex flex-row">
              <Input placeholder="Bottom Text" className="h-15" onChange={(e) => setBottomText(e.target.value)}/>
              <select
                value={bottomTextFont}
                onChange={(e) => setBottomTextFont(e.target.value)}
                className="text-center focus:outline-0 inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer">
                <option value="font-1">Font 1</option>
                <option value="font-2">Font 2</option>
                <option value="font-3">Font 3</option>
                <option value="font-4">Font 4</option>
              </select>
            </div>
            <p className="font-subtitle text-gray-700">Bottom Text Size: {bottomTextSize}</p>
            <Slider
              className="w-full"
              defaultValue={12}
              min={2}
              max={28}
              onChange={(e) => setBottomTextSize(e.target?.value as number)}
            />
            <p className="font-subtitle text-gray-700">Bottom Text Position: {bottomtextPosition}</p>
            <Slider
              className="w-full"
              defaultValue={68}
              min={50}
              max={75}
              onChange={(e) => setBottomTextPosition(e.target?.value as number)}
            />
            <input
              id="file-upload"
              className="hidden"
              type="file"
              ref={fileInput}
              onChange={uploadFile}
            />
            
            <label
              htmlFor="file-upload"
              className="w-full inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-4 px-4 rounded-xl h-15 text-2xl cursor-pointer">
              {selectedFileName ?? "Upload Image"}
            </label>
            <p className="font-subtitle text-gray-700">Image Position: {imagePosition}</p>
            <Slider
              className="w-full"
              defaultValue={24}
              min={10}
              max={40}
              onChange={(e) => setImagePosition(e.target?.value as number)}
            />
            <p className="font-subtitle text-gray-700">Border Radius: {borderRadius}</p>
            <Slider
              className="w-full"
              defaultValue={0}
              min={0}
              max={100}
              onChange={(e) => setBorderRadius(e.target?.value as number)}
            />
            <p className="font-subtitle text-gray-700">Border Thickness: {borderThickness}</p>
            <Slider
              className="w-full"
              defaultValue={0}
              min={0}
              max={20}
              onChange={(e) => setBorderThickness(e.target?.value as number)}
            />
            <p className="font-subtitle text-gray-700">Border Color: {borderColor}</p>
            <select
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="text-center focus:outline-0 w-full inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl mt-6 h-15 text-2xl cursor-pointer"
              >
                <option value="black">Black</option>
                <option value="grey">Grey</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
        </div>
        </div>

        <div className="flex-1">
          <div className="relative w-full mx-auto overflow-hidden"  style={{ width: '600px', height: '800px' }} id="poster">
            <img
              src={`/${option}.png`}
              alt="Example Poster"
              width={600}
              height={800}
              className="rounded-lg shadow-lg block absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center p-6">
              <div className={`absolute pointer-events-auto text-center w-full`} style={{ top: `${titlePosition * 10}px` }}>
                <h1 className={`${titleFont} text-black max-w-full break-words whitespace-normal`} style={{ fontSize: `${titleSize}px` }}>{title}</h1>
              </div>
              <div className={`absolute pointer-events-auto text-center w-full`} style={{ top: `${subTitlePosition * 10}px` }}>
                <p className={`${subTitleFont} text-black max-w-full break-words whitespace-normal`} style={{ fontSize: `${subtitleSize}px` }}>{subtitle}</p>
              </div>
              <img
                src="/upload-file.png"
                key="/upload-file.png"
                width={300}
                height={300}
                alt="Uploaded"
                className="absolute object-contain mx-auto border-3 border-black"
                style={{ top: `${imagePosition * 10}px`, borderRadius: `${borderRadius}px`, border: `${borderThickness}px solid ${borderColor}` }}
              />
              <div className={`absolute pointer-events-auto text-center w-full`} style={{ top: `${bottomtextPosition * 10}px` }}>
                <p className={`${bottomTextFont} text-black mt-4 mb-4 max-w-full break-words whitespace-normal`} style={{ fontSize: `${bottomTextSize}px` }}>{bottomText}</p>
              </div>
            </div>
          </div>
            <button
                className="w-full inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl mt-6 h-15 text-2xl cursor-pointer" onClick={downloadFile}>
                Download Image
              </button>
              <select
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className="text-center focus:outline-0 w-full inline-flex items-center justify-center transition-all duration-100 bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl mt-6 h-15 text-2xl cursor-pointer"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
        </div>
      </div>
    </div>
  );
}
