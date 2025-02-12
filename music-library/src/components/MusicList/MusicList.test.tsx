import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import MusicList from "./MusicList";
import { Song } from "../../type/Music";

describe("MusicList Component", () => {
  const mockSetShowList = jest.fn();
  const mockSongs: Song[] = [
    { id: 1, title: "Song A", artist: "Artist A", album: "Album A" },
    { id: 2, title: "Song B", artist: "Artist B", album: "Album B" },
    { id: 3, title: "Another Song", artist: "Another Artist", album: "Another Album" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders songs list correctly", () => {
    render(<MusicList songs={mockSongs} setShowList={mockSetShowList} />);
    
    expect(screen.getByText("Music Library")).toBeInTheDocument();
    expect(screen.getByText("Song A")).toBeInTheDocument();
    expect(screen.getByText("Artist B")).toBeInTheDocument();
  });

  it("filters songs based on search input", () => {
    render(<MusicList songs={mockSongs} setShowList={mockSetShowList} />);
    
    const searchInput = screen.getByPlaceholderText("Search by title / album / artist");
    fireEvent.change(searchInput, { target: { value: "Another" } });

    expect(screen.getByText("Another Song")).toBeInTheDocument();
    expect(screen.queryByText("Song A")).not.toBeInTheDocument();
  });

  it("sorts songs based on selected option", () => {
    render(<MusicList songs={mockSongs} setShowList={mockSetShowList} />);

    const sortDropdown = screen.getByLabelText("Sort By:");
    fireEvent.change(sortDropdown, { target: { value: "artist" } });

    const sortedSongs = screen.getAllByTestId("song-title").map(el => el.textContent);
    expect(sortedSongs).toEqual(["Another Song", "Song A", "Song B"]);
  });

  it("shows 'Add' button only for admin users", () => {
    localStorage.setItem("userRole", "admin");
    render(<MusicList songs={mockSongs} setShowList={mockSetShowList} />);

    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("does not show 'Add' button for non-admin users", () => {
    localStorage.setItem("userRole", "user");
    render(<MusicList songs={mockSongs} setShowList={mockSetShowList} />);

    expect(screen.queryByText("Add")).not.toBeInTheDocument();
  });

  it("calls setShowList(false) when 'Add' button is clicked", () => {
    localStorage.setItem("userRole", "admin");
    render(<MusicList songs={mockSongs} setShowList={mockSetShowList} />);

    fireEvent.click(screen.getByText("Add"));
    expect(mockSetShowList).toHaveBeenCalledWith(false);
  });
});
