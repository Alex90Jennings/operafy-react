import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import OperaGrid from '../components/OperaGrid';
import PlaylistGrid from '../components/PlaylistGrid';
import TrackTable from '../components/TrackTable';
import { useAuth } from '../context/AuthContext';
import { usePlaylists } from '../context/PlaylistsContext';
import { matchesQuery, operas, searchCatalogue } from '../data/catalogue';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pluralize } from '../utils/time';

function SearchPage() {
  useDocumentTitle('Search');
  const [searchParams, setSearchParams] = useSearchParams();
  // The input is driven by local state. React Router applies URL updates in a transition, so reading the
  // value straight from the URL lags behind fast typing and drops characters.
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const { user } = useAuth();
  const { playlists } = usePlaylists();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => searchCatalogue(query), [query]);
  const matchingPlaylists = useMemo(
    () => (user ? playlists.filter((playlist) => matchesQuery([playlist.name], query)) : []),
    [user, playlists, query]
  );

  const hasQuery = query.trim().length > 0;
  const resultCount = results.tracks.length + results.operas.length + matchingPlaylists.length;

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  return (
    <>
      <section className="search-header">
        <h1>Search</h1>
        <form role="search" className="search-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="search-input" className="visually-hidden">
            Search songs, operas, composers and singers
          </label>
          <Icon name="search" />
          <input
            ref={inputRef}
            id="search-input"
            type="search"
            className="search-input"
            placeholder="Songs, operas, composers or singers"
            value={query}
            onChange={handleChange}
            autoComplete="off"
          />
        </form>
        <p className="visually-hidden" role="status">
          {hasQuery ? `${pluralize(resultCount, 'result')} for ${query}` : ''}
        </p>
      </section>

      {!hasQuery && (
        <section aria-labelledby="browse-heading">
          <div className="section-header">
            <h2 id="browse-heading">Browse all operas</h2>
          </div>
          <OperaGrid operas={operas} />
        </section>
      )}

      {hasQuery && resultCount === 0 && (
        <section className="empty-state">
          <h2>No results for “{query}”</h2>
          <p>Check the spelling, or try a composer such as Puccini or a singer such as Caruso.</p>
        </section>
      )}

      {results.tracks.length > 0 && (
        <section aria-labelledby="songs-heading">
          <div className="section-header">
            <h2 id="songs-heading">Songs</h2>
          </div>
          <TrackTable tracks={results.tracks} caption="Songs matching your search" />
        </section>
      )}

      {results.operas.length > 0 && (
        <section aria-labelledby="operas-heading">
          <div className="section-header">
            <h2 id="operas-heading">Operas</h2>
          </div>
          <OperaGrid operas={results.operas} />
        </section>
      )}

      {matchingPlaylists.length > 0 && (
        <section aria-labelledby="playlists-heading">
          <div className="section-header">
            <h2 id="playlists-heading">Your playlists</h2>
          </div>
          <PlaylistGrid playlists={matchingPlaylists} />
        </section>
      )}
    </>
  );
}

export default SearchPage;
