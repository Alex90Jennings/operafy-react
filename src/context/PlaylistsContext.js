import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ID, Permission, Query, Role } from 'appwrite';
import { appwriteConfig, tablesDB } from '../lib/appwrite';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const PlaylistsContext = createContext(null);

const playlistsTable = {
  databaseId: appwriteConfig.databaseId,
  tableId: appwriteConfig.playlistsTableId,
};

function toPlaylist(row) {
  return {
    id: row.$id,
    name: row.name,
    trackIds: row.trackIds ?? [],
  };
}

export function PlaylistsProvider({ children }) {
  const { user } = useAuth();
  const notify = useToast();
  const userId = user?.$id ?? null;
  const [playlists, setPlaylists] = useState([]);
  const [loadedForUserId, setLoadedForUserId] = useState(null);

  useEffect(() => {
    if (!userId) {
      setPlaylists([]);
      setLoadedForUserId(null);
      return undefined;
    }

    let cancelled = false;
    tablesDB
      .listRows({
        ...playlistsTable,
        queries: [Query.equal('userId', userId), Query.orderAsc('$createdAt'), Query.limit(100)],
      })
      .then(({ rows }) => {
        if (!cancelled) setPlaylists(rows.map(toPlaylist));
      })
      .catch((error) => {
        if (!cancelled) notify(`Couldn't load your playlists: ${error.message}`);
      })
      .finally(() => {
        if (!cancelled) setLoadedForUserId(userId);
      });

    return () => {
      cancelled = true;
    };
  }, [userId, notify]);

  const createPlaylist = useCallback(
    async (name) => {
      const owner = Role.user(userId);
      const row = await tablesDB.createRow({
        ...playlistsTable,
        rowId: ID.unique(),
        data: { name, userId, trackIds: [] },
        permissions: [Permission.read(owner), Permission.update(owner), Permission.delete(owner)],
      });
      const playlist = toPlaylist(row);
      setPlaylists((current) => [...current, playlist]);
      return playlist;
    },
    [userId]
  );

  const updatePlaylist = useCallback(async (playlistId, data) => {
    const row = await tablesDB.updateRow({ ...playlistsTable, rowId: playlistId, data });
    const playlist = toPlaylist(row);
    setPlaylists((current) => current.map((item) => (item.id === playlistId ? playlist : item)));
    return playlist;
  }, []);

  const deletePlaylist = useCallback(async (playlistId) => {
    await tablesDB.deleteRow({ ...playlistsTable, rowId: playlistId });
    setPlaylists((current) => current.filter((item) => item.id !== playlistId));
  }, []);

  const addTrack = useCallback(
    async (playlist, trackId) => {
      if (playlist.trackIds.includes(trackId)) {
        notify(`Already in ${playlist.name}`);
        return;
      }
      try {
        await updatePlaylist(playlist.id, { trackIds: [...playlist.trackIds, trackId] });
        notify(`Added to ${playlist.name}`);
      } catch (error) {
        notify(`Couldn't add to ${playlist.name}: ${error.message}`);
      }
    },
    [notify, updatePlaylist]
  );

  const removeTrack = useCallback(
    async (playlist, trackId) => {
      try {
        await updatePlaylist(playlist.id, {
          trackIds: playlist.trackIds.filter((id) => id !== trackId),
        });
        notify(`Removed from ${playlist.name}`);
      } catch (error) {
        notify(`Couldn't remove from ${playlist.name}: ${error.message}`);
      }
    },
    [notify, updatePlaylist]
  );

  const isLoading = Boolean(userId) && loadedForUserId !== userId;

  const value = useMemo(
    () => ({
      playlists,
      isLoading,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      addTrack,
      removeTrack,
    }),
    [playlists, isLoading, createPlaylist, updatePlaylist, deletePlaylist, addTrack, removeTrack]
  );

  return <PlaylistsContext.Provider value={value}>{children}</PlaylistsContext.Provider>;
}

export function usePlaylists() {
  return useContext(PlaylistsContext);
}
