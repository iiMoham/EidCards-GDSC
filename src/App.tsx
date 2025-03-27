import React, { useState, useEffect, useRef } from 'react';
import { Download, Share2, ArrowRight } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CardDesign {
  id: number;
  name: string;
  backgroundUrl: string;
  textColor: string;
}

// Define position options
const positionOptions = [
  { id: 'center', label: 'وسط', className: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' },
  { id: 'top', label: 'أعلى', className: 'top-8 left-1/2 transform -translate-x-1/2' },
  { id: 'bottom', label: 'أسفل', className: 'bottom-8 left-1/2 transform -translate-x-1/2' },
  { id: 'left', label: 'يسار', className: 'top-1/2 left-8 transform -translate-y-1/2' },
  { id: 'right', label: 'يمين', className: 'top-1/2 right-8 transform -translate-y-1/2' },
];

// Define color options with exact RGB values
const colorOptions = [
  { id: 'white', label: 'أبيض', className: 'text-white', value: '#FFFFFF' },
  { id: 'blue', label: 'أزرق', className: 'text-google-blue', value: '#4385F3' },
  { id: 'red', label: 'أحمر', className: 'text-google-red', value: '#E94335' },
  { id: 'yellow', label: 'أصفر', className: 'text-google-yellow', value: '#F9BC04' },
  { id: 'green', label: 'أخضر', className: 'text-google-green', value: '#129D57' },
  { id: 'black', label: 'أسود', className: 'text-gray-900', value: '#202124' },
];

// Define font options
const fontOptions = [
  { id: 'changa', label: 'Changa', className: 'font-changa' },
  { id: 'cairo', label: 'Cairo', className: 'font-cairo' },
  { id: 'tajawal', label: 'Tajawal', className: 'font-tajawal' },
  { id: 'noto', label: 'Noto Sans Arabic', className: 'font-noto-arabic' },
  { id: 'amiri', label: 'Amiri', className: 'font-amiri' },
  { id: 'aref', label: 'Aref Ruqaa', className: 'font-aref' },
  { id: 'reem', label: 'Reem Kufi', className: 'font-reem' },
  { id: 'lateef', label: 'Lateef', className: 'font-lateef' },
];

// Define font size options
const fontSizeOptions = [
  { id: 1, value: 'text-sm', label: 'صغير' },
  { id: 3, value: 'text-lg', label: 'متوسط' },
  { id: 5, value: 'text-2xl', label: 'كبير' },
];

const cardDesigns: CardDesign[] = [
  {
    id: 1,
    name: 'Card 1',
    backgroundUrl: '/assets/cards/1.png',
    textColor: 'text-gray-800',
  },
  {
    id: 2,
    name: 'Card 2',
    backgroundUrl: '/assets/cards/2.png',
    textColor: 'text-white',
  },
  {
    id: 3,
    name: 'Card 3',
    backgroundUrl: '/assets/cards/3.png',
    textColor: 'text-white',
  },
  {
    id: 4,
    name: 'Card 4',
    backgroundUrl: '/assets/cards/4.png',
    textColor: 'text-white',
  },
];

function App() {
  // State management
  const [name, setName] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardDesign | null>(null);
  const [showFireworks, setShowFireworks] = useState(true);
  const [namePosition, setNamePosition] = useState(positionOptions[2]); // Bottom position is default
  const [nameColor, setNameColor] = useState(colorOptions[2]); // Red color is default (index 2)
  const [nameFont, setNameFont] = useState(fontOptions[0]);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // Medium size is default (index 1)
  
  const cardRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);

  // Hide fireworks after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle mobile positioning
  useEffect(() => {
    const adjustMobilePosition = () => {
      if (!nameContainerRef.current) return;
      
      // Basic positioning properties that should always be set
      nameContainerRef.current.style.position = 'absolute';
      nameContainerRef.current.style.width = '100%';
      nameContainerRef.current.style.textAlign = 'center';
      nameContainerRef.current.style.padding = '0 1rem';
      nameContainerRef.current.style.display = 'block'; // Make sure it's visible
      
      // Reset any previous position properties
      nameContainerRef.current.style.top = '';
      nameContainerRef.current.style.right = '';
      nameContainerRef.current.style.bottom = '';
      nameContainerRef.current.style.left = '';
      nameContainerRef.current.style.transform = '';
      
      // Set position based on selected position
      if (namePosition.id === 'bottom') {
        nameContainerRef.current.style.top = '65%';
        nameContainerRef.current.style.left = '50%';
        nameContainerRef.current.style.transform = 'translate(-50%, -50%)';
      } else if (namePosition.id === 'top') {
        nameContainerRef.current.style.top = '15%';
        nameContainerRef.current.style.left = '50%';
        nameContainerRef.current.style.transform = 'translate(-50%, -50%)';
      } else if (namePosition.id === 'center') {
        nameContainerRef.current.style.top = '50%';
        nameContainerRef.current.style.left = '50%';
        nameContainerRef.current.style.transform = 'translate(-50%, -50%)';
      } else if (namePosition.id === 'left') {
        nameContainerRef.current.style.top = '50%';
        nameContainerRef.current.style.left = '15%';
        nameContainerRef.current.style.transform = 'translate(0, -50%)';
      } else if (namePosition.id === 'right') {
        nameContainerRef.current.style.top = '50%';
        nameContainerRef.current.style.right = '10%';
        nameContainerRef.current.style.transform = 'translate(0, -50%)';
      }
    };
    
    // Adjust on load and resize
    adjustMobilePosition();
    window.addEventListener('resize', adjustMobilePosition);
    
    return () => {
      window.removeEventListener('resize', adjustMobilePosition);
    };
  }, [namePosition.id]);

  // Handle name submission and card generation
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Ensure red color is explicitly set as default
      setNameColor(colorOptions[2]); // Red color (index 2)
      
      const randomIndex = Math.floor(Math.random() * cardDesigns.length);
      setSelectedCard(cardDesigns[randomIndex]);
      
      setShowCard(true);
      // Show fireworks again when card is generated
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 10000);
    }
  };

  // Handle card download
  const handleDownload = async () => {
    // Show a loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.innerText = 'جاري تحضير البطاقة...';
    loadingMessage.className = 'fixed top-0 left-0 w-full bg-google-blue text-white text-center py-2 z-50';
    document.body.appendChild(loadingMessage);
    
    try {
      if (!selectedCard) {
        throw new Error('No card selected');
      }
      
      // Create a new canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (consistent size for all devices)
      canvas.width = 1200;  
      canvas.height = 1200;
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Load the background image
      const bgImage = new Image();
      bgImage.crossOrigin = 'anonymous';
      
      // Create a promise to handle image loading
      const imageLoadPromise = new Promise((resolve, reject) => {
        bgImage.onload = () => resolve(bgImage);
        bgImage.onerror = () => reject(new Error('Failed to load background image'));
        bgImage.src = selectedCard.backgroundUrl;
      });
      
      // Wait for image to load
      await imageLoadPromise;
      
      // Draw background
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      // Get the computed style for the name
      const nameStyle = window.getComputedStyle(nameContainerRef.current?.querySelector('[data-name-element="true"]') || document.createElement('div'));
      
      // Set text style
      ctx.font = `${nameStyle.fontWeight} ${parseInt(nameStyle.fontSize, 10) * 3}px ${nameStyle.fontFamily}`;
      ctx.fillStyle = nameColor.value;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Position the text based on namePosition
      let textY = 0;
      if (namePosition.id === 'top') {
        textY = canvas.height * 0.15;
      } else if (namePosition.id === 'center') {
        textY = canvas.height * 0.5;
      } else if (namePosition.id === 'bottom') {
        textY = canvas.height * 0.67;
      } else if (namePosition.id === 'left' || namePosition.id === 'right') {
        textY = canvas.height * 0.5;
      }
      
      // Draw the name
      ctx.fillText(name, canvas.width / 2, textY);
      
      // Add downloaded version marker
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      
      // Create a background for the marker
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      const markerText = 'Downloaded Version';
      const markerWidth = ctx.measureText(markerText).width + 40;
      ctx.fillRect(canvas.width / 2 - markerWidth / 2, canvas.height - 80, markerWidth, 40);
      ctx.fillStyle = 'white';
      ctx.fillText(markerText, canvas.width / 2, canvas.height - 50);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create download link
          const link = document.createElement('a');
          link.download = `eid-card-${name}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          
          // Clean up
          URL.revokeObjectURL(link.href);
        }
        // Remove loading message
        document.body.removeChild(loadingMessage);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error generating card:', error);
      document.body.removeChild(loadingMessage);
      alert('حدث خطأ أثناء تحضير البطاقة. الرجاء المحاولة مرة أخرى.');
    }
  };

  // Handle card sharing
  const handleShare = async () => {
    // Show a loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.innerText = 'جاري تحضير البطاقة للمشاركة...';
    loadingMessage.className = 'fixed top-0 left-0 w-full bg-google-yellow text-gray-900 text-center py-2 z-50';
    document.body.appendChild(loadingMessage);
    
    try {
      if (!selectedCard) {
        throw new Error('No card selected');
      }
      
      // Create a new canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (consistent size for all devices)
      canvas.width = 1200;  
      canvas.height = 1200;
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Load the background image
      const bgImage = new Image();
      bgImage.crossOrigin = 'anonymous';
      
      // Create a promise to handle image loading
      const imageLoadPromise = new Promise((resolve, reject) => {
        bgImage.onload = () => resolve(bgImage);
        bgImage.onerror = () => reject(new Error('Failed to load background image'));
        bgImage.src = selectedCard.backgroundUrl;
      });
      
      // Wait for image to load
      await imageLoadPromise;
      
      // Draw background
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      // Get the computed style for the name
      const nameStyle = window.getComputedStyle(nameContainerRef.current?.querySelector('[data-name-element="true"]') || document.createElement('div'));
      
      // Set text style
      ctx.font = `${nameStyle.fontWeight} ${parseInt(nameStyle.fontSize, 10) * 3}px ${nameStyle.fontFamily}`;
      ctx.fillStyle = nameColor.value;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Position the text based on namePosition
      let textY = 0;
      if (namePosition.id === 'top') {
        textY = canvas.height * 0.15;
      } else if (namePosition.id === 'center') {
        textY = canvas.height * 0.5;
      } else if (namePosition.id === 'bottom') {
        textY = canvas.height * 0.65;
      } else if (namePosition.id === 'left' || namePosition.id === 'right') {
        textY = canvas.height * 0.5;
      }
      
      // Draw the name
      ctx.fillText(name, canvas.width / 2, textY);
      
      // Add shared version marker
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      
      // Create a background for the marker
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      const markerText = 'Shared Version';
      const markerWidth = ctx.measureText(markerText).width + 40;
      ctx.fillRect(canvas.width / 2 - markerWidth / 2, canvas.height - 80, markerWidth, 40);
      ctx.fillStyle = 'white';
      ctx.fillText(markerText, canvas.width / 2, canvas.height - 50);
      
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Check if the Web Share API is available
          if (navigator.share && navigator.canShare) {
            try {
              const file = new File([blob], `eid-card-${name}.png`, { type: 'image/png' });
              
              // Check if we can share the file
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                  title: 'بطاقة معايدة عيد الفطر',
                  text: `بطاقة معايدة من ${name} بمناسبة عيد الفطر المبارك`,
                  files: [file]
                });
              } else {
                // Fallback if file sharing is not supported
                await navigator.share({
                  title: 'بطاقة معايدة عيد الفطر',
                  text: `بطاقة معايدة من ${name} بمناسبة عيد الفطر المبارك`
                });
              }
            } catch (error) {
              console.error('Error sharing:', error);
              alert('حدث خطأ أثناء المشاركة. يمكنك تنزيل البطاقة ومشاركتها يدويًا.');
            }
          } else {
            // Fallback for browsers that don't support Web Share API
            alert('المشاركة غير متاحة في هذا المتصفح. يمكنك تنزيل البطاقة ومشاركتها يدويًا.');
          }
        }
        // Remove loading message
        document.body.removeChild(loadingMessage);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error generating card:', error);
      document.body.removeChild(loadingMessage);
      alert('حدث خطأ أثناء تحضير البطاقة. الرجاء المحاولة مرة أخرى.');
    }
  };

  // Reset form to create a new card
  const handleReset = () => {
    setName('');
    setShowCard(false);
    setSelectedCard(null);
  };

  // Helper function to increase/decrease font size
  const adjustFontSize = (increment: boolean) => {
    if (increment && fontSizeIndex < fontSizeOptions.length - 1) {
      setFontSizeIndex(fontSizeIndex + 1);
    } else if (!increment && fontSizeIndex > 0) {
      setFontSizeIndex(fontSizeIndex - 1);
    }
  };

  // Helper function for card image processing that we'll use for sharing and downloads
  const prepareCardImage = async (callback: (blob: Blob) => Promise<void> | void, loadingMessage: HTMLDivElement) => {
    if (!cardRef.current) return;
    
    try {
      // Get the actual dimensions of the card element
      const cardRect = cardRef.current.getBoundingClientRect();
      
      // Capture the card with html2canvas with exact dimensions
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Lower scale for better consistency
        width: cardRect.width,
        height: cardRect.height,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false, // Disable logging
        imageTimeout: 0, // No timeout for images
        onclone: (clonedDoc) => {
          // Get the name container in the cloned document
          const nameContainer = clonedDoc.querySelector('[data-name-container="true"]') as HTMLElement;
          if (nameContainer) {
            const posType = nameContainer.getAttribute('data-position-type');
            
            // First, explicitly copy all computed styles from original
            if (nameContainerRef.current) {
              const originalStyles = window.getComputedStyle(nameContainerRef.current);
              
              // Apply all computed styles
              for (let i = 0; i < originalStyles.length; i++) {
                const property = originalStyles[i];
                nameContainer.style.setProperty(
                  property,
                  originalStyles.getPropertyValue(property),
                  originalStyles.getPropertyPriority(property)
                );
              }
              
              // Force critical styles
              nameContainer.style.position = 'absolute';
              nameContainer.style.width = '100%';
              nameContainer.style.textAlign = 'center';
              nameContainer.style.display = 'block';
              nameContainer.style.zIndex = '10';
              
              // Get the name element
              const nameElement = nameContainer.querySelector('[data-name-element="true"]');
              if (nameElement) {
                // Ensure text properties are retained
                const originalNameElement = cardRef.current?.querySelector('[data-name-element="true"]');
                if (originalNameElement) {
                  const originalNameStyles = window.getComputedStyle(originalNameElement as HTMLElement);
                  for (let i = 0; i < originalNameStyles.length; i++) {
                    const property = originalNameStyles[i];
                    (nameElement as HTMLElement).style.setProperty(
                      property,
                      originalNameStyles.getPropertyValue(property),
                      originalNameStyles.getPropertyPriority(property)
                    );
                  }
                }
              }
            }
            
            // Add the downloaded version marker
            const marker = clonedDoc.createElement('div');
            marker.style.position = 'absolute';
            marker.style.bottom = '20px';
            marker.style.left = '50%';
            marker.style.transform = 'translateX(-50%)';
            marker.style.padding = '4px 8px';
            marker.style.backgroundColor = 'rgba(0,0,0,0.5)';
            marker.style.color = 'white';
            marker.style.borderRadius = '4px';
            marker.style.fontSize = '12px';
            marker.textContent = 'Downloaded Version';
            
            const card = nameContainer.closest('[ref="cardRef"]') || nameContainer.parentElement;
            if (card) {
              card.appendChild(marker);
            }
          }
        }
      });
      
      // Convert to blob and process with callback
      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          await callback(blob);
        }
        // Clean up
        document.body.removeChild(loadingMessage);
      }, 'image/png', 1.0); // Use highest quality
    } catch (error) {
      console.error('Error processing card:', error);
      document.body.removeChild(loadingMessage);
      alert('حدث خطأ أثناء تحضير البطاقة. الرجاء المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen bg-pattern" dir="rtl">
      {/* Fireworks effect */}
      {showFireworks && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
          <div className="before" style={{left: '20%', animationDelay: '0.5s'}}></div>
          <div className="after" style={{left: '70%', animationDelay: '1.7s'}}></div>
          <div className="before" style={{left: '80%', animationDelay: '0.8s'}}></div>
          <div className="after" style={{left: '40%', animationDelay: '1.3s'}}></div>
        </div>
      )}
      
      {/* Initial input view */}
      {!showCard ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="flex flex-col items-center text-center mt-8">
            {/* Logo and greeting */}
            <div className="mb-6">
              <img 
                src="/assets/cards/vertical-gdsc-logo.png" 
                alt="شعار GDSC" 
                className="h-30 w-60 mx-auto mb-8"
              />
              <h1 className="text-2xl font-semibold mb-6 flex justify-center gap-2 flex-wrap">
                <span className="text-google-blue">كل</span>
                <span className="text-google-red">عـــام</span>
                <span className="text-google-yellow">وانتم</span>
                <span className="text-google-green">بخيــــر</span>
              </h1>
              <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto mb-4">
                يهنئكم نادي قوقل بحلول عيد الفطر المبارك اعاده الله علينا بكل صحة وعافية
              </p>
              <p className="text-lg font-medium text-gray-500 max-w-2xl mx-auto mb-2">
                عشان تستلم عيديتك، أدخل اسمك تحت 👇 ولا تنسى تشاركها معنا في تويتر
                <a href="https://x.com/GDOC_Team" target="_blank" rel="noopener noreferrer" className="text-google-blue"> @GDOC_Team</a>
              </p>
            </div>

            {/* Name Input Form */}
            <div className="w-full max-w-[90%] sm:max-w-md mx-auto mt-2">
              <form onSubmit={handleNameSubmit} className="space-y-6">
                <div>
                  <input
                    id="name"
                    type="text"
                    placeholder="الأسم الكريم ؟"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-full text-gray-900 placeholder-gray-400 border-2 border-gray-200 focus:border-google-blue focus:ring-0 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-google-blue text-white rounded-full text-lg font-bold hover:bg-google-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  إنشاء بطاقة المطور الخاصة بك
                  <ArrowRight size={24} className="rotate-180" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Card customization view */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card-container rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {selectedCard && (
                <>
                  {/* Card preview */}
                  <div ref={cardRef} className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={selectedCard.backgroundUrl}
                      alt={selectedCard.name}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      ref={nameContainerRef}
                      className="name-container"
                      style={{
                        position: 'absolute', 
                        width: '100%', 
                        textAlign: 'center',
                        padding: '0 1rem',
                        top: namePosition.id === 'bottom' ? '65%' : 
                             namePosition.id === 'top' ? '15%' : 
                             namePosition.id === 'center' ? '50%' : '50%',
                        left: (namePosition.id === 'bottom' || 
                               namePosition.id === 'top' || 
                               namePosition.id === 'center' || 
                               namePosition.id === 'left') ? '50%' : 'auto',
                        right: namePosition.id === 'right' ? '10%' : 'auto',
                        transform: (namePosition.id === 'bottom' || 
                                   namePosition.id === 'top' || 
                                   namePosition.id === 'center') ? 'translate(-50%, -50%)' : 
                                   (namePosition.id === 'left' || namePosition.id === 'right') ? 'translateY(-50%)' : 'none',
                        zIndex: 10,
                        display: 'block'  // Force display
                      }}
                      data-name-container="true"
                      data-position-type={namePosition.id}>
                      <h3 
                        className={`font-bold ${nameFont.className} ${fontSizeOptions[fontSizeIndex].value}`} 
                        style={{
                          color: nameColor.value,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)' // Add shadow for better visibility
                        }}
                        data-name-element="true">
                        {name}
                      </h3>
                    </div>
                  </div>

                  {/* Customization tools */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <p className="mt-2 font-medium text-gray-600">تم إنشاء بطاقتك بنجاح. تقدر الآن تنزيلها وتشاركها .</p>
                    </div>
                    
                    {/* Customization panel */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800">تخصيص البطاقة</h3>
                      
                      {/* Color Selector */}
                      <div>
                        <p className="text-md font-medium text-gray-700 mb-2">لون الإسم:</p>
                        <div className="flex flex-wrap gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color.id}
                              type="button"
                              onClick={() => setNameColor(color)}
                              className={`px-3 py-1 text-sm rounded-lg border-2 transition-colors ${
                                nameColor.id === color.id
                                  ? 'border-gray-800'
                                  : 'border-gray-200 hover:border-gray-400'
                              } ${
                                color.id === 'white' ? 'bg-white text-gray-700' : 
                                color.id === 'blue' ? 'bg-google-blue text-white' :
                                color.id === 'red' ? 'bg-google-red text-white' :
                                color.id === 'yellow' ? 'bg-google-yellow text-gray-900' :
                                color.id === 'green' ? 'bg-google-green text-white' :
                                'bg-gray-900 text-white'
                              }`}
                            >
                              {color.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Font Selector */}
                      <div>
                        <p className="text-md font-medium text-gray-700 mb-2">نوع الخط:</p>
                        <div className="flex flex-wrap gap-2">
                          {fontOptions.map((font) => (
                            <button
                              key={font.id}
                              type="button"
                              onClick={() => setNameFont(font)}
                              className={`px-3 py-1 text-sm rounded-lg border-2 transition-colors ${
                                nameFont.id === font.id
                                  ? 'bg-google-blue text-white border-google-blue'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-google-blue'
                              } ${font.className}`}
                            >
                              {font.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Font Size Selector */}
                      <div>
                        <p className="text-md font-medium text-gray-700 mb-2">حجم الخط:</p>
                        <div className="flex items-center justify-center gap-3 w-full max-w-[250px] mx-auto">
                          <button
                            type="button"
                            onClick={() => adjustFontSize(false)}
                            disabled={fontSizeIndex === 0}
                            className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                            aria-label="Decrease font size"
                          >
                            <span className="text-xl font-bold">-</span>
                          </button>
                          
                          <div className="flex-1 text-center">
                            <div className={`${fontSizeOptions[fontSizeIndex].value} font-bold`}>أ</div>
                            <div className="text-sm text-gray-600 mt-1">{fontSizeOptions[fontSizeIndex].label}</div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => adjustFontSize(true)}
                            disabled={fontSizeIndex === fontSizeOptions.length - 1}
                            className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                            aria-label="Increase font size"
                          >
                            <span className="text-xl font-bold">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="space-y-4">
                      <button
                        onClick={handleDownload}
                        className="w-full flex flex-row-reverse items-center justify-center gap-2 px-6 py-3 bg-google-blue text-white rounded-lg hover:bg-google-blue/90 transition-colors"
                      >
                        <Download size={20} />
                        تنزيل البطاقة
                      </button>
                      <button
                        onClick={handleShare}
                        className="w-full flex flex-row-reverse items-center justify-center gap-2 px-6 py-3 bg-google-yellow text-gray-900 rounded-lg hover:bg-google-yellow/90 transition-colors"
                      >
                        <Share2 size={20} />
                        مشاركة البطاقة
                      </button>
                      <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        إنشاء بطاقة أخرى
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="mt-12">
        {/* Colorful divider with the four Google colors */}
        <div className="flex w-full h-2">
          <div className="flex-1 bg-google-blue"></div>
          <div className="flex-1 bg-google-red"></div>
          <div className="flex-1 bg-google-yellow"></div>
          <div className="flex-1 bg-google-green"></div>
        </div>
        
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Mobile View - Stacked and centered */}
            <div className="lg:hidden">
              <div className="flex flex-col items-center space-y-6">
                {/* Logo */}
                <a 
                  href="https://x.com/GDOC_Team" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity duration-300"
                >
                  <img 
                    src="/assets/cards/horizontal-gdsc-logo.png" 
                    alt="GDSC Logo" 
                    className="h-10 w-auto"
                  />
                </a>
                
                {/* Credits */}
                <div className="text-center pt-2">
                  <p className="text-base">
                    Built with 
                    <span className="mx-1 text-google-red">❤️</span> 
                    by 
                    <span className="ml-1 text-google-blue">G</span><span className="text-google-red">D</span><span className="text-google-yellow">S</span><span className="text-google-green">C</span>
                  </p>
                  <p className="text-gray-500 mt-1 text-sm">
                    All rights reserved {new Date().getFullYear()} ©
                  </p>
                </div>
              </div>
            </div>
            
            {/* Desktop View - Logo right, credits left (swapped positions) */}
            <div className="hidden lg:block">
              <div className="flex justify-between items-center">
                {/* Left side - Credits */}
                <div>
                  <p className="text-lg">
                    Built with 
                    <span className="mx-1 text-google-red">❤️</span> 
                    by 
                    <span className="ml-2 text-google-blue">G</span><span className="text-google-red">D</span><span className="text-google-yellow">S</span><span className="text-google-green">C</span>
                  </p>
                  <p className="text-gray-500 mt-1 text-base">
                    All rights reserved {new Date().getFullYear()} ©
                  </p>
                </div>
                
                {/* Right side - Logo only */}
                <div className="flex items-center">
                  <a 
                    href="https://x.com/GDOC_Team" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity duration-300"
                  >
                    <img 
                      src="/assets/cards/horizontal-gdsc-logo.png" 
                      alt="GDSC Logo" 
                      className="h-10 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;