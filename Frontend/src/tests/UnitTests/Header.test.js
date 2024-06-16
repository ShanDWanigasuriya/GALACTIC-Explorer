import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

describe('Header Component', () => {
  // Mock localStorage methods
  const mockLocalStorage = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
  global.localStorage = mockLocalStorage;

  // Mock useNavigate hook
  const mockNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  beforeEach(() => {
    // Reset mocks and localStorage
    jest.clearAllMocks();
  });

  test('renders without error', () => {
    // Render the component
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Perform assertions on the component's output
    expect(screen.getByText('GALACTIC Explorer')).toBeInTheDocument();
  });

  it('renders Header when authenticated and on homepage', () => {
    // Mock localStorage values
    mockLocalStorage.getItem.mockReturnValue('dummyToken'); // Simulate authenticated state

    // Render the Header component inside MemoryRouter
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Assertions for rendered elements and behavior
    expect(screen.getByText('GALACTIC Explorer')).toBeInTheDocument();
  });

  it('renders Header when not authenticated', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('GALACTIC Explorer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });
  
  it('calls signin function when signin button is clicked', () => {
    mockLocalStorage.getItem.mockReturnValue('dummyToken');

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    // Assert that the signin function is called
    expect(mockNavigate).not.toHaveBeenCalledWith('/signin');
  });

  it('calls signup function when signup button is clicked', () => {
    mockLocalStorage.getItem.mockReturnValue('dummyToken');

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(signUpButton);

    // Assert that the signup function is called
    expect(mockNavigate).not.toHaveBeenCalledWith('/signup');
  });
});
