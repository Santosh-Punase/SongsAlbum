import { render, fireEvent, screen } from "@testing-library/react";

// Mock child components
jest.mock("./MusicList/MusicList", () => ({
  __esModule: true,
  default: ({ setShowList }: { setShowList: (val: boolean) => void }) => (
    <div data-testid="music-list">
      <button onClick={() => setShowList(false)}>Add Song</button>
    </div>
  ),
}));

jest.mock("./AddSong/AddSong", () => ({
  __esModule: true,
  default: ({ setSongs, setShowList }: { setSongs: (song: any) => void; setShowList: (val: boolean) => void }) => (
    <div data-testid="add-song">
      <button onClick={() => {
        setSongs({ title: "New Song", artist: "Test Artist", album: "Test Album" });
        setShowList(true);
      }}>Submit</button>
    </div>
  ),
}));

import MusicLibrary from "./MusicLibrary";

describe("MusicLibrary Component", () => {
  it("renders MusicList initially", () => {
    render(<MusicLibrary />);
    expect(screen.getByTestId("music-list")).toBeInTheDocument();
  });

  it("switches to AddSong component when Add Song button is clicked", () => {
    render(<MusicLibrary />);
    
    fireEvent.click(screen.getByText("Add Song"));

    expect(screen.getByTestId("add-song")).toBeInTheDocument();
  });

  it("adds a song and switches back to MusicList", () => {
    render(<MusicLibrary />);

    // Navigate to AddSong
    fireEvent.click(screen.getByText("Add Song"));
    expect(screen.getByTestId("add-song")).toBeInTheDocument();

    // Submit a new song
    fireEvent.click(screen.getByText("Submit"));

    // Verify it navigated back
    expect(screen.getByTestId("music-list")).toBeInTheDocument();
  });
});
