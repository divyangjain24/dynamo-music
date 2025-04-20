import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset playing state when track changes
    setIsPlaying(false);
  }, [track]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="music-player">
      <div className="player-content">
        <div className="player-left">
          <img src={track.album.cover_medium} alt={track.title} className="player-artwork" />
        </div>
        
        <div className="player-center">
          <div className="track-info">
            <h3>{track.title}</h3>
            <p>{track.artist.name}</p>
          </div>
          
          <div className="player-controls">
            <button className="control-button play-button" onClick={handlePlayPause}>
              <span role="img" aria-label="play/pause">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {track.preview && (
        <audio 
          ref={audioRef}
          src={track.preview}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => console.error("Audio playback error:", e)}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
