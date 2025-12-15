import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const slides = [
  {
    img: "https://i.ibb.co/Tx60pB1m/imgi-13-woman-controlling-smart-devices-with-a-digital-tablet-at-home-1024x684.jpg",
    title: "Plan Your Habits",
    subtitle: "Track your daily routines and build strong habits.",
    cta: "Start Tracking",
  },
  {
    img: "https://i.ibb.co/vCJ7V3p8/7-1-650x650.webp",
    title: "Stay Healthy",
    subtitle: "Maintain fitness and wellness with daily tracking.",
    cta: "Add Habit Now",
  },
  {
    img: "https://i.ibb.co/rNHy3kt/imgi-12-couple-relaxing-with-at-home.jpg",
    title: "Boost Productivity",
    subtitle: "Focus on your tasks and achieve your goals consistently.",
    cta: "Explore Habits",
  },
]

const Banner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map(
        (slide, index) =>
          index === current && (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                  className="text-3xl sm:text-5xl font-bold mb-2 text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Typewriter
                    words={[slide.title]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </motion.h1>

                <motion.p
                  className="text-sm sm:text-lg mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slide.cta}
                </motion.button>
              </div>
            </motion.div>
          )
      )}

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
      >
        {"<"}
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
      >
        {">"}
      </button>
    </div>
  )
}

export default Banner
