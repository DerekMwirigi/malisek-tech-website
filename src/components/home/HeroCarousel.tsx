import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Latest iPhone 15 Pro Max",
    subtitle: "Revolutionary Performance",
    description: "Experience the power of A17 Pro chip with titanium design",
    price: 1199,
    originalPrice: 1299,
    image: "/api/placeholder/800/600",
    color: "from-slate-900 to-blue-900",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "MacBook Air M3",
    subtitle: "Supercharged Productivity",
    description: "Ultra-thin design meets incredible performance",
    price: 1099,
    originalPrice: 1199,
    image: "/api/placeholder/800/600",
    color: "from-purple-900 to-indigo-900",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Gaming Setup Sale",
    subtitle: "Up to 40% Off",
    description: "Complete your gaming setup with premium monitors and accessories",
    price: 299,
    image: "/api/placeholder/800/600",
    color: "from-green-900 to-teal-900",
    textColor: "text-white"
  }
];

export const HeroCarousel = () => {
  // Conversion rate: 1 USD = 150 KES
  const usdToKes = (usd: number) => `KES ${Math.round(usd * 150).toLocaleString()}`;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-[220px] xs:h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden rounded-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color}`}
        >
          <div className="container mx-auto px-2 sm:px-6 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
              {/* Content */}
              <motion.div 
                className={`space-y-4 sm:space-y-6 ${slides[currentSlide].textColor}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base sm:text-xl opacity-90 max-w-xs sm:max-w-md"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-baseline gap-2 sm:gap-4"
                >
                  <span className="text-2xl sm:text-4xl font-bold text-primary">
                    {usdToKes(slides[currentSlide].price)}
                  </span>
                  {slides[currentSlide].originalPrice && (
                    <span className="text-base sm:text-xl line-through opacity-60">
                      {usdToKes(slides[currentSlide].originalPrice)}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-2 sm:gap-4"
                >
                  <Button className="bg-primary hover:bg-primary/90 px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Shop Now
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative flex justify-center"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-2 xs:p-4 sm:p-8 w-28 h-28 xs:w-40 xs:h-40 sm:w-80 sm:h-80 mx-auto">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-primary text-primary-foreground px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg"
                >
                  ⚡ Fast Delivery
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white text-foreground px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg"
                >
                  🔒 Secure Payment
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};