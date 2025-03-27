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

// Define color options
const colorOptions = [
  { id: 'white', label: 'أبيض', className: 'text-white' },
  { id: 'blue', label: 'أزرق', className: 'text-google-blue' },
  { id: 'red', label: 'أحمر', className: 'text-google-red' },
  { id: 'yellow', label: 'أصفر', className: 'text-google-yellow' },
  { id: 'green', label: 'أخضر', className: 'text-google-green' },
  { id: 'black', label: 'أسود', className: 'text-gray-900' },
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

// Define font size options - simplified to 3 options
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
  
  // Fixed position 
  const fixedOffsetY = -80; // Adjusted to -80px as requested
  const isiOSDevice = /iPhone|iPod/.test(navigator.userAgent);
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
      
      // Reset any previous position properties
      nameContainerRef.current.style.top = '';
      nameContainerRef.current.style.right = '';
      nameContainerRef.current.style.bottom = '';
      nameContainerRef.current.style.left = '';
      nameContainerRef.current.style.transform = '';
      
      // Instead of device-specific positioning, use relative percentages
      // This will adapt better to different screen sizes
      if (namePosition.id === 'bottom') {
        // Position at 70% from the top (moved up significantly from 80%)
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
        nameContainerRef.current.style.left = '10%';
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
  }, [namePosition.id, nameColor.id, nameFont.id, fontSizeIndex, name]);

  // Handle name submission and card generation
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const randomIndex = Math.floor(Math.random() * cardDesigns.length);
      setSelectedCard(cardDesigns[randomIndex]);
      setShowCard(true);
      // Show fireworks again when card is generated
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 10000);
    }
  };

  // Helper function for card image processing
  const prepareCardImage = async (callback: (blob: Blob) => Promise<void> | void, loadingMessage: HTMLDivElement) => {
    if (!cardRef.current) return;
    
    try {
      // Small delay to ensure all styles are fully applied and rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create a temporary clone to adjust position before capture
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = `${cardRef.current.offsetWidth}px`;
      tempDiv.style.height = `${cardRef.current.offsetHeight}px`;
      tempDiv.innerHTML = cardRef.current.outerHTML;
      document.body.appendChild(tempDiv);
      
      // Get the name container in the clone and ensure consistent positioning
      const nameContainer = tempDiv.querySelector('[data-name-container="true"]') as HTMLElement;
      if (nameContainer && nameContainerRef.current) {
        // Copy all styles from the original to maintain consistency
        nameContainer.style.cssText = nameContainerRef.current.style.cssText;
        
        // No need for additional adjustments since we're using percentage-based positioning
        // which will maintain the same relative position regardless of device
      }
      
      // Capture the adjusted clone
      const canvas = await html2canvas(tempDiv.firstChild as HTMLElement, {
        scale: 3, // Higher resolution for better quality
        logging: false,
        useCORS: true,
        backgroundColor: null, // Transparent background
        allowTaint: true
      });
      
      // Remove the temp element
      document.body.removeChild(tempDiv);
      
      // Convert to blob and process with callback
      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          await callback(blob);
        }
        // Clean up
        document.body.removeChild(loadingMessage);
      }, 'image/png');
    } catch (error) {
      console.error('Error processing card:', error);
      document.body.removeChild(loadingMessage);
      alert('حدث خطأ أثناء تحضير البطاقة. الرجاء المحاولة مرة أخرى.');
    }
  };

  // Handle card download
  const handleDownload = async () => {
    // Show a loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.innerText = 'جاري تحضير البطاقة...';
    loadingMessage.className = 'fixed top-0 left-0 w-full bg-google-blue text-white text-center py-2 z-50';
    document.body.appendChild(loadingMessage);
    
    await prepareCardImage((blob) => {
            // Create a download link
            const link = document.createElement('a');
            link.download = `eid-card-${name}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            
            // Clean up
            URL.revokeObjectURL(link.href);
    }, loadingMessage);
  };

  // Handle card sharing
  const handleShare = async () => {
        // Show a loading message
        const loadingMessage = document.createElement('div');
        loadingMessage.innerText = 'جاري تحضير البطاقة للمشاركة...';
        loadingMessage.className = 'fixed top-0 left-0 w-full bg-google-yellow text-gray-900 text-center py-2 z-50';
        document.body.appendChild(loadingMessage);
        
    await prepareCardImage(async (blob) => {
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
    }, loadingMessage);
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
          <div className="before" style={{left: '90%', animationDelay: '2.2s'}}></div>
          <div className="after" style={{left: '10%', animationDelay: '3.5s'}}></div>
        </div>
      )}
      
      {/* Initial input view */}
      {!showCard ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center">
            {/* Logo and greeting */}
            <div className="mb-12">
              <img 
                src="/assets/cards/gdsc-logo.png" 
                alt="شعار GDSC" 
                className="h-30 w-60 mx-auto mb-6"
              />
              <h1 className="text-2xl font-semibold mb-4 flex justify-center gap-2 flex-wrap">
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
                        padding: '0 1rem'
                      }}
                      data-name-container="true"
                      data-position-type={namePosition.id}>
                      <h3 className={`font-bold ${nameColor.className} ${nameFont.className} ${fontSizeOptions[fontSizeIndex].value}`} data-name-element="true">
                        {name}
                      </h3>
                    </div>
                  </div>

                  {/* Customization tools */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      {/* <h2 className="text-2xl font-extrabold text-gray-900">بطاقة المطور الخاصة بك</h2> */}
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
                    src="/assets/cards/gdsc-logo.png" 
                    alt="GDSC Logo" 
                    className="h-16 w-auto"
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
                      src="/assets/cards/gdsc-logo.png" 
                      alt="GDSC Logo" 
                      className="h-20 w-40"
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