"use client";

import { motion } from "framer-motion";
import Slider from "@mui/material/Slider";

export default function CustomizeImage({
  uploadFile,
  fileInput,
  selectedFileName,
  imagePosition,
  setImagePosition,
  borderRadius,
  setBorderRadius,
  borderThickness,
  setBorderThickness,
  borderColor,
  setBorderColor,
  imageSize,
  setImageSize
}) {
  return (
    <motion.div 
      className="space-y-3 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <input id="file-upload" className="hidden" type="file" ref={fileInput} onChange={uploadFile} />
        <motion.label
            htmlFor="file-upload"
            className="w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-4 px-4 rounded-xl h-15 text-2xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {selectedFileName ?? "Upload Image"}
        </motion.label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="font-subtitle text-gray-700">Image Position: {imagePosition}</p>
        <Slider min={10} max={40} value={imagePosition} onChange={(e, v) => setImagePosition(v)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <p className="font-subtitle text-gray-700">Border Radius: {borderRadius}</p>
        <Slider min={0} max={100} value={borderRadius} onChange={(e, v) => setBorderRadius(v)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <p className="font-subtitle text-gray-700">Border Thickness: {borderThickness}</p>
        <Slider min={0} max={20} value={borderThickness} onChange={(e, v) => setBorderThickness(v)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <p className="font-subtitle text-gray-700">Image Size: {imageSize}</p>
        <Slider min={100} max={500} value={imageSize} onChange={(e, v) => setImageSize(v)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex flex-row"
      >
        <p className="font-1 text-2xl whitespace-nowrap mt-4 mr-6">Border Color:</p>
        <motion.select
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="text-center focus:outline-0 w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl h-15 text-2xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="white">White</option>
            <option value="pink">Pink</option>
            <option value="brown">Brown</option>
            <option value="gray">Gray</option>
        </motion.select>
      </motion.div>
    </motion.div>
  );
}