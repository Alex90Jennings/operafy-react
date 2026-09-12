import coverData from './covers.json';
import operaData from './operas';
import trackData from './tracks.json';
import { mediaUrl } from '../config/media';

const COVER_PALETTE = [
  ['#5b1a3a', '#c2415d'],
  ['#1f3b5c', '#4f8fc0'],
  ['#3b2a5c', '#8e6bd6'],
  ['#1d4d3f', '#3fa37f'],
  ['#5c3b12', '#d08a2e'],
  ['#23324d', '#6f7fd1'],
  ['#4a3b1f', '#b59a4a'],
  ['#1e4450', '#3c9aa8'],
  ['#50263f', '#b0558a'],
  ['#48202a', '#a8434f'],
];

function resolveCover(cover) {
  return cover ? { ...cover, src: mediaUrl(cover.src) } : null;
}

export const operas = [...operaData]
  .sort((a, b) => a.year - b.year)
  .map((opera, index) => ({
    ...opera,
    colors: COVER_PALETTE[index % COVER_PALETTE.length],
    cover: resolveCover(coverData[opera.id]),
  }));

export const tracks = trackData.map((track) => ({ ...track, src: mediaUrl(track.src) }));
export const allTrackIds = tracks.map((track) => track.id);

const operasById = new Map(operas.map((opera) => [opera.id, opera]));
const tracksById = new Map(tracks.map((track) => [track.id, track]));

export function getOpera(operaId) {
  return operasById.get(operaId);
}

export function getTrack(trackId) {
  return tracksById.get(trackId);
}

export function getTracksForOpera(operaId) {
  return tracks.filter((track) => track.operaId === operaId);
}

export function colorsFor(seed) {
  let hash = 0;
  for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return COVER_PALETTE[hash % COVER_PALETTE.length];
}

// Lower-case and strip accents so "boheme" finds "La bohème".
function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function matchesQuery(fields, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return false;
  const haystack = normalize(fields.filter(Boolean).join(' '));
  return terms.every((term) => haystack.includes(term));
}

export function searchCatalogue(query) {
  return {
    tracks: tracks.filter((track) => {
      const opera = getOpera(track.operaId);
      return matchesQuery(
        [track.title, track.performer, String(track.year ?? ''), opera.title, opera.composer],
        query
      );
    }),
    operas: operas.filter((opera) => matchesQuery([opera.title, opera.composer, String(opera.year)], query)),
  };
}
