"use client"; // Marks this component as client-side for Next.js
import { motion } from "framer-motion"; // Import Framer Motion for animations

export default function Poster({
  option,               // Poster template option (used to load background image)
  title,                // Main title text
  subtitle,             // Subtitle text
  bottomText,           // Bottom text
  uploadedUrl,          // Optional uploaded image URL
  titleFont, subTitleFont, bottomTextFont, // Font classes for each text
  titleSize, subtitleSize, bottomTextSize, // Font sizes for each text
  titlePosition, subTitlePosition, bottomtextPosition, // Vertical positions
  imageSize, imagePosition, borderRadius, borderThickness, borderColor, // Uploaded image styles
  titleColor, subTitleColor, bottomTextColor, // Text colors
}) {
  return (
    <motion.div
      className="relative w-full mx-auto overflow-hidden"
      style={{ width: "600px", height: "800px" }} // Poster dimensions
      id="poster"
    >
      {/* Background Poster Image */}
      <motion.img
        src={`/${option}.png`} // Load template based on option
        alt="Example Poster"
        className="rounded-lg shadow-lg block absolute top-0 left-0 w-full h-full object-cover"
        initial={{ opacity: 0 }} // Fade in animation
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Overlay container for all text and uploaded image */}
      <motion.div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center p-6">
        
        {/* Title */}
        <motion.div
          className="absolute text-center w-full"
          style={{ top: `${titlePosition * 10}px` }} // Position multiplied for scaling
          initial={{ opacity: 0, y: -20 }} // Slide down animation
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className={`${titleFont} max-w-full break-words whitespace-normal`} // Apply font and word wrapping
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

        {/* Uploaded Image (optional) */}
        {uploadedUrl && (
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="absolute object-cover mx-auto border-3 border-black"
            style={{
              top: `${imagePosition * 10}px`, // Vertical position
              width: `${imageSize}px`,         // Width of uploaded image
              borderRadius: `${borderRadius}px`, // Rounded corners
              border: `${borderThickness}px solid ${borderColor}`, // Border style
            }}
          />
        )}

        {/* Bottom Text */}
        <motion.div
          className="absolute text-center w-full"
          style={{ top: `${bottomtextPosition * 10}px` }}
          initial={{ opacity: 0, y: 20 }} // Slide up animation
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className={`${bottomTextFont} mt-4 mb-4 max-w-full break-words whitespace-normal`} // Font and spacing
            style={{ fontSize: `${bottomTextSize}px`, color: `${bottomTextColor}` }}
          >
            {bottomText}
          </p>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}