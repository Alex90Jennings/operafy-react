// Audio and artwork are served from CloudFront in front of a private S3 bucket.
// The infrastructure lives at github.com/Alex90Jennings/operafy-infra.
//
// Recordings used to be hotlinked straight from Wikimedia Commons, which meant
// the player broke whenever a file was re-encoded or moved, on someone else's
// bandwidth. The files are now hosted here; every one is still credited to its
// source on the credits page.
const DEFAULT_BASE = 'https://d259kop0e4qfem.cloudfront.net';

export const MEDIA_BASE = (process.env.REACT_APP_MEDIA_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');

// Catalogue paths are relative, so the distribution can change without
// touching the data files. An absolute URL is passed through untouched.
export function mediaUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${MEDIA_BASE}/${path.replace(/^\/+/, '')}`;
}
