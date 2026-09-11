import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ID } from 'appwrite';
import { account, isAppwriteConfigured } from '../lib/appwrite';

const NOT_CONFIGURED_MESSAGE =
  'Accounts are not set up yet. Add your Appwrite project details to .env.local and restart the app.';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(isAppwriteConfigured);

  useEffect(() => {
    if (!isAppwriteConfigured) return undefined;

    let cancelled = false;
    account
      .get()
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser);
      })
      .catch(() => {
        // A 401 here just means nobody is logged in.
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    if (!isAppwriteConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
    await account.createEmailPasswordSession({ email, password });
    const currentUser = await account.get();
    setUser(currentUser);
    return currentUser;
  }, []);

  const signup = useCallback(
    async (name, email, password) => {
      if (!isAppwriteConfigured) throw new Error(NOT_CONFIGURED_MESSAGE);
      await account.create({ userId: ID.unique(), email, password, name });
      return login(email, password);
    },
    [login]
  );

  const logout = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: 'current' });
    } catch {
      // The session may already have expired; the user is logged out either way.
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, signup, logout }),
    [user, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
