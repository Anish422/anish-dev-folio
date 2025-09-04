import { motion } from "framer-motion";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { Link } from "react-router-dom";
import headshotImage from "@/assets/headshot.jpg";
import headshot2 from "@/assets/headshot-2.jpg";
import headshot3 from "@/assets/headshot-3.jpg";
import headshot4 from "@/assets/headshot-4.jpg";
import headshot5 from "@/assets/headshot-5.jpg";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of profile images
  const profileImages = [
    headshotImage,
    headshot2,
    headshot3,
    headshot4,
    headshot5
  ];
  
  // Cycle through different images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    // Link to main resume - will be updated when actual PDFs are added
    const link = document.createElement('a');
    link.href = '/assets/resume/Anish Shah - Software Resume.pdf';
    link.download = 'Anish Shah - Resume.pdf';
    link.click();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.p 
              className="text-sm md:text-base font-medium text-primary mb-4 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to my portfolio
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {profile.heroTitle.split('—').map((part, index) => (
                <span key={index} className={index === 1 ? "gradient-text block" : "block"}>
                  {part.trim()}
                  {index === 0 && "—"}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {profile.heroSubtitle}
            </motion.p>
          </motion.div>

          {/* Animated Profile Picture */}
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Animated border ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30 blur-sm"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main profile image with crossfade */}
              <motion.img
                key={currentImageIndex}
                src={profileImages[currentImageIndex]}
                alt="Anish Shah - Profile"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-2xl relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              />
              
              {/* Floating animation dots */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button size="lg" className="btn-primary" asChild>
              <Link to="/projects" className="inline-flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleDownloadResume}
              className="group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce-subtle" />
              Download Resume
            </Button>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {profile.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="metric-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}