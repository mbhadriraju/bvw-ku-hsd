/**
 * Wild West Poster Generator - Main Page Component
 * 
 * This is the main page component for the Wild West Poster Generator application.
 * It provides a complete interface for creating custom Wild West-themed posters
 * with text customization, image upload, and automatic face detection/cropping.
 * 
 * Features:
 * - Text customization (title, subtitle, bottom text)
 * - Image upload and customization
 * - Automatic face detection and cropping
 * - Multiple poster template options
 * - Download functionality
 * - Animated UI with Framer Motion
 * 
 * @file /app/page.tsx
 * @author Wild West Poster Generator
 * @version 1.0.0
 */

"use client";

// React imports for state management and refs
import { useState, useRef } from "react";
// Framer Motion for smooth animations
import { motion } from "framer-motion";
// html2canvas for poster download functionality
import html2canvas from "html2canvas";

// Component imports
import VantaBackground from "../components/VantaBackground";
import Poster from "../components/Poster";
import CustomizeText from "../components/CustomizeText";
import CustomizeImage from "../components/CustomizeImage";

/**
 * Main Home component for the Wild West Poster Generator
 * 
 * This component manages all the state for poster customization and provides
 * the main user interface for creating custom posters.
 * 
 * @returns JSX element containing the complete poster generator interface
 */
