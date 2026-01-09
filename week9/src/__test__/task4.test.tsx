import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyContainer from '../components/MyContainer';

describe('MyContainer', () => {
  it('should input text and display it on the page when the button is clicked', async () => {
    render(<MyContainer />);

    // Find the textbox and button
    const textbox = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    // Input text into the textbox
    fireEvent.change(textbox, { target: { value: 'Some other epic text to write' } });

    // Click the button
    fireEvent.click(button);

    // Wait for the text to be rendered and displayed on the page
    await waitFor(() => screen.getByText('Some other epic text to write'));

    // Confirm that the text is now rendered on the page
    expect(screen.getByText('Some other epic text to write')).toBeInTheDocument();
  });
});
