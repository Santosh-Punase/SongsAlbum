import { useState } from "react";

import { Song } from "../type/Music";
import MusicList from "./MusicList/MusicList";
import AddSong from "./AddSong/AddSong";

const songsList = [
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

export default function MusicLibrary() {
  const [songs, setSongs] = useState<Song[]>(songsList);
  const [showList, setShowList] = useState<boolean>(true);

  return (
    <div className="ml-container">
      { showList
      ? <MusicList songs={songs} setShowList={setShowList} />
      : <AddSong setSongs={song => setSongs([...songs, { id: songs.length + 1, ...song }])} setShowList={setShowList} />
      }
    </div>
  );
}