export default function Home() {
  // ===== TEXT CONTENT STATE =====
  // Text content for the three text elements on the poster
  const [title, setTitle] = useState(""); // Main title text
  const [subtitle, setSubtitle] = useState(""); // Subtitle text
  const [bottomText, setBottomText] = useState(""); // Bottom text (e.g., date, location)

  // ===== TEXT STYLING STATE =====
  // Font sizes for each text element (in pixels)
  const [titleSize, setTitleSize] = useState(30); // Main title font size
  const [subtitleSize, setSubtitleSize] = useState(16); // Subtitle font size
  const [bottomTextSize, setBottomTextSize] = useState(12); // Bottom text font size

  // Font families for each text element
  const [titleFont, setTitleFont] = useState("font-1"); // Main title font
  const [subTitleFont, setSubTitleFont] = useState("font-1"); // Subtitle font
  const [bottomTextFont, setBottomTextFont] = useState("font-1"); // Bottom text font

  // Vertical positions for each text element (percentage from top)
  const [titlePosition, setTitlePosition] = useState(8); // Title position from top
  const [subTitlePosition, setSubtitlePosition] = useState(15); // Subtitle position from top
  const [bottomtextPosition, setBottomTextPosition] = useState(68); // Bottom text position from top

  // Text colors for each element
  const [titleColor, setTitleColor] = useState("black"); // Main title color
  const [subTitleColor, setSubTitleColor] = useState("black"); // Subtitle color
  const [bottomTextColor, setBottomTextColor] = useState("black"); // Bottom text color

  // ===== IMAGE CUSTOMIZATION STATE =====
  // Image properties for the uploaded image
  const [imageSize, setImageSize] = useState(300); // Image size in pixels
  const [imagePosition, setImagePosition] = useState(24); // Image position from top (percentage)
  const [borderRadius, setBorderRadius] = useState(0); // Border radius for rounded corners
  const [borderThickness, setBorderThickness] = useState(0); // Border thickness in pixels
  const [borderColor, setBorderColor] = useState("black"); // Border color

  // ===== POSTER TEMPLATE STATE =====
  const [option, setOption] = useState("option1"); // Selected poster template option

  // ===== UI STATE =====
  const [editMode, setEditMode] = useState("text"); // Current editing mode ("text" or "image")

  // ===== IMAGE UPLOAD STATE =====
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null); // URL of uploaded image
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null); // Name of uploaded file
  const [isProcessingFaceCrop, setIsProcessingFaceCrop] = useState(false); // Loading state for face crop

  // ===== REFS =====
  const fileInput = useRef<HTMLInputElement>(null); // Reference to file input element

  /**
   * Handle file upload for poster images
   * 
   * This function processes file uploads from the file input element.
   * It creates a FormData object, sends it to the upload API endpoint,
   * and updates the state with the uploaded image URL and filename.
   * 
   * @param e - Event object from file input change event
   */
  async function uploadFile(e: any) {
    // Create FormData object for file upload
    const formData = new FormData();
    
    // Get files from either the event target or the file input ref
    const files = e?.target?.files ?? fileInput.current?.files;
    
    // Process the first selected file
    if (files && files[0]) {
      // Append the file to FormData
      formData.append("file", files[0]);
      
      // Update the selected filename in state
      setSelectedFileName(files[0].name);
      
      // Send the file to the upload API endpoint
      const response = await fetch("/api/upload", { 
        method: "POST", 
        body: formData 
      });
      
      // If upload successful, update the uploaded image URL
      if (response.ok) {
        const data = await response.json();
        setUploadedUrl(data.url);
      }
    }
  }

  /**
   * Download the generated poster as a PNG image
   * 
   * This function captures the poster element using html2canvas,
   * converts it to a PNG image, and triggers a download.
   * The downloaded file will be named "WildWestPoster.png".
   */
  async function downloadFile() {
    // Get the poster element by its ID
    const poster = document.getElementById("poster");
    
    // Exit early if poster element not found
    if (!poster) return;
    
    // Capture the poster element as a canvas using html2canvas
    const canvas = await html2canvas(poster, { useCORS: true });
    
    // Create a download link element
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png"); // Convert canvas to PNG data URL
    a.download = "WildWestPoster.png"; // Set the download filename
    
    // Trigger the download
    a.click();
  }

  async function autoFaceCrop() {
    if (!uploadedUrl) {
      alert("Please upload an image first!");
      return;
    }

    setIsProcessingFaceCrop(true);

    try {
      // Load FaceDetector with real BlazeFace ONNX API integration
      const { loadTensorFlowJS, FaceDetector } = await import("../components/FaceDetector");
      
      // Initialize face detector (no client-side model loading needed)
      await loadTensorFlowJS();
      
      // Create face detector instance that calls real BlazeFace ONNX API
      const faceDetector = new FaceDetector();
      
      // Create image element for processing
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = async () => {
        try {
          // Detect faces using TensorFlow.js BlazeFace model
          const faces = await faceDetector.detectFaces(img);
          
          if (faces.length > 0) {
            // Crop to the detected face with padding
            const croppedImageUrl = await faceDetector.cropToFace(img, faces);
            
            // Update the uploaded image with the cropped version
            setUploadedUrl(croppedImageUrl);
            
            alert(`Face detected and cropped! Found ${faces.length} face(s) using real BlazeFace ONNX model via Python API.`);
          } else {
            // No faces detected, create center crop as fallback
            const croppedImageUrl = await faceDetector.cropToFace(img, []);
            setUploadedUrl(croppedImageUrl);
            alert("No faces detected. Applied center crop instead.");
          }
        } catch (error) {
          console.error("Face detection error:", error);
          alert("Face detection failed. Please try again.");
        } finally {
          setIsProcessingFaceCrop(false);
        }
      };
      
      img.onerror = () => {
        alert("Failed to load image for face detection.");
        setIsProcessingFaceCrop(false);
      };
      
      img.src = uploadedUrl;
      
    } catch (error) {
      console.error("Auto face crop error:", error);
      alert("Face detection failed. Please check your internet connection and try again.");
      setIsProcessingFaceCrop(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full overflow-x-hidden"
    >
      <VantaBackground />

      {/* Header */}
      <motion.div 
        className="justify-center flex flex-col items-center text-center px-4"
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

      {/* Main Section */}
      <motion.div 
        className="flex flex-wrap justify-center mt-20 items-start gap-10 bg-cover bg-center px-3"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          backgroundImage: "url('/background.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          padding: "60px 5%"
        }}
      >

        {/* Left Panel */}
        <motion.div 
          className="flex-1 min-w-[350px] bg-cover bg-left bg-no-repeat p-8 rounded-2xl border-amber-800 border-3 h-[920px]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            backgroundImage: "url('/left-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        >
          <motion.h1 
            className="text-4xl font-1 mb-8 text-center text-white"
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
            >
              Edit Image
            </motion.button>
          </motion.div>

          {/* Conditional editing sections */}
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
                autoFaceCrop={autoFaceCrop}
                isProcessing={isProcessingFaceCrop}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Poster Preview Panel */}
        <motion.div 
          className="flex-1 min-w-[350px]"
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
            className="w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-3 px-4 rounded-xl mt-6 text-2xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Poster
          </motion.button>

          <motion.select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="text-center w-full inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black font-1 py-3 px-4 rounded-xl mt-6 text-2xl cursor-pointer focus:outline-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            <option value="option6">Option 6</option>
          </motion.select>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}