"use client";
import { motion } from "framer-motion";

export default function Poster({
  option,
  title,
  subtitle,
  bottomText,
  uploadedUrl,
  titleFont,
  subTitleFont,
  bottomTextFont,
  titleSize,
  subtitleSize,
  bottomTextSize,
  titlePosition,
  subTitlePosition,
  bottomtextPosition,
  imageSize,
  imagePosition,
  borderRadius,
  borderThickness,
  borderColor,
  titleColor,
  subTitleColor,
  bottomTextColor,
}) {
  return (
    <motion.div
      className="relative w-full mx-auto overflow-hidden"
      style={{ width: "600px", height: "800px" }}
      id="poster"
    >
      <motion.img
        src={`/${option}.png`}
        alt="Example Poster"
        className="rounded-lg shadow-lg block absolute top-0 left-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center p-6">
        {/* Title */}
        <motion.div
          className="absolute text-center w-full"
          style={{ top: `${titlePosition * 10}px` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className={`${titleFont} max-w-full break-words whitespace-normal`}
            style={{ fontSize: `${titleSize}px`, color: `${titleColor}` }}
          >
            {title}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="absolute text-center w-full"
          style={{ top: `${subTitlePosition * 10}px` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className={`${subTitleFont} max-w-full break-words whitespace-normal`}
            style={{ fontSize: `${subtitleSize}px`, color: `${subTitleColor}` }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Uploaded Image */}
        {uploadedUrl && (
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="absolute object-cover mx-auto border-3 border-black"
            style={{
              top: `${imagePosition * 10}px`,
              width: `${imageSize}px`,
              borderRadius: `${borderRadius}px`,
              border: `${borderThickness}px solid ${borderColor}`,
            }}
          />
        )}

        {/* Bottom Text */}
        <motion.div
          className="absolute text-center w-full"
          style={{ top: `${bottomtextPosition * 10}px` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className={`${bottomTextFont} mt-4 mb-4 max-w-full break-words whitespace-normal`}
            style={{ fontSize: `${bottomTextSize}px`, color: `${bottomTextColor}` }}
          >
            {bottomText}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}