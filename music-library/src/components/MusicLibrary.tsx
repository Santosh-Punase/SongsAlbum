import { useState } from "react";

import './MusicLibrary.css'

const songs = [
  { id: 1, title: "Tum Hi Ho", album: "Aashiqui 2", artist: "Arijit Singh" },
  { id: 2, title: "Channa Mereya", album: "Ae Dil Hai Mushkil", artist: "Arijit Singh" },
  { id: 3, title: "Tera Ban Jaunga", album: "Kabir Singh", artist: "Akhil Sachdeva, Tulsi Kumar" },
  { id: 4, title: "Dil Dhadakne Do", album: "Zindagi Na Milegi Dobara", artist: "Shankar-Ehsaan-Loy" },
  { id: 5, title: "Agar Tum Saath Ho", album: "Tamasha", artist: "Alka Yagnik, Arijit Singh" },
  { id: 6, title: "Senorita", album: "Zindagi Na Milegi Dobara", artist: "Farhan Akhtar, Hrithik Roshan, Abhay Deol" },
  { id: 7, title: "Ghungroo", album: "War", artist: "Arijit Singh, Shilpa Rao" },
  { id: 8, title: "Bekhayali", album: "Kabir Singh", artist: "Sachet Tandon" },
  { id: 9, title: "Kaun Tujhe", album: "M.S. Dhoni: The Untold Story", artist: "Palak Muchhal" },
  { id: 10, title: "Lut Gaye", album: "Single", artist: "Jubin Nautiyal" }
];

type SortOption = 'title' | 'artist' | 'album';

export default function MusicLibrary() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>('title');

  const filteredSongs = songs
  .filter((song) => (
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.album.toLowerCase().includes(search.toLowerCase())
  )).sort((a, b) => a[sortOption].localeCompare(b[sortOption])); // Sort by title

  return (
    <div className="ml-container">
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
        <button onClick={() => null}>Add</button>
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
    </div>
  );
}
