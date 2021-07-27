import { render, screen } from '@testing-library/react';

test('three d website appears', () => {
  render(<div>Three D!!!</div>)
  const linkElement = screen.getByText(/Three D!!!/i);
  expect(linkElement).toBeInTheDocument();
});
