import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, User, Mic, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NameTagGeneratorPage: React.FC = () => {
  const [role, setRole] = useState('attendee');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [imageOffsetX, setImageOffsetX] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(-30);
  const [imageScale, setImageScale] = useState(1.5);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState({ x: 0, y: 0, distance: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Reset positioning for new image with better defaults
        setImageOffsetX(0);
        setImageOffsetY(-30);
        setImageScale(1.5);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle mouse/touch events for drag and pinch
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!uploadedImage) return;
    
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setLastPointer({ x, y, distance: 0 });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !uploadedImage) return;
    
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY || 0;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const deltaX = x - lastPointer.x;
    const deltaY = y - lastPointer.y;
    
    // Convert pixel movement to percentage movement
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const moveFactorX = (deltaX / canvas.offsetWidth) * 200;
    const moveFactorY = (deltaY / canvas.offsetHeight) * 200;
    
    setImageOffsetX(prev => Math.max(-100, Math.min(100, prev + moveFactorX)));
    setImageOffsetY(prev => Math.max(-100, Math.min(100, prev + moveFactorY)));
    
    setLastPointer({ x, y, distance: 0 });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!uploadedImage) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setImageScale(prev => Math.max(0.3, Math.min(3, prev + delta)));
  };

  // Touch pinch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture starting
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      handlePointerDown(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to square
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Clear canvas with professional light background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw barcode stripe at top
    const stripeHeight = 80;
    
    // Recreate the exact barcode pattern
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
    
    // Draw main gray background
    ctx.fillStyle = '#e9ecef';
    ctx.fillRect(0, stripeHeight, canvas.width, canvas.height - stripeHeight);
    
    // Draw profile image if uploaded
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
        
        // Calculate positioning
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight;
        
        if (imgAspect > 1) {
          drawHeight = imageSize * imageScale;
          drawWidth = drawHeight * imgAspect;
        } else {
          drawWidth = imageSize * imageScale;
          drawHeight = drawWidth / imgAspect;
        }
        
        // Position the image with offset controls
        const drawX = imageX + imageSize/2 - drawWidth/2 + (imageOffsetX * imageSize / 100);
        const drawY = imageY + imageSize/2 - drawHeight/2 + (imageOffsetY * imageSize / 100);
        
        // Draw image
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
    
    // Draw text content
    const centerX = canvas.width / 2;
    
    ctx.fillStyle = '#3F3F45';
    ctx.font = 'bold 56px Arial';
    ctx.textAlign = 'center';
    const mainText = role === 'speaker' ? "I'm Speaking at" : "I'm Attending";
    ctx.fillText(mainText, centerX, stripeHeight + 520);
    
    ctx.font = 'bold 46px Arial';
    ctx.fillStyle = '#3F3F45';
    ctx.fillText('Global Digital Collaboration', centerX, stripeHeight + 580);
    ctx.fillText('Conference 2025', centerX, stripeHeight + 630);
    
    // Draw personal info
    if (name) {
      ctx.font = 'bold 42px Arial';
      ctx.fillStyle = '#3F3F45';
      ctx.fillText(name, centerX, stripeHeight + 700);
    }
    
    if (title) {
      ctx.font = '32px Arial';
      ctx.fillStyle = '#3F3F45';
      ctx.fillText(title, centerX, stripeHeight + 740);
    }
    
    // Draw conference info
    ctx.font = '32px Arial';
    ctx.fillStyle = '#3F3F45';
    ctx.fillText('Join me at globaldigitalcollaboration.org', centerX, stripeHeight + 800);
    
    // Draw dates and location
    ctx.font = '24px Arial';
    ctx.fillStyle = '#3F3F45';
    ctx.fillText('July 1-2, 2025 • Geneva, Switzerland', centerX, stripeHeight + 840);
    
    // Draw role badge
    const badgeX = canvas.width - 220;
    const badgeY = stripeHeight + 40;
    const badgeWidth = 180;
    const badgeHeight = 70;
    
    ctx.fillStyle = '#3F3F45';
    ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
    
    ctx.fillStyle = '#fff';
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
      if (!canvas) return;
      
      const link = document.createElement('a');
      link.download = `gdc25_visual_${role}_${name.replace(/\s+/g, '_').toLowerCase() || 'participant'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }, 100);
  };

  useEffect(() => {
    generateVisual();
  }, [uploadedImage, role, name, title, imageOffsetX, imageOffsetY, imageScale]);

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Conference
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Social Media Visual Generator</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Create a professional social media visual to announce your participation in the Global Digital Collaboration Conference
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="h-6 w-6 text-primary-500" />
                <h2 className="text-2xl font-bold text-gray-900">Create Your Conference Visual</h2>
              </div>
              <p className="text-gray-600">
                Generate a professional 1080x1080px visual perfect for LinkedIn, Twitter, and other social media platforms. 
                Show your colleagues and network that you'll be attending or speaking at GDC25!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Controls */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Role at the Conference
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            value="attendee"
                            checked={role === 'attendee'}
                            onChange={(e) => setRole(e.target.value)}
                            className="mr-3 text-primary-600"
                          />
                          <User className="w-5 h-5 mr-2 text-gray-600" />
                          <span className="font-medium">Attendee</span>
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            value="speaker"
                            checked={role === 'speaker'}
                            onChange={(e) => setRole(e.target.value)}
                            className="mr-3 text-primary-600"
                          />
                          <Mic className="w-5 h-5 mr-2 text-gray-600" />
                          <span className="font-medium">Speaker</span>
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                        placeholder="e.g., CEO, Developer, Policy Expert"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-center"
                      >
                        <Upload className="w-6 h-6 mr-2 text-gray-500" />
                        {uploadedImage ? 'Change Image' : 'Upload Profile Image'}
                      </button>
                      {uploadedImage && (
                        <div className="mt-3 flex items-center gap-3">
                          <img
                            src={uploadedImage}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                          />
                          <span className="text-sm text-green-600 font-medium">✓ Image uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {uploadedImage && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-medium text-blue-900 mb-3">📱 Image Positioning Controls</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p><strong>🖱️ Desktop:</strong></p>
                      <p>• Drag to move image position</p>
                      <p>• Scroll wheel to zoom in/out</p>
                      <p><strong>📱 Mobile:</strong></p>
                      <p>• Drag with one finger to move</p>
                      <p>• Pinch with two fingers to zoom</p>
                      <p className="text-xs text-blue-600 mt-3 font-medium">
                        💡 Position your photo to focus on your head area for the best result
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={downloadImage}
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-lg font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Visual (1080x1080px)
                </button>
              </div>

              {/* Preview */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <canvas
                      ref={canvasRef}
                      className={`max-w-full ${uploadedImage ? 'cursor-move' : ''}`}
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        aspectRatio: '1/1',
                        touchAction: 'none',
                        maxWidth: '500px'
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
                  <p className="text-sm text-gray-600 mt-3">
                    This square visual is optimized for social media sharing. 
                    {uploadedImage ? ' Drag and pinch on the image above to position it perfectly.' : ' Upload an image to start customizing.'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">💡 Tips for Best Results</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Use a high-quality headshot or professional photo</li>
                    <li>• Position your face in the center of the circular frame</li>
                    <li>• Make sure your face is well-lit and clearly visible</li>
                    <li>• The final image will be 1080x1080px, perfect for social media</li>
                    <li>• Share on LinkedIn, Twitter, or other platforms to announce your participation!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NameTagGeneratorPage;