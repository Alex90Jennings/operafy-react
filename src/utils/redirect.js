// Where to send the user after logging in: back to the page that asked them to log in.
export function redirectPathFrom(location) {
  const from = location.state?.from;
  return from?.pathname ? `${from.pathname}${from.search ?? ''}` : '/home';
}
