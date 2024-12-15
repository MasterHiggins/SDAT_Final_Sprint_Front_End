import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import FlightForm from "./FlightForm";

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("FlightForm", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockFlight = {
    flightId: "1",
    flightNumber: "FL123",
    airlineId: "1",
    aircraftId: "1",
    departureAirportId: "1",
    arrivalAirportId: "2",
    departureGateId: "1",
    arrivalGateId: "2",
    departureTime: "2024-03-20T10:00",
    arrivalTime: "2024-03-20T12:00",
    status: "Scheduled",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with all fields", () => {
    renderWithRouter(<FlightForm onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByLabelText(/airline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/aircraft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/flight number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/departure airport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/arrival airport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  test("displays aircraft capacity when aircraft is selected", () => {
    renderWithRouter(
      <FlightForm
        onClose={mockOnClose}
        onSave={mockOnSave}
        flight={mockFlight}
      />
    );

    const capacityText = screen.getByText(/aircraft capacity/i);
    expect(capacityText).toBeInTheDocument();
  });

  test("calls onClose when cancel button is clicked", () => {
    renderWithRouter(<FlightForm onClose={mockOnClose} onSave={mockOnSave} />);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onSave with form data when submitted", async () => {
    renderWithRouter(<FlightForm onClose={mockOnClose} onSave={mockOnSave} />);

    // Fill out form
    await userEvent.type(screen.getByLabelText(/flight number/i), "FL999");
    // Add more form field interactions...

    const submitButton = screen.getByText(/add flight/i);
    fireEvent.click(submitButton);

    expect(mockOnSave).toHaveBeenCalled();
  });
});
