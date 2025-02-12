import { render, screen, fireEvent } from "@testing-library/react";

import AddSong from "./AddSong";

describe("AddSong Component", () => {
  const mockSetSongs = jest.fn();
  const mockSetShowList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields and buttons", () => {
    render(<AddSong setSongs={mockSetSongs} setShowList={mockSetShowList} />);
    
    expect(screen.getByText("Add a New Song")).toBeInTheDocument();
    expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Artist:")).toBeInTheDocument();
    expect(screen.getByLabelText("Album:")).toBeInTheDocument();
    expect(screen.getByText("Save Song")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("updates state when typing in input fields", () => {
    render(<AddSong setSongs={mockSetSongs} setShowList={mockSetShowList} />);
    
    const titleInput = screen.getByLabelText("Title:");
    fireEvent.change(titleInput, { target: { value: "Test Song" } });
    expect(titleInput).toHaveValue("Test Song");
  });

  it("shows alert and prevents submission if fields are empty", () => {
    window.alert = jest.fn(); // Mock alert function
    
    render(<AddSong setSongs={mockSetSongs} setShowList={mockSetShowList} />);
    
    fireEvent.click(screen.getByText("Save Song"));
    expect(window.alert).toHaveBeenCalledWith("Enter Song details");
    expect(mockSetSongs).not.toHaveBeenCalled();
  });

  it("calls setSongs and setShowList on valid form submission", () => {
    render(<AddSong setSongs={mockSetSongs} setShowList={mockSetShowList} />);
    
    fireEvent.change(screen.getByLabelText("Title:"), { target: { value: "New Song" } });
    fireEvent.change(screen.getByLabelText("Artist:"), { target: { value: "New Artist" } });
    fireEvent.change(screen.getByLabelText("Album:"), { target: { value: "New Album" } });

    fireEvent.submit(screen.getByRole("form"));

    expect(mockSetSongs).toHaveBeenCalledWith({ title: "New Song", artist: "New Artist", album: "New Album" });
    expect(mockSetShowList).toHaveBeenCalledWith(true);
  });

  it("calls setShowList when cancel button is clicked", () => {
    render(<AddSong setSongs={mockSetSongs} setShowList={mockSetShowList} />);
    
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockSetShowList).toHaveBeenCalledWith(true);
  });
});
