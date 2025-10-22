"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

import VantaBackground from "../components/VantaBackground";
import Poster from "../components/Poster";
import CustomizeText from "../components/CustomizeText";
import CustomizeImage from "../components/CustomizeImage";

export default function Home() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [titleSize, setTitleSize] = useState(30);
  const [subtitleSize, setSubtitleSize] = useState(16);
  const [bottomTextSize, setBottomTextSize] = useState(12);
  const [titleFont, setTitleFont] = useState("font-1");
  const [subTitleFont, setSubTitleFont] = useState("font-1");
  const [bottomTextFont, setBottomTextFont] = useState("font-1");
  const [titlePosition, setTitlePosition] = useState(8);
  const [subTitlePosition, setSubtitlePosition] = useState(15);
  const [bottomtextPosition, setBottomTextPosition] = useState(68);
  const [imageSize, setImageSize] = useState(300);
  const [imagePosition, setImagePosition] = useState(24);
  const [borderRadius, setBorderRadius] = useState(0);
  const [borderThickness, setBorderThickness] = useState(0);
  const [borderColor, setBorderColor] = useState("black");
  const [option, setOption] = useState("option1");
  const [editMode, setEditMode] = useState("text");
  const [titleColor, setTitleColor] = useState("black");
  const [subTitleColor, setSubTitleColor] = useState("black");
  const [bottomTextColor, setBottomTextColor] = useState("black");

  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile(e: any) {
    const formData = new FormData();
    const files = e?.target?.files ?? fileInput.current?.files;
    if (files && files[0]) {
      formData.append("file", files[0]);
      setSelectedFileName(files[0].name);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      if (response.ok) {
        const data = await response.json();
        setUploadedUrl(data.url);
      }
    }
  }

  async function downloadFile() {
    const poster = document.getElementById("poster");
    if (!poster) return;
    const canvas = await html2canvas(poster, { useCORS: true });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "WildWestPoster.png";
    a.click();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <VantaBackground />

      <motion.div 
        className="justify-center flex flex-col items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.h1 
          className="text-8xl font-2 underline mt-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Wild West Poster Generator
        </motion.h1>
        <motion.h2 
          className="text-4xl font-1 mt-20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Generate your Wild West Poster in 3 easy steps!
        </motion.h2>
        <motion.p 
          className="mt-10 font-subtitle text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          1. Upload your image!<br />2. Customize your poster!<br />3. Download and print!
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex mt-20 items-start gap-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div 
          className="flex-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.h1 
            className="text-4xl font-1 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            Edit your poster
          </motion.h1>
          
          <motion.div 
            className="flex gap-4 mb-6 bg-gray-200 p-2 rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            <motion.button
              onClick={() => setEditMode("text")}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-1 ${
                editMode === "text" 
                  ? "bg-gray-400 text-black" 
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Edit Text
            </motion.button>
            <motion.button
              onClick={() => setEditMode("image")}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-1 ${
                editMode === "image" 
                  ? "bg-gray-400 text-black" 
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Edit Image
            </motion.button>
          </motion.div>

          {/* Conditional rendering based on edit mode */}
          <motion.div
            key={editMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {editMode === "text" && (
              <CustomizeText
                title={title}
                subtitle={subtitle}
                bottomText={bottomText}
                setTitle={setTitle}
                setSubtitle={setSubtitle}
                setBottomText={setBottomText}
                titleSize={titleSize}
                subtitleSize={subtitleSize}
                bottomTextSize={bottomTextSize}
                setTitleSize={setTitleSize}
                setSubtitleSize={setSubtitleSize}
                setBottomTextSize={setBottomTextSize}
                titleFont={titleFont}
                subTitleFont={subTitleFont}
                bottomTextFont={bottomTextFont}
                setTitleFont={setTitleFont}
                setSubTitleFont={setSubTitleFont}
                setBottomTextFont={setBottomTextFont}
                titlePosition={titlePosition}
                subTitlePosition={subTitlePosition}
                bottomtextPosition={bottomtextPosition}
                setTitlePosition={setTitlePosition}
                setSubtitlePosition={setSubtitlePosition}
                setBottomTextPosition={setBottomTextPosition}
                titleColor={titleColor}
                setTitleColor={setTitleColor}
                subTitleColor={subTitleColor}
                setSubTitleColor={setSubTitleColor}
                bottomTextColor={bottomTextColor}
                setBottomTextColor={setBottomTextColor}
              />
            )}

            {editMode === "image" && (
              <CustomizeImage
                uploadFile={uploadFile}
                fileInput={fileInput}
                selectedFileName={selectedFileName}
                imagePosition={imagePosition}
                setImagePosition={setImagePosition}
                borderRadius={borderRadius}
                setBorderRadius={setBorderRadius}
                borderThickness={borderThickness}
                setBorderThickness={setBorderThickness}
                borderColor={borderColor}
                setBorderColor={setBorderColor}
                imageSize={imageSize}
                setImageSize={setImageSize}
              />
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Poster
            option={option}
            title={title}
            subtitle={subtitle}
            bottomText={bottomText}
            uploadedUrl={uploadedUrl}
            titleFont={titleFont}
            subTitleFont={subTitleFont}
            bottomTextFont={bottomTextFont}
            titleSize={titleSize}
            subtitleSize={subtitleSize}
            bottomTextSize={bottomTextSize}
            titlePosition={titlePosition}
            subTitlePosition={subTitlePosition}
            bottomtextPosition={bottomtextPosition}
            imagePosition={imagePosition}
            imageSize={imageSize}
            borderRadius={borderRadius}
            borderThickness={borderThickness}
            borderColor={borderColor}
            titleColor={titleColor}
            subTitleColor={subTitleColor}
            bottomTextColor={bottomTextColor}
          />

          <motion.button
            onClick={downloadFile}
            className="w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl mt-6 h-15 text-2xl cursor-pointer"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Poster
          </motion.button>

          <motion.select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="text-center w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl mt-6 h-15 text-2xl cursor-pointer focus:outline-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </motion.select>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}