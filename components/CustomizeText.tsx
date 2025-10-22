"use client";

import { motion } from "framer-motion";
import Slider from "@mui/material/Slider";
import Input from "./Input";

export default function CustomizeText({
  title,
  subtitle,
  bottomText,
  setTitle,
  setSubtitle,
  setBottomText,
  titleSize,
  subtitleSize,
  bottomTextSize,
  setTitleSize,
  setSubtitleSize,
  setBottomTextSize,
  titleFont,
  subTitleFont,
  bottomTextFont,
  setTitleFont,
  setSubTitleFont,
  setBottomTextFont,
  titlePosition,
  subTitlePosition,
  bottomtextPosition,
  setTitlePosition,
  setSubtitlePosition,
  setBottomTextPosition,
  titleColor,
  setTitleColor,
  subTitleColor,
  setSubTitleColor,
  bottomTextColor,
  setBottomTextColor
}) {
  return (
    <motion.div 
      className="space-y-3 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-row"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Input
          placeholder="Name"
          className="h-15"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <motion.select
          value={titleColor}
          onChange={(e) => setTitleColor(e.target.value)}
          className="text-center focus:outline-0 inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer"
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
        <motion.select
          value={titleFont}
          onChange={(e) => setTitleFont(e.target.value)}
          className="text-center focus:outline-0 inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="font-1">Font 1</option>
          <option value="font-2">Font 2</option>
          <option value="font-3">Font 3</option>
          <option value="font-4">Font 4</option>
        </motion.select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="font-subtitle text-gray-700">Title Size: {titleSize}</p>
        <Slider min={8} max={50} value={titleSize} onChange={(e, v) => setTitleSize(v)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <p className="font-subtitle text-gray-700">Title Position: {titlePosition}</p>
        <Slider min={5} max={30} value={titlePosition} onChange={(e, v) => setTitlePosition(v)} />
      </motion.div>

      <motion.div 
        className="flex flex-row"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Input
          placeholder="Location"
          className="h-15"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <motion.select
          value={subTitleColor}
          onChange={(e) => setSubTitleColor(e.target.value)}
          className="text-center focus:outline-0 inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer"
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
        <motion.select
          value={subTitleFont}
          onChange={(e) => setSubTitleFont(e.target.value)}
          className="text-center focus:outline-0 inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="font-1">Font 1</option>
          <option value="font-2">Font 2</option>
          <option value="font-3">Font 3</option>
          <option value="font-4">Font 4</option>
        </motion.select>
      </motion.div>

      <p className="font-subtitle text-gray-700">Subtitle Size: {subtitleSize}</p>
      <Slider min={4} max={30} value={subtitleSize} onChange={(e, v) => setSubtitleSize(v)} />

      <p className="font-subtitle text-gray-700">Subtitle Position: {subTitlePosition}</p>
      <Slider min={10} max={65} value={subTitlePosition} onChange={(e, v) => setSubtitlePosition(v)} />

      <motion.div 
        className="flex flex-row"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <Input
          placeholder="Bottom Text"
          className="h-15"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <motion.select
          value={bottomTextColor}
          onChange={(e) => setBottomTextColor(e.target.value)}
          className="text-center focus:outline-0 inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer"
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
        <motion.select
          value={bottomTextFont}
          onChange={(e) => setBottomTextFont(e.target.value)}
          className="text-center focus:outline-0 inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 ml-4 rounded-xl px-4 h-15 text-2xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="font-1">Font 1</option>
          <option value="font-2">Font 2</option>
          <option value="font-3">Font 3</option>
          <option value="font-4">Font 4</option>
        </motion.select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <p className="font-subtitle text-gray-700">Bottom Size: {bottomTextSize}</p>
        <Slider min={2} max={28} value={bottomTextSize} onChange={(e, v) => setBottomTextSize(v)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      >
        <p className="font-subtitle text-gray-700">Bottom Position: {bottomtextPosition}</p>
        <Slider min={50} max={75} value={bottomtextPosition} onChange={(e, v) => setBottomTextPosition(v)} />
      </motion.div>
    </motion.div>
  );
}