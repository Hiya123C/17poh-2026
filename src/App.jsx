import { useState, useRef, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import pinkHeart from './assets/pink-heart.svg'
import whiteHeart from './assets/white-heart.svg'
import blackHeart from './assets/black-heart.svg'
import star from './assets/star.svg'
import poshi from './assets/poshi.jpeg'
import bgMusic from './assets/audio/bday-bossa.mp3'
import catSound from './assets/audio/meow.mp3'
import './index.css'

function App() {
  const [revealed, setRevealed] = useState(false)
  const [drops, setDrops] = useState([])
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const catAudioRef = useRef(null)

    const handleReveal = () => {
      setRevealed(true)

      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }

    const toggleMusic = () => {
      if (!audioRef.current) return

      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }

      setIsPlaying(!isPlaying)
    }

    const playCatSound = () => {
      if (!catAudioRef.current) return

      catAudioRef.current.currentTime = 0
      catAudioRef.current.play()
    }

    const spawnDrops = (emoji) => {
      const newDrops = Array.from({ length: 15 }).map(() => ({
        id: Math.random(),
        emoji,
        left: Math.random() * 100
      }))

      setDrops(prev => [...prev, ...newDrops])

      setTimeout(() => {
        setDrops(prev => prev.filter(d => !newDrops.includes(d)))
      }, 3000)
    }

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[var(--light-pink)]">
      <audio ref={audioRef} src={bgMusic} loop />
      <audio ref={catAudioRef} src={catSound} preload="auto" />
      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-center bg-white
          transition-all duration-700 ease-in-out
          ${revealed ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"}
        `}
      >
        <p className='text-[var(--contrast)]'>nothing to see here....</p>
        <img src={blackHeart} className="w-64 p-8"/>
        <p className='text-[var(--contrast)]'>definitely DO NOT cmd + A...</p>
        <img
          src={whiteHeart}
          className="w-24 cursor-pointer absolute top-6 right-6 hover:scale-110 transition"
          onClick={handleReveal}

        />
      </div>

      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-center
          bg-[var(--light-pink)]
          transition-all duration-700 ease-in-out
          ${revealed ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className='flex justify-center gap-12 items-center'>
          <p>porsche</p>
          <p>•</p>
          <p>potassium hydroxide</p>
          <p>•</p>
          <p>poshi</p>
        </div>
        <h1 className='font-[PinkPastel] text-8xl font-bold pt-20 pb-10'>P0H</h1>

        <div className='flex gap-50 justify-center items-center'>
          <div className="relative flex items-center justify-center">
            <img src={star} onClick={() => setLeftOpen(true)}
              className={`
                w-28 cursor-pointer hover:scale-110 active:scale-125 transition-all duration-700
                ${leftOpen ? "-translate-x-40 rotate-12" : ""}
              `}
            />

            {leftOpen && (
              <div className="absolute left-0 bg-white shadow-xl rounded-xl p-6 w-75 envelope-open">
                <p className="text-[var(--main-pink)]">
                  Yo! guten morning :) idk when you're gonna find this but you should be smart enough LOL!!
                  you is the very very good people. you is the amazing kind. very awesome.
                  hope everything u do in ur life u enjoy. KEEP RUNNING, DONT STOP. !!!
                  HAPPPYYY 17th BIRTHHHDAYYYYY!!!!!!!! (miao!)
                  <br></br><br></br>-- crystal
                </p>
              </div>
            )}
          </div>

          <img src={pinkHeart} alt="pinkie-heartie" className="w-64 cursor-pointer heartbeat"/>
          
          <div className="relative flex items-center justify-center">
            <img src={star} onClick={() => setRightOpen(true)}
              className={`
                w-28 cursor-pointer hover:scale-110 active:scale-125 transition-all duration-700
                ${rightOpen ? "translate-x-40 -rotate-12" : ""}
              `}
            />

            {rightOpen && (
              <div className="absolute right-0 w-60 shadow-xl rounded-xl flex gap-3 animate-fade">
                <img src={poshi} className="w-full rounded-lg"/>
              </div>
            )}
          </div>
        </div>

        <h2 className='font-[PinkPastel] text-3xl pt-10'>21 Mar 2026</h2>
        <h2 className='font-[PinkPastel] text-2xl pt-4'>Saturday</h2>

        {/*absolute icons*/}
        <button
          onClick={toggleMusic}
          className="absolute top-6 right-6 text-3xl text-[var(--main-pink)] hover:scale-105 transition cursor-pointer"
        >
          <span className="material-symbols-outlined">
            {isPlaying ? "music_note" : "music_off"}
          </span>
        </button>

        <p className='absolute top-6 left-6 font-[PinkPastel] text-[var(--main-pink)] font-bold'>happy bday</p>
        
        <DotLottieReact
          onClick={playCatSound}
          className='absolute bottom-0 left-0 w-80 cursor-pointer'
          src="https://lottie.host/12a09055-5c33-4c72-b0dc-93f898e622f5/8NVSH9QXzR.lottie"
          loop
          autoplay
        />

        <div className="absolute bottom-6 right-6 bg-[var(--shadow-pink)] backdrop-blur-md px-4 py-2 rounded-full flex gap-3 shadow-md">
          <button onClick={() => spawnDrops("🎉")} className="text-2xl hover:scale-125 transition">🎉</button>
          <button onClick={() => spawnDrops("⭐")} className="text-2xl hover:scale-125 transition">⭐</button>
          <button onClick={() => spawnDrops("🎀")} className="text-2xl hover:scale-125 transition">🎀</button>
          <button onClick={() => spawnDrops("🐱")} className="text-2xl hover:scale-125 transition">🐱</button>
        </div>
      </div>

      {drops.map(drop => (
        <div
          key={drop.id}
          className="falling"
          style={{ left: `${drop.left}%` }}
        >
          {drop.emoji}
        </div>
      ))}
    </div>
  )
}



export default App
