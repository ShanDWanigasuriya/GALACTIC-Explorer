import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InSightWeather from '../../components/MarsWeatherPhoto';

// Mock the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                sol_keys: ['987'],
                987: {
                    First_UTC: '2024-04-28T01:23:45Z',
                    PRE: { avg: 720 },
                    HWS: { avg: 5.67 },
                    AT: { av: -56.78 }
                }
            })
    })
);

describe('InSightWeather Component', () => {
    test('renders without error', () => {
        // Render the component
        const { container } = render(
            <MemoryRouter>
                <InSightWeather />
            </MemoryRouter>
        );

        // Perform assertions on the component's output
        expect(container).toBeInTheDocument();
    });

    it('renders loading state initially', async () => {
        render(<InSightWeather />);

        // Ensure "Loading..." text is displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for the API request to complete
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});
