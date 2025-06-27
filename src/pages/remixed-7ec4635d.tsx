import React, { useState, useRef } from 'react';
import { Upload, Download, User, Mic } from 'lucide-react';

const ConferenceVisualGenerator = () => {
  const [role, setRole] = useState('attendee');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [imageOffsetX, setImageOffsetX] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(-30); // Better initial focus on head
  const [imageScale, setImageScale] = useState(1.5); // Better initial zoom
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        // Reset positioning for new image with better defaults
        setImageOffsetX(0);
        setImageOffsetY(-30);
        setImageScale(1.5);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle mouse/touch events for drag and pinch
  const handlePointerDown = (e) => {
    if (!uploadedImage) return;
    
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    setLastPointer({ x, y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !uploadedImage) return;
    
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    const deltaX = x - lastPointer.x;
    const deltaY = y - lastPointer.y;
    
    // Convert pixel movement to percentage movement
    const canvas = canvasRef.current;
    const moveFactorX = (deltaX / canvas.offsetWidth) * 200; // Adjust sensitivity
    const moveFactorY = (deltaY / canvas.offsetHeight) * 200;
    
    setImageOffsetX(prev => Math.max(-100, Math.min(100, prev + moveFactorX)));
    setImageOffsetY(prev => Math.max(-100, Math.min(100, prev + moveFactorY)));
    
    setLastPointer({ x, y });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (!uploadedImage) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setImageScale(prev => Math.max(0.3, Math.min(3, prev + delta)));
  };

  // Touch pinch handling
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch gesture starting
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      handlePointerDown(e);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // Handle pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (lastPointer.distance) {
        const scale = distance / lastPointer.distance;
        setImageScale(prev => Math.max(0.3, Math.min(3, prev * scale)));
      }
      
      setLastPointer({ ...lastPointer, distance });
    } else if (e.touches.length === 1) {
      handlePointerMove(e);
    }
  };

  const generateVisual = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to square
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Clear canvas with professional light background
    ctx.fillStyle = '#ffffff'; // Clean white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw barcode stripe at top - recreated from your updated pattern
    const stripeHeight = 80;
    
    // Recreate the exact barcode pattern from your updated image
    const barcodePattern = [
      { color: '#DC143C', width: 6 },  // Red
      { color: '#228B22', width: 4 },  // Green
      { color: '#0000FF', width: 3 },  // Blue
      { color: '#DC143C', width: 5 },  // Red
      { color: '#FFFFFF', width: 2 },  // White
      { color: '#228B22', width: 4 },  // Green
      { color: '#FFD700', width: 3 },  // Yellow
      { color: '#FF4500', width: 4 },  // Orange
      { color: '#0000FF', width: 2 },  // Blue
      { color: '#DC143C', width: 6 },  // Red
      { color: '#000000', width: 3 },  // Black
      { color: '#228B22', width: 5 },  // Green
      { color: '#FFFFFF', width: 2 },  // White
      { color: '#FFD700', width: 4 },  // Yellow
      { color: '#8A2BE2', width: 3 },  // Purple
      { color: '#00CED1', width: 4 },  // Cyan
      { color: '#DC143C', width: 5 },  // Red
      { color: '#228B22', width: 3 },  // Green
      { color: '#0000FF', width: 4 },  // Blue
      { color: '#FFD700', width: 3 },  // Yellow
      { color: '#DC143C', width: 6 },  // Red
      { color: '#FFFFFF', width: 2 },  // White
      { color: '#228B22', width: 4 },  // Green
      { color: '#FF4500', width: 3 },  // Orange
      { color: '#000000', width: 4 },  // Black
      { color: '#0000FF', width: 5 },  // Blue
      { color: '#DC143C', width: 3 },  // Red
      { color: '#228B22', width: 6 },  // Green
      { color: '#FFD700', width: 4 },  // Yellow
      { color: '#8A2BE2', width: 3 },  // Purple
      { color: '#00CED1', width: 4 },  // Cyan
      { color: '#DC143C', width: 5 },  // Red
      { color: '#FFFFFF', width: 2 },  // White
      { color: '#228B22', width: 4 },  // Green
      { color: '#0000FF', width: 3 },  // Blue
      { color: '#FFD700', width: 5 },  // Yellow
      { color: '#DC143C', width: 4 },  // Red
      { color: '#000000', width: 3 },  // Black
      { color: '#228B22', width: 6 },  // Green
      { color: '#FF4500', width: 4 },  // Orange
      { color: '#0000FF', width: 3 },  // Blue
      { color: '#8A2BE2', width: 5 },  // Purple
      { color: '#FFFFFF', width: 2 },  // White
      { color: '#DC143C', width: 4 },  // Red
      { color: '#228B22', width: 3 },  // Green
      { color: '#FFD700', width: 6 },  // Yellow
      { color: '#0000FF', width: 4 },  // Blue
      { color: '#DC143C', width: 3 },  // Red
      { color: '#00CED1', width: 5 },  // Cyan
      { color: '#228B22', width: 4 },  // Green
      { color: '#000000', width: 2 },  // Black
      { color: '#8A2BE2', width: 6 },  // Purple
      { color: '#FFFFFF', width: 3 },  // White
      { color: '#DC143C', width: 4 },  // Red
    ];
    
    // Calculate total pattern width and scale to fit canvas
    const totalPatternWidth = barcodePattern.reduce((sum, stripe) => sum + stripe.width, 0);
    const scaleX = canvas.width / totalPatternWidth;
    
    // Draw the pattern
    let currentX = 0;
    barcodePattern.forEach(stripe => {
      ctx.fillStyle = stripe.color;
      const stripeWidth = stripe.width * scaleX;
      ctx.fillRect(currentX, 0, stripeWidth, stripeHeight);
      currentX += stripeWidth;
    });
    
    // Draw main gray background (professional conference gray)
    ctx.fillStyle = '#e9ecef'; // Professional light gray with good contrast
    ctx.fillRect(0, stripeHeight, canvas.width, canvas.height - stripeHeight);
    
    // Draw profile image if uploaded (positioning without cropping)
    if (uploadedImage) {
      const img = new Image();
      img.onload = () => {
        const imageSize = 400;
        const imageX = (canvas.width - imageSize) / 2;
        const imageY = stripeHeight + 40;
        
        // Draw circular mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(imageX + imageSize/2, imageY + imageSize/2, imageSize/2, 0, Math.PI * 2);
        ctx.clip();
        
        // Calculate positioning - work with the full image, no cropping
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight;
        
        if (imgAspect > 1) {
          // Wide image - fit to height
          drawHeight = imageSize * imageScale;
          drawWidth = drawHeight * imgAspect;
        } else {
          // Tall image - fit to width
          drawWidth = imageSize * imageScale;
          drawHeight = drawWidth / imgAspect;
        }
        
        // Position the image with offset controls
        const drawX = imageX + imageSize/2 - drawWidth/2 + (imageOffsetX * imageSize / 100);
        const drawY = imageY + imageSize/2 - drawHeight/2 + (imageOffsetY * imageSize / 100);
        
        // Draw full image with positioning
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        
        ctx.restore();
        
        // Draw border around image
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(imageX + imageSize/2, imageY + imageSize/2, imageSize/2, 0, Math.PI * 2);
        ctx.stroke();
      };
      img.src = uploadedImage;
    }
    
    // Draw text content (centered and lower) - All text bigger and grey
    const centerX = canvas.width / 2;
    
    ctx.fillStyle = '#3F3F45'; // Grey for all text
    ctx.font = 'bold 56px Arial'; // Bigger
    ctx.textAlign = 'center';
    const mainText = role === 'speaker' ? "I'm Speaking at" : "I'm Attending";
    ctx.fillText(mainText, centerX, stripeHeight + 520);
    
    ctx.font = 'bold 46px Arial'; // Bigger
    ctx.fillStyle = '#3F3F45'; // Grey instead of blue
    ctx.fillText('Global Digital Collaboration', centerX, stripeHeight + 580);
    ctx.fillText('Conference 2025', centerX, stripeHeight + 630);
    
    // Draw personal info
    if (name) {
      ctx.font = 'bold 42px Arial'; // Bigger
      ctx.fillStyle = '#3F3F45'; // Grey
      ctx.fillText(name, centerX, stripeHeight + 700);
    }
    
    if (title) {
      ctx.font = '32px Arial'; // Bigger
      ctx.fillStyle = '#3F3F45'; // Grey
      ctx.fillText(title, centerX, stripeHeight + 740);
    }
    
    // Draw conference info
    ctx.font = '32px Arial'; // Made much bigger (was 26px)
    ctx.fillStyle = '#3F3F45'; // Grey
    ctx.fillText('Join me at globaldigitalcollaboration.org', centerX, stripeHeight + 800);
    
    // Draw dates and location
    ctx.font = '24px Arial'; // Bigger
    ctx.fillStyle = '#3F3F45'; // Grey
    ctx.fillText('July 1-2, 2025 • Geneva, Switzerland', centerX, stripeHeight + 840);
    
    // Draw role badge (top right) - Both Attendee and Speaker in dark grey
    const badgeX = canvas.width - 220;
    const badgeY = stripeHeight + 40;
    const badgeWidth = 180;
    const badgeHeight = 70;
    
    ctx.fillStyle = '#3F3F45'; // Dark grey for both speaker and attendee
    ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
    
    ctx.fillStyle = '#fff'; // White font for both
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    const badgeText = role === 'speaker' ? 'SPEAKER' : 'ATTENDEE';
    ctx.fillText(badgeText, badgeX + badgeWidth/2, badgeY + 45);
    
    // Reset text alignment
    ctx.textAlign = 'start';
  };

  const downloadImage = () => {
    generateVisual();
    setTimeout(() => {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = `conference_visual_${role}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }, 100);
  };

  React.useEffect(() => {
    generateVisual();
  }, [uploadedImage, role, name, title, imageOffsetX, imageOffsetY, imageScale]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Global Digital Collaboration Conference Visual Generator
        </h1>
        <p className="text-gray-600">
          Create a professional LinkedIn visual to announce your participation in the conference
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Role
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="attendee"
                  checked={role === 'attendee'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-3 text-gray-600"
                />
                <User className="w-5 h-5 mr-2 text-gray-600" />
                Attendee
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="speaker"
                  checked={role === 'speaker'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-3 text-gray-600"
                />
                <Mic className="w-5 h-5 mr-2 text-gray-600" />
                Speaker
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Title/Position
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CEO, Developer, Designer"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition-colors flex items-center justify-center"
            >
              <Upload className="w-6 h-6 mr-2 text-gray-500" />
              {uploadedImage ? 'Change Image' : 'Upload Profile Image'}
            </button>
            {uploadedImage && (
              <div className="mt-3">
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
            )}
          </div>

          {uploadedImage && (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">📱 Image Positioning Controls</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>🖱️ Desktop:</strong></p>
                <p>• Drag to move image position</p>
                <p>• Scroll wheel to zoom in/out</p>
                <p><strong>📱 Mobile:</strong></p>
                <p>• Drag with one finger to move</p>
                <p>• Pinch with two fingers to zoom</p>
                <p className="text-xs text-gray-600 mt-3">
                  💡 Position your photo to focus on your head area for the best result
                </p>
              </div>
            </div>
          )}

          <button
            onClick={downloadImage}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Visual
          </button>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Preview</h3>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className={`max-w-full ${uploadedImage ? 'cursor-move' : ''}`}
              style={{ 
                width: 'min(100%, 400px)', 
                height: 'min(100%, 400px)', 
                aspectRatio: '1/1',
                touchAction: 'none' 
              }}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handlePointerUp}
            />
          </div>
          <p className="text-sm text-gray-600">
            This square visual is optimized for social media sharing with a large profile photo. Download at full resolution (1080x1080px). {uploadedImage ? 'Drag and pinch on the image above to position it perfectly.' : 'Upload an image to start positioning.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConferenceVisualGenerator;