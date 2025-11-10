import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Autocomplete } from '@/components/shared/autocomplete/Autocomplete';
import { mockAddresses, defaultProps } from '@/__tests__/constants';

describe('Autocomplete Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render input field with correct attributes', () => {
    render(<Autocomplete {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search address');
    expect(input).toHaveValue('');
  });

  it('should display search term and show clear button', () => {
    render(<Autocomplete {...defaultProps} searchTerm='Oslo' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Oslo');

    const clearButton = screen.getByLabelText('Clear text');
    expect(clearButton).toBeInTheDocument();
  });

  it('should show loading spinner when loading', () => {
    render(
      <Autocomplete {...defaultProps} searchTerm='Oslo' isLoading={true} />
    );

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('should call handleInputChange on user input', async () => {
    const user = userEvent.setup();
    const mockHandleInputChange = vi.fn();

    render(
      <Autocomplete
        {...defaultProps}
        handleInputChange={mockHandleInputChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'Oslo');

    expect(mockHandleInputChange).toHaveBeenCalledTimes(4);
  });

  it('should show dropdown with items when showDropdown is true', () => {
    render(
      <Autocomplete
        {...defaultProps}
        showDropdown={true}
        items={mockAddresses}
      />
    );

    expect(
      screen.getByText('Rodeløkka Postboks 6500-6599')
    ).toBeInTheDocument();
    expect(screen.getByText('OSLO')).toBeInTheDocument();
  });

  it('should call handleItemSelect when item is clicked', async () => {
    const user = userEvent.setup();
    const mockHandleItemSelect = vi.fn();

    render(
      <Autocomplete
        {...defaultProps}
        showDropdown={true}
        items={mockAddresses}
        handleItemSelect={mockHandleItemSelect}
      />
    );

    const firstItem = screen.getByText('Rodeløkka Postboks 6500-6599');
    await user.click(firstItem);

    expect(mockHandleItemSelect).toHaveBeenCalledWith(mockAddresses[0]);
  });

  it('should close dropdown when clicking outside', async () => {
    const mockSetShowDropdown = vi.fn();

    render(
      <div>
        <Autocomplete
          {...defaultProps}
          showDropdown={true}
          setShowDropdown={mockSetShowDropdown}
          items={mockAddresses}
        />
        <div data-testid='outside-element'>Outside</div>
      </div>
    );

    const outsideElement = screen.getByTestId('outside-element');
    fireEvent.mouseDown(outsideElement);

    await waitFor(() => {
      expect(mockSetShowDropdown).toHaveBeenCalledWith(false);
    });
  });

  it('should handle Escape key to close dropdown', () => {
    const mockSetShowDropdown = vi.fn();

    render(
      <Autocomplete
        {...defaultProps}
        setShowDropdown={mockSetShowDropdown}
        showDropdown={true}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(mockSetShowDropdown).toHaveBeenCalledWith(false);
  });
});
