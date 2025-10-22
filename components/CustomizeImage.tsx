"use client"; // Marks this component as a client-side component (required for hooks and interactivity)

import { motion } from "framer-motion"; // Import Framer Motion for animation effects
import Slider from "@mui/material/Slider"; // Import Material UI Slider for adjustable controls

// CustomizeImage component to handle image upload and image customization controls
export default function CustomizeImage({
  uploadFile,           // Callback function to handle file upload
  fileInput,            // Ref for the hidden file input element
  selectedFileName,     // Name of the selected file (if any)
  imagePosition,        // Current vertical position of the image
  setImagePosition,     // Setter function for image position
  borderRadius,         // Current border radius value
  setBorderRadius,      // Setter function for border radius
  borderThickness,      // Current border thickness value
  setBorderThickness,   // Setter function for border thickness
  borderColor,          // Current border color value
  setBorderColor,       // Setter function for border color
  imageSize,            // Current size of the image
  setImageSize,         // Setter function for image size
  autoFaceCrop,         // Callback to trigger auto face cropping
  isProcessing = false  // Flag to disable controls while processing
}) {
  return (
    <motion.div 
      className="space-y-3 mt-12"  // Vertical spacing between child elements
      initial={{ opacity: 0, y: 20 }} // Initial animation: fade in and slide up
      animate={{ opacity: 1, y: 0 }} // Animate to full opacity and final position
      transition={{ duration: 0.5 }}  // Animation duration
    >
      {/* File Upload Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // Fade in with slight shrink
        animate={{ opacity: 1, scale: 1 }}   // Animate to full size
        transition={{ duration: 0.4, delay: 0.1 }} // Slight delay for staggered animation
      >
        <input 
          id="file-upload" 
          className="hidden"  // Hide default file input
          type="file" 
          ref={fileInput} 
          onChange={uploadFile} // Handle file selection
        />
        <motion.label
          htmlFor="file-upload"
          className="w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-4 px-4 rounded-xl h-15 text-2xl cursor-pointer"
          whileHover={{ scale: 1.02 }} // Slight scale up on hover
          whileTap={{ scale: 0.98 }}   // Slight scale down on click
        >
          {selectedFileName ?? "Upload Image"} {/* Show file name or default text */}
        </motion.label>
      </motion.div>

      {/* Image Position Slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="font-subtitle text-gray-200">Image Position: {imagePosition}</p>
        <Slider 
          min={10} 
          max={40} 
          value={imagePosition} 
          onChange={(e, v) => setImagePosition(v)} 
        />
      </motion.div>

      {/* Border Radius Slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <p className="font-subtitle text-gray-200">Border Radius: {borderRadius}</p>
        <Slider 
          min={0} 
          max={100} 
          value={borderRadius} 
          onChange={(e, v) => setBorderRadius(v)} 
        />
      </motion.div>

      {/* Border Thickness Slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <p className="font-subtitle text-gray-200">Border Thickness: {borderThickness}</p>
        <Slider 
          min={0} 
          max={20} 
          value={borderThickness} 
          onChange={(e, v) => setBorderThickness(v)} 
        />
      </motion.div>

      {/* Image Size Slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <p className="font-subtitle text-gray-200">Image Size: {imageSize}</p>
        <Slider 
          min={100} 
          max={500} 
          value={imageSize} 
          onChange={(e, v) => setImageSize(v)} 
        />
      </motion.div>

      {/* Border Color Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex flex-row"
      >
        <p className="font-1 text-2xl whitespace-nowrap mt-4 mr-6 text-gray-200">Border Color:</p>
        <motion.select
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)} // Update border color
          className="text-center focus:outline-0 w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-2 px-4 rounded-xl h-15 text-2xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* List of selectable colors */}
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

      {/* Auto Face Crop Button */}
      <motion.button
        onClick={autoFaceCrop}  // Trigger auto face crop
        disabled={isProcessing}  // Disable while processing
        className={`w-full inline-flex items-center justify-center font-1 py-4 px-4 rounded-xl h-15 text-2xl cursor-pointer ${
          isProcessing 
            ? "bg-gray-500 text-gray-300 cursor-not-allowed" // Disabled style
            : "bg-gray-300 hover:bg-gray-400 text-black"    // Active style
        }`}
        whileHover={!isProcessing ? { scale: 1.02 } : {}} // Only animate if active
        whileTap={!isProcessing ? { scale: 0.98 } : {}}   // Only animate if active
      >
        {isProcessing ? "Processing..." : "Auto Face Crop"} {/* Show status */}
      </motion.button>
    </motion.div>
  );
}