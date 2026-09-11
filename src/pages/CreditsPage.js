import { Link } from 'react-router-dom';
import { getOpera, operas, tracks } from '../data/catalogue';
import useDocumentTitle from '../hooks/useDocumentTitle';

function SourceLink({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      Wikimedia Commons
      <span className="visually-hidden"> page for {label} (opens in a new tab)</span>
    </a>
  );
}

function CreditsPage() {
  useDocumentTitle('Credits');
  const operasWithCovers = operas.filter((opera) => opera.cover);

  return (
    <>
      <section className="section-header">
        <h1>Credits</h1>
        <p className="prose">
          Every recording and every piece of cover artwork on Operafy is in the public domain and comes from{' '}
          <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>
          . Most recordings are digitised 78 rpm discs from the Swiss Public Domain Project; the covers are
          historic posters, scores, illustrations and stage designs.
        </p>
      </section>

      <section aria-labelledby="recordings-heading">
        <div className="section-header">
          <h2 id="recordings-heading">Recordings</h2>
        </div>
        <div className="table-scroll">
          <table className="credits-table">
            <caption className="visually-hidden">Sources and licences for every recording</caption>
            <thead>
              <tr>
                <th scope="col">Recording</th>
                <th scope="col">Performer</th>
                <th scope="col">Year</th>
                <th scope="col">Licence</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => {
                const opera = getOpera(track.operaId);
                return (
                  <tr key={track.id}>
                    <td>
                      <span className="track-title">{track.title}</span>
                      <Link className="credits-opera" to={`/operas/${opera.id}`}>
                        {opera.title}
                      </Link>
                    </td>
                    <td>{track.performer}</td>
                    <td>{track.year ?? 'Unknown'}</td>
                    <td>{track.license}</td>
                    <td>
                      <SourceLink href={track.sourceUrl} label={track.title} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="artwork-heading">
        <div className="section-header">
          <h2 id="artwork-heading">Cover artwork</h2>
        </div>
        <div className="table-scroll">
          <table className="credits-table">
            <caption className="visually-hidden">Sources and licences for the cover artwork</caption>
            <thead>
              <tr>
                <th scope="col">Opera</th>
                <th scope="col">Artwork</th>
                <th scope="col">Licence</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {operasWithCovers.map((opera) => (
                <tr key={opera.id}>
                  <td>
                    <Link to={`/operas/${opera.id}`}>{opera.title}</Link>
                  </td>
                  <td>
                    <span className="credits-artwork">{opera.cover.title}</span>
                    {opera.cover.artist && <span className="credits-opera">{opera.cover.artist}</span>}
                  </td>
                  <td>{opera.cover.license}</td>
                  <td>
                    <SourceLink href={opera.cover.sourceUrl} label={`the ${opera.title} artwork`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default CreditsPage;
