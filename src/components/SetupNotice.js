import { isAppwriteConfigured } from '../lib/appwrite';

function SetupNotice() {
  if (isAppwriteConfigured) return null;

  return (
    <p className="notice">
      Accounts aren’t connected yet. Copy <code>.env.example</code> to <code>.env.local</code>, add your
      Appwrite project details and restart the dev server.
    </p>
  );
}

export default SetupNotice;
