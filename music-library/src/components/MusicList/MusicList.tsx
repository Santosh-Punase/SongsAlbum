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
        <div className="ml-flex-row">
          <label className="ml-sort-label" htmlFor="sort-selection">Sort By:</label>
          <select id="sort-selection" value={sortOption} className="ml-sort-button" onChange={(e) => setSortOption(e.target.value as SortOption)}>
            <option value={'title'}>Title</option>
            <option value={'artist'}>Artist</option>
            <option value={'album'}>Album</option>
          </select>
        </div>
        <div className="ml-flex-row">
          <input
            type="text"
            placeholder="Search by title / album / artist"
            onChange={(e) => setSearch(e.target.value)}
          />
          { userRole === 'admin' && (
            <button className="ml-add-button" onClick={() => setShowList(false)}>Add</button>
          )}
        </div>
      </div>
      <ul className="ml-list">
        {filteredSongs.map((song) => (
          <li className="ml-thumbnail" key={song.id}>
            <div className="ml-image">Thumbnail</div>
            <p className="ml-clip ml-title" data-testid="song-title">{song.title}</p>
            <p className="ml-clip ml-album">{song.album}</p>
            <p className="ml-clip ml-artist">{song.artist}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
