import { useState } from 'react';

import './AddSong.css';
import { Song } from '../../type/Music';

const AddSong = ({ setSongs, setShowList }: { setSongs: (song: Omit<Song, 'id'>) => void, setShowList: (v: boolean) => void }) => {
  const [song, setSong] = useState({ title: "", artist: "", album: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!song.title || !song.album || !song.artist) {
      alert('Enter Song details');
      return;
    }
    setSongs(song);
    setShowList(true);
  };

  return (
    <>
      <h2>Add a New Song</h2>
      <form onSubmit={handleSubmit} role='form'>
        <div className="ml-form-row">
          <label className="ml-label" htmlFor='song-title-input'>Title:</label>
          <input id='song-title-input' type="text" name="title" onChange={handleChange} className="ml-input" />
        </div>

        <div className="ml-form-row">
          <label className="ml-label" htmlFor='song-arist-input'>Artist:</label>
          <input id='song-arist-input' type="text" name="artist" onChange={handleChange} className="ml-input" />
        </div>

        <div className="ml-form-row">
          <label className="ml-label" htmlFor='song-album-input'>Album:</label>
          <input id='song-album-input' type="text" name="album" onChange={handleChange} className="ml-input" />
        </div>
        <div className='ml-form-buttons'>
          <button className="ml-button" type='button' onClick={() => setShowList(true)}>
            Cancel
          </button>
          <button className="ml-button" type='submit'>
            Save Song
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSong;
