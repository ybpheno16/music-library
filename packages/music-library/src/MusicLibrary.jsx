import { useState, useMemo } from 'react'
import './MusicLibrary.css'

// Sample music data
const sampleSongs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    genre: 'Rock',
    duration: '5:55',
    year: 1975
  },
  {
    id: 2,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    genre: 'Rock',
    duration: '8:02',
    year: 1971
  },
  {
    id: 3,
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    genre: 'Rock',
    duration: '6:30',
    year: 1976
  },
  {
    id: 4,
    title: 'Sweet Child O Mine',
    artist: 'Guns N Roses',
    album: 'Appetite for Destruction',
    genre: 'Rock',
    duration: '5:03',
    year: 1987
  },
  {
    id: 5,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    genre: 'Pop',
    duration: '4:54',
    year: 1982
  },
  {
    id: 6,
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    genre: 'Folk Rock',
    duration: '6:13',
    year: 1965
  },
  {
    id: 7,
    title: 'Purple Haze',
    artist: 'Jimi Hendrix',
    album: 'Are You Experienced',
    genre: 'Rock',
    duration: '2:50',
    year: 1967
  },
  {
    id: 8,
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    genre: 'Rock',
    duration: '3:03',
    year: 1971
  },
  {
    id: 9,
    title: 'Good Vibrations',
    artist: 'The Beach Boys',
    album: 'Pet Sounds',
    genre: 'Pop Rock',
    duration: '3:39',
    year: 1966
  },
  {
    id: 10,
    title: 'Hey Jude',
    artist: 'The Beatles',
    album: 'Hey Jude',
    genre: 'Rock',
    duration: '7:11',
    year: 1968
  }
]

const MusicLibrary = ({ userRole = 'user', onSongAdd, onSongDelete }) => {
  const [songs, setSongs] = useState(sampleSongs)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [sortDirection, setSortDirection] = useState('asc')
  const [groupBy, setGroupBy] = useState('none')
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    year: ''
  })

  // Filter songs based on search term using array methods
  const filteredSongs = useMemo(() => {
    if (!filter) return songs

    const searchTerm = filter.toLowerCase().trim()
    return songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm) ||
      song.album.toLowerCase().includes(searchTerm) ||
      song.genre.toLowerCase().includes(searchTerm) ||
      song.year.toString().includes(searchTerm)
    )
  }, [songs, filter])

  // Sort songs using array methods
  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [filteredSongs, sortBy, sortDirection])

  // Group songs using reduce method
  const groupedSongs = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Songs': sortedSongs }
    }

    return sortedSongs.reduce((groups, song) => {
      const groupKey = song[groupBy]
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(song)
      return groups
    }, {})
  }, [sortedSongs, groupBy])

  const handleAddSong = (e) => {
    e.preventDefault()
    if (userRole !== 'admin') return

    const id = Math.max(...songs.map(s => s.id)) + 1
    const songToAdd = { 
      ...newSong, 
      id,
      year: parseInt(newSong.year) || new Date().getFullYear()
    }
    
    setSongs(prev => [...prev, songToAdd])
    setNewSong({
      title: '',
      artist: '',
      album: '',
      genre: '',
      duration: '',
      year: ''
    })
    
    if (onSongAdd) onSongAdd(songToAdd)
  }

  const handleDeleteSong = (songId) => {
    if (userRole !== 'admin') return
    
    setSongs(prev => prev.filter(song => song.id !== songId))
    if (onSongDelete) onSongDelete(songId)
  }

  return (
    <div className="music-library">
      <header className="music-library-header">
        <h2>🎵 Music Library</h2>
        <div className="user-info">
          <span className={`role-badge ${userRole}`}>
            {userRole === 'admin' ? '👑 Admin' : '👤 User'}
          </span>
        </div>
      </header>

      {/* Controls */}
      <div className="controls">
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search songs, artists, albums, genres, or years..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
            aria-label="Search for songs, artists, albums, genres, or years"
          />
          {filter && (
            <button
              onClick={() => setFilter('')}
              className={`clear-search-btn ${filter ? 'visible' : ''}`}
              aria-label="Clear search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="sort-group-controls">
          <div className="control-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="control-select"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
              <option value="year">Year</option>
            </select>
            <button 
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="sort-direction-btn"
              title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
              aria-label={`Change sort direction to ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="control-group">
            <label>Group by:</label>
            <select 
              value={groupBy} 
              onChange={(e) => setGroupBy(e.target.value)}
              className="control-select"
            >
              <option value="none">None</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
              <option value="genre">Genre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Song Form - Admin Only */}
      {userRole === 'admin' && (
        <form onSubmit={handleAddSong} className="add-song-form">
          <h3>Add New Song</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Title"
              value={newSong.title}
              onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Artist"
              value={newSong.artist}
              onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Album"
              value={newSong.album}
              onChange={(e) => setNewSong(prev => ({ ...prev, album: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Genre"
              value={newSong.genre}
              onChange={(e) => setNewSong(prev => ({ ...prev, genre: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 3:45)"
              value={newSong.duration}
              onChange={(e) => setNewSong(prev => ({ ...prev, duration: e.target.value }))}
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={newSong.year}
              onChange={(e) => setNewSong(prev => ({ ...prev, year: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="add-btn">Add Song</button>
        </form>
      )}

      {/* Results Summary */}
      {filter && (
        <div className="results-summary">
          <p>
            {filteredSongs.length > 0 
              ? `Found ${filteredSongs.length} song${filteredSongs.length !== 1 ? 's' : ''} matching "${filter}"`
              : `No songs found matching "${filter}"`
            }
          </p>
          {filteredSongs.length === 0 && (
            <button 
              onClick={() => setFilter('')}
              className="clear-search-link"
            >
              Clear search to see all songs
            </button>
          )}
        </div>
      )}

      {/* Song List */}
      <div className="songs-container">
        {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
          <div key={groupName} className="song-group">
            {groupBy !== 'none' && (
              <h3 className="group-title">{groupName} ({groupSongs.length})</h3>
            )}
            <div className="songs-grid">
              {groupSongs.map(song => (
                <div key={song.id} className="song-card">
                  <div className="song-info">
                    <h4 className="song-title">{song.title}</h4>
                    <p className="song-artist">{song.artist}</p>
                    <p className="song-album">{song.album} ({song.year})</p>
                    <div className="song-meta">
                      <span className="song-genre">{song.genre}</span>
                      <span className="song-duration">{song.duration}</span>
                    </div>
                  </div>
                  {userRole === 'admin' && (
                    <button 
                      onClick={() => handleDeleteSong(song.id)}
                      className="delete-btn"
                      title="Delete song"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicLibrary
