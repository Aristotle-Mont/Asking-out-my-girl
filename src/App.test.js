import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MazeGame component', () => {
  render(<App />);
  const mazeElement = screen.getByText(/Congratulations! You solved the mazee!/i);
  expect(mazeElement).toBeInTheDocument();
});

