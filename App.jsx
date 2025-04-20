import React, { useState } from "react";
import "./App.css";
import { searchSongs } from "./api/shazam";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const songs = await searchSongs(query);
    setResults(songs);
  };

  return (
    <div className="app">
      <div className="hero-section">
        <div className="animated-waves"></div>
        <div className="hero-content">
          <h1>🎵 Dynamo Music</h1>
          <p className="tagline">Your Personal Symphony of Sound</p>
          <p className="sub-tagline">Discover millions of tracks, create your perfect playlist</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">
                <span role="img" aria-label="search">🔍</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="featured-section">
        <div className="section-header">
          <h2>Featured Music</h2>
          <div className="genre-tags">
            <span className="tag">Pop</span>
            <span className="tag">Rock</span>
            <span className="tag">Hip-Hop</span>
            <span className="tag">Electronic</span>
          </div>
        </div>

        <div className="results">
          {results.length > 0 ? (
            results.map((track) => (
              <div
                key={track.id}
                className="song-card"
                onClick={() => setNowPlaying(track)}
              >
                <div className="card-image">
                  <img src={track.album.cover_medium} alt={track.title} />
                  <div className="play-overlay">
                    <div className="play-button-overlay">▶️</div>
                  </div>
                </div>
                <div className="card-info">
                  <h4>{track.title}</h4>
                  <p>{track.artist.name}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-content">
                <span className="empty-icon">🎵</span>
                <p>Start your musical journey</p>
                <p className="empty-subtitle">Search for your favorite artists, songs, or albums</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {nowPlaying && <MusicPlayer track={nowPlaying} />}
    </div>
  );
};

export default App;
