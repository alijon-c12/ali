import React, { useState, useRef, useEffect } from 'react';
import './Api.css';
import { FaPlay, FaPause, FaSearch, FaForward, FaBackward, FaMusic, FaGlobe, FaStar, FaHome } from 'react-icons/fa';

const Api = () => {
  const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Xurshid Rasulov");

  const audioRef = useRef(null);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const fetchMusic = async (term) => {
    setCurrentCategory(term);
    setLoading(true);
    try {
      // 100 tagacha natija izlaymiz
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=100`);
      const data = await res.json();
      const validTracks = data.results.filter(t => t.previewUrl);
      setTracks(validTracks);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Dastlab Xurshid Rasulovning barcha qo'shiqlarini iTunes'dan yuklash
    fetchMusic('Xurshid Rasulov');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      fetchMusic(searchQuery);
    }
  };

  const togglePlay = (track) => {
    if (!audioRef.current) return;

    if (activeTrack?.trackId === track.trackId) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    setActiveTrack(track);
    setIsPlaying(true);
    audioRef.current.src = track.previewUrl;
    audioRef.current.play();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleTimeUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleTimeUpdate);
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-app">
      {/* Sidebar - Yon panel */}
      <aside className="spotify-sidebar">
        <div className="logo-area">
          <FaMusic className="logo-icon" />
          <h1>Spotify <span>Clone</span></h1>
        </div>
        
        <div className="sidebar-scroll">
          <div className="nav-links">
             <ul>
               <li onClick={() => fetchMusic('Xurshid Rasulov')} className={currentCategory === 'Xurshid Rasulov' ? 'active-nav' : ''}>
                 <FaHome /> Bosh sahifa
               </li>
               <li onClick={() => document.querySelector('.search-input').focus()}>
                 <FaSearch /> Qidiruv
               </li>
             </ul>
          </div>
          
          <div className="category-section">
            <h2>O'ZBEK ESTRADASI</h2>
            <ul className="category-list">
              <li className={currentCategory === 'Xurshid Rasulov' ? 'active-cat' : ''} onClick={() => fetchMusic('Xurshid Rasulov')}>Xurshid Rasulov</li>
              <li className={currentCategory === 'Yulduz Usmonova' ? 'active-cat' : ''} onClick={() => fetchMusic('Yulduz Usmonova')}>Yulduz Usmonova</li>
              <li className={currentCategory === 'Shahzoda' ? 'active-cat' : ''} onClick={() => fetchMusic('Shahzoda')}>Shahzoda</li>
              <li className={currentCategory === 'Rayhon' ? 'active-cat' : ''} onClick={() => fetchMusic('Rayhon')}>Rayhon</li>
              <li className={currentCategory === 'Munisa Rizayeva' ? 'active-cat' : ''} onClick={() => fetchMusic('Munisa Rizayeva')}>Munisa Rizayeva</li>
              <li className={currentCategory === 'Sevara Nazarkhan' ? 'active-cat' : ''} onClick={() => fetchMusic('Sevara Nazarkhan')}>Sevara Nazarkhan</li>
              <li className={currentCategory === 'Shohruhxon' ? 'active-cat' : ''} onClick={() => fetchMusic('Shohruhxon')}>Shohruhxon</li>
              <li className={currentCategory === 'Jahongir Otajonov' ? 'active-cat' : ''} onClick={() => fetchMusic('Jahongir Otajonov')}>Jahongir Otajonov</li>
            </ul>
          </div>

          <div className="category-section">
            <h2>JAHON ESTRADASI</h2>
            <ul className="category-list">
              <li className={currentCategory === 'Eminem' ? 'active-cat' : ''} onClick={() => fetchMusic('Eminem')}>Eminem</li>
              <li className={currentCategory === 'Billie Eilish' ? 'active-cat' : ''} onClick={() => fetchMusic('Billie Eilish')}>Billie Eilish</li>
              <li className={currentCategory === 'Michael Jackson' ? 'active-cat' : ''} onClick={() => fetchMusic('Michael Jackson')}>Michael Jackson</li>
              <li className={currentCategory === 'The Weeknd' ? 'active-cat' : ''} onClick={() => fetchMusic('The Weeknd')}>The Weeknd</li>
              <li className={currentCategory === 'Dua Lipa' ? 'active-cat' : ''} onClick={() => fetchMusic('Dua Lipa')}>Dua Lipa</li>
              <li className={currentCategory === 'Adele' ? 'active-cat' : ''} onClick={() => fetchMusic('Adele')}>Adele</li>
              <li className={currentCategory === 'Ed Sheeran' ? 'active-cat' : ''} onClick={() => fetchMusic('Ed Sheeran')}>Ed Sheeran</li>
              <li className={currentCategory === 'Rihanna' ? 'active-cat' : ''} onClick={() => fetchMusic('Rihanna')}>Rihanna</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="spotify-header">
          <form className="search-bar" onSubmit={handleSearch}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Qo'shiq, ijrochi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </header>

        <section className="track-section">
          <div className="section-header">
            <h2 className="category-title">{currentCategory}</h2>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="track-grid">
              {tracks.map((track) => (
                <div
                  className={`track-card ${activeTrack?.trackId === track.trackId ? 'active-card' : ''}`}
                  key={track.trackId}
                  onClick={() => togglePlay(track)}
                >
                  <div className="image-container">
                    <img
                      src={track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://via.placeholder.com/300'}
                      alt={track.trackName}
                    />
                    <div className={`play-overlay ${activeTrack?.trackId === track.trackId && isPlaying ? 'is-playing-overlay' : ''}`}>
                      {activeTrack?.trackId === track.trackId && isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '4px' }} />}
                    </div>
                  </div>
                  <div className="track-info-card">
                    <h3 className={activeTrack?.trackId === track.trackId ? 'text-blue' : ''}>{track.trackName}</h3>
                    <p>{track.artistName}</p>
                  </div>
                </div>
              ))}
              {tracks.length === 0 && (
                <div className="no-results">
                  <FaMusic size={40} style={{ opacity: 0.5, marginBottom: '15px' }} />
                  <p>Afsuski, qo'shiqlar topilmadi.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Player controls */}
      {activeTrack && (
        <div className="spotify-player">
          <div className="player-track-info">
            <img src={activeTrack.artworkUrl100} alt={activeTrack.trackName} className="player-cover" />
            <div className="player-text">
              <h4>{activeTrack.trackName}</h4>
              <p>{activeTrack.artistName}</p>
            </div>
          </div>

          <div className="player-controls-container">
            <div className="player-buttons">
              <button className="control-btn"><FaBackward /></button>
              <button className="play-pause-btn" onClick={() => togglePlay(activeTrack)}>
                {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
              </button>
              <button className="control-btn"><FaForward /></button>
            </div>
            
            <div className="progress-container">
              <span className="time">{formatTime(currentTime)}</span>
              
              <div className="progress-bar-wrapper">
                <input
                  type="range"
                  className="progress-bar"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  style={{ background: `linear-gradient(to right, #1e90ff ${progressPercent}%, #4d4d4d ${progressPercent}%)` }}
                />
              </div>

              <span className="time">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="player-extra">
          </div>
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Api;