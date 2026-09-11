import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { PlaylistsProvider } from './context/PlaylistsContext';
import { ToastProvider } from './context/ToastContext';

function AppProviders({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlaylistsProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </PlaylistsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default AppProviders;
