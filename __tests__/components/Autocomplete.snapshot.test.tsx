import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Autocomplete } from '@/components/shared/Autocomplete';
import { mockAddresses, defaultProps } from '@/__tests__/constants';

describe('Autocomplete Component Snapshots', () => {
  it('should match snapshot - empty state', () => {
    const { container } = render(<Autocomplete {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot - loading state', () => {
    const { container } = render(
      <Autocomplete {...defaultProps} searchTerm='Oslo' isLoading={true} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot - dropdown with items', () => {
    const { container } = render(
      <Autocomplete
        {...defaultProps}
        searchTerm='Oslo'
        showDropdown={true}
        items={mockAddresses}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
