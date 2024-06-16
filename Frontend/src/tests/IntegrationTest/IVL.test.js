import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import NASAImageSearch from '../../components/IVL';

// Mocking the fetch function globally
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                collection: {
                    items: [
                        {
                            links: [{ href: 'https://example.com/image.jpg' }],
                            data: [{ title: 'Test Image', date_created: '2024-04-28', description: 'A test image' }]
                        }
                    ]
                }
            })
    })
);

describe('NASAImageSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mock call history before each test
    });

    it('renders without errors', async () => {
        render(<NASAImageSearch />);
    });

    it('displays loading state initially', async () => {
        render(<NASAImageSearch />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays image and associated information after successful API call', async () => {
        // Mock a successful API response
        const mockData = {
            collection: {
                items: [
                    {
                        links: [{ href: 'https://example.com/image.jpg' }],
                        data: [{ title: 'Test Image', date_created: '2024-04-28', description: 'A test image' }]
                    }
                ]
            }
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        });

        render(<NASAImageSearch />);

        // Wait for image and associated information to be rendered
        await waitFor(() => {
            const imageElement = screen.getByAltText('Test Image');
            const titleElement = screen.getByText('Test Image');
            const dateElement = screen.getByText('Date: 2024-04-28');
            const descriptionElement = screen.getByText('A test image');
            const buttonElement = screen.getByRole('button', { name: 'Show Another Random Image' });

            // Assert all elements are present in a single expectation
            expect(imageElement && titleElement && dateElement && descriptionElement && buttonElement).toBeInTheDocument();
        });
    });

    it('renders without error', () => {
        const { container } = render(<NASAImageSearch />);
        expect(container).toBeInTheDocument();
    });
});
