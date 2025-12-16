import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const slides = [
  {
    img: "https://i.ibb.co.com/mF28Fs4D/tasty-chicken-kid-friendly-recipes-a-culinary-adventure-for-little-chefs-20af302a-e960-4fba-806d-50d.webp",
    title: "Fresh Ingredients Delivered",
    subtitle: "Get farm-fresh ingredients directly to your kitchen with LocalChefBazar.",
    cta: "Shop Fresh Now",
  },
  {
    img: "https://i.ibb.co.com/pjVZj5KC/skilled-sushi-chef-arranges-vibrant-pieces-slate-platter-bright-kitchen-expert-artfully-prepares-col.webp",
    title: "Discover Chef Recipes",
    subtitle: "Explore a variety of chef-curated recipes to cook delicious meals at home.",
    cta: "Explore Recipes",
  },
  {
    img: "https://i.ibb.co/YFWC0732/images-7.jpg",
    title: "Cooking Made Easy",
    subtitle: "From beginner to pro, LocalChefBazar makes cooking simple and fun.",
    cta: "Start Cooking",
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
    <div className="relative mt-[-30px] w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
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
                  className="px-6 py-2 font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-400 hover:to-orange-400 transition"
                  whileHover={{ scale: 1.05 }}
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
