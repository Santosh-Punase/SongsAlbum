import { useState } from "react";

import { Song, SortOption } from "../../type/Music";
import './MusicList.css'

export default function MusicList({ songs, setShowList }: { songs: Song[], setShowList: (v: boolean) => void }) {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>('title');

  const filteredSongs = songs
  .filter((song) => (
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.album.toLowerCase().includes(search.toLowerCase())
  )).sort((a, b) => a[sortOption].localeCompare(b[sortOption])); // Sort by title

  const userRole = localStorage.getItem('userRole');

  return (
    <>
      <h2>Music Library</h2>
      <div className="ml-header">
        <label className="ml-sort-label">Sort By:</label>
        <select value={sortOption} className="ml-sort-button" onChange={(e) => setSortOption(e.target.value as SortOption)}>
          <option value={'title'}>Title</option>
          <option value={'artist'}>Artist</option>
          <option value={'album'}>Album</option>
        </select>
        <input
          type="text"
          placeholder="Search by title / album / artist"
          onChange={(e) => setSearch(e.target.value)}
        />
        { userRole === 'admin' && (
          <button onClick={() => setShowList(false)}>Add</button>
        )}
      </div>
      <ul className="ml-list">
        {filteredSongs.map((song) => (
          <li className="ml-thumbnail" key={song.id}>
            <div className="ml-image"></div>
            <p className="ml-clip ml-title">{song.title}</p>
            <p className="ml-clip ml-album">{song.album}</p>
            <p className="ml-clip ml-artist">{song.artist}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
