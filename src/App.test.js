import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import AppProviders from './AppProviders';

// Keep tests offline and logged out, even when a local .env points at a real Appwrite project.
jest.mock('./lib/appwrite', () => ({
  ...jest.requireActual('./lib/appwrite'),
  isAppwriteConfigured: false,
}));

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <App />
      </AppProviders>
    </MemoryRouter>
  );
}

test('redirects / to the home page and lists the operas', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { level: 2, name: 'Operas' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'La bohème' })).toHaveAttribute('href', '/operas/la-boheme');
});

test('search matches singers and ignores accents', () => {
  renderAt('/search');
  userEvent.type(screen.getByRole('searchbox'), 'caruso');
  const songs = screen.getByRole('table', { name: 'Songs matching your search' });
  expect(within(songs).getByText('Donna non vidi mai')).toBeInTheDocument();

  userEvent.clear(screen.getByRole('searchbox'));
  userEvent.type(screen.getByRole('searchbox'), 'boheme');
  const matchingOperas = screen.getByRole('region', { name: 'Operas' });
  expect(within(matchingOperas).getByRole('link', { name: 'La bohème' })).toBeInTheDocument();
});

test('browse pages that are not built yet say coming soon', () => {
  renderAt('/podcasts');
  expect(screen.getByRole('heading', { level: 1, name: 'Podcasts' })).toBeInTheDocument();
  expect(screen.getByText('Coming soon')).toBeInTheDocument();
});

test('logged-out visitors are asked to log in to see playlists', () => {
  renderAt('/playlists');
  expect(screen.getByRole('heading', { level: 1, name: 'Your Library' })).toBeInTheDocument();
  expect(within(screen.getByRole('main')).getByRole('link', { name: 'Log in' })).toBeInTheDocument();
});

test('unknown routes show a not found page', () => {
  renderAt('/does-not-exist');
  expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
});
