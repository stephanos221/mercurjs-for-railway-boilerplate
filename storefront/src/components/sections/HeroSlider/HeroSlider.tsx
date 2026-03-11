"use client"

import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons"
import { useCallback, useEffect, useState } from "react"
import tailwindConfig from "../../../../tailwind.config"

const SLIDES = [
  {
    bg: "bg-slate-700",
    heading: "New Arrivals This Week",
    sub: "Fresh drops from top sellers — be the first to grab them.",
  },
  {
    bg: "bg-stone-600",
    heading: "Top Brands at Great Prices",
    sub: "Premium labels, pre-loved condition, unbeatable value.",
  },
  {
    bg: "bg-zinc-700",
    heading: "Sell Your Pre-Loved Items",
    sub: "Turn your wardrobe into cash in minutes.",
  },
  {
    bg: "bg-neutral-600",
    heading: "Discover Unique Finds",
    sub: "One-of-a-kind pieces you won't find anywhere else.",
  },
]

const AUTOPLAY_INTERVAL = 4000

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="5" y="4" width="4" height="16" rx="1" />
    <rect x="15" y="4" width="4" height="16" rx="1" />
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6 4l14 8-14 8V4z" />
  </svg>
)

export const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [isPlaying, setIsPlaying] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi || !isPlaying) return
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [emblaApi, isPlaying])

  const arrowColor =
    (tailwindConfig.theme?.extend?.colors as Record<string, string>)
      ?.tertiary ?? "#fff"

  return (
    <div className="relative w-full overflow-hidden">
      <div className="embla__viewport h-44" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {SLIDES.map(({ bg, heading, sub }, i) => (
            <div
              key={i}
              className={`embla__slide flex-[0_0_100%] min-w-0 ${bg} flex flex-col items-center justify-center text-white text-center px-6`}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-1">{heading}</h2>
              <p className="text-sm md:text-base opacity-80">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls: centred at the bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="text-white hover:opacity-70 transition-opacity"
        >
          <ArrowLeftIcon color={arrowColor} size={20} />
        </button>

        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          className="text-white hover:opacity-70 transition-opacity"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next slide"
          className="text-white hover:opacity-70 transition-opacity"
        >
          <ArrowRightIcon color={arrowColor} size={20} />
        </button>
      </div>
    </div>
  )
}
