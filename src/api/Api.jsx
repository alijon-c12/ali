import React, { useState, useRef } from 'react'
import './Api.css'
import boloradiAudio from '../api/boloradi.mp3'

const Api = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const playRef = useRef(null)

  const togglePlay = () => {
    if (isPlaying) {
      playRef.current.pause()
    } else {
      playRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <h2>Bolaveradi</h2>
      <p>Xurshid Rasulov</p>
      
      {/* Attach the ref and the imported audio source here */}
      <audio ref={playRef} src={boloradiAudio}></audio>
      
      <img src="https://avatars.mds.yandex.net/i?id=511a9bfecc89c3e864b210aa1f97392a813d34dd-5221787-images-thumbs&n=13" alt="Xurshid Rasulov" />
      
      <div className="controls">
        <button onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  )
}

export default Api