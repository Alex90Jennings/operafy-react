import { useParams } from 'react-router-dom';
import Cover from '../components/Cover';
import OperaGrid from '../components/OperaGrid';
import PlayCollectionButton from '../components/PlayCollectionButton';
import TrackTable from '../components/TrackTable';
import { getOpera, getTracksForOpera, operas } from '../data/catalogue';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatTotalDuration, pluralize } from '../utils/time';
import NotFoundPage from './NotFoundPage';

function OperaPage() {
  const { operaId } = useParams();
  const opera = getOpera(operaId);
  useDocumentTitle(opera?.title);

  if (!opera) return <NotFoundPage />;

  const operaTracks = getTracksForOpera(opera.id);
  const totalSeconds = operaTracks.reduce((sum, track) => sum + track.duration, 0);
  const moreByComposer = operas.filter((item) => item.composer === opera.composer && item.id !== opera.id);

  return (
    <>
      <header className="collection-header">
        <Cover
          title={opera.title}
          subtitle={opera.composer}
          colors={opera.colors}
          image={opera.cover?.src}
          size="lg"
        />
        <div className="collection-meta">
          <p className="eyebrow">Opera</p>
          <h1>{opera.title}</h1>
          <p className="collection-details">
            {opera.composer} · {opera.year} · {pluralize(operaTracks.length, 'recording')},{' '}
            {formatTotalDuration(totalSeconds)}
          </p>
        </div>
      </header>

      <div className="collection-actions">
        <PlayCollectionButton trackIds={operaTracks.map((track) => track.id)} label={opera.title} />
      </div>

      <TrackTable tracks={operaTracks} caption={`Recordings from ${opera.title}`} showOpera={false} />

      {moreByComposer.length > 0 && (
        <section aria-labelledby="more-heading">
          <div className="section-header">
            <h2 id="more-heading">More by {opera.composer}</h2>
          </div>
          <OperaGrid operas={moreByComposer} />
        </section>
      )}
    </>
  );
}

export default OperaPage;
