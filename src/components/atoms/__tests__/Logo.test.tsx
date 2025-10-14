import { renderWithProviders } from '@/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Logo } from '@/components/atoms/Logo';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Logo Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render without crashing', () => {
    renderWithProviders(<Logo />, { withRouter: false });
    expect(screen.getAllByText('Brain')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Buster')[0]).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    const { container } = renderWithProviders(<Logo />, { withRouter: false });
    const logoElement = container.querySelector('div');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('cursor-pointer');
  });

  it('should navigate to home when clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Logo />, { withRouter: false });
    
    const logoElement = container.querySelector('.cursor-pointer');
    await user.click(logoElement!);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

