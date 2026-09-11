import { Account, Client, TablesDB } from 'appwrite';

export const appwriteConfig = {
  endpoint: process.env.REACT_APP_APPWRITE_ENDPOINT,
  projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID,
  databaseId: process.env.REACT_APP_APPWRITE_DATABASE_ID || 'operafy',
  playlistsTableId: process.env.REACT_APP_APPWRITE_PLAYLISTS_TABLE_ID || 'playlists',
};

export const isAppwriteConfigured = Boolean(appwriteConfig.endpoint && appwriteConfig.projectId);

const client = new Client();

if (isAppwriteConfigured) {
  client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);
}

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
