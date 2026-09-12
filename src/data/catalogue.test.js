import { allTrackIds, colorsFor, getOpera, getTrack, getTracksForOpera, matchesQuery, operas, searchCatalogue, tracks } from './catalogue';
import { MEDIA_BASE } from '../config/media';

describe('the catalogue', () => {
    test('every track belongs to an opera that exists', () => {
        for (const track of tracks) {
            expect(getOpera(track.operaId)).toBeDefined();
        }
    });

    test('track ids are unique, so the player cannot address two at once', () => {
        expect(new Set(allTrackIds).size).toBe(allTrackIds.length);
    });

    test('operas are listed oldest first', () => {
        const years = operas.map(o => o.year);
        expect(years).toEqual([...years].sort((a, b) => a - b));
    });

    test('every track resolves to the CDN, none left hotlinked', () => {
        for (const track of tracks) {
            expect(track.src.startsWith(MEDIA_BASE)).toBe(true);
            expect(track.src).not.toContain('wikimedia.org');
        }
    });

    test('every cover resolves to the CDN too', () => {
        for (const opera of operas.filter(o => o.cover)) {
            expect(opera.cover.src.startsWith(MEDIA_BASE)).toBe(true);
        }
    });

    test('attribution survives the CDN move', () => {
        for (const track of tracks) {
            expect(track.sourceUrl).toContain('wikimedia.org');
            expect(track.license).toBeTruthy();
        }
    });

    test('getTracksForOpera returns only that opera', () => {
        const boheme = getTracksForOpera('la-boheme');
        expect(boheme.length).toBeGreaterThan(0);
        expect(boheme.every(t => t.operaId === 'la-boheme')).toBe(true);
    });

    test('getTrack finds by id and misses cleanly', () => {
        expect(getTrack(allTrackIds[0]).id).toBe(allTrackIds[0]);
        expect(getTrack('no-such-track')).toBeUndefined();
    });
});

describe('search', () => {
    test('ignores accents, so boheme finds La bohème', () => {
        expect(matchesQuery(['La bohème'], 'boheme')).toBe(true);
        expect(matchesQuery(['La bohème'], 'bohème')).toBe(true);
    });

    test('ignores case', () => {
        expect(matchesQuery(['Enrico Caruso'], 'CARUSO')).toBe(true);
    });

    test('every term must match, not just one', () => {
        expect(matchesQuery(['Puccini La bohème'], 'puccini boheme')).toBe(true);
        expect(matchesQuery(['Puccini La bohème'], 'puccini carmen')).toBe(false);
    });

    test('an empty query matches nothing rather than everything', () => {
        expect(matchesQuery(['anything'], '')).toBe(false);
        expect(matchesQuery(['anything'], '   ')).toBe(false);
    });

    test('skips empty fields without crashing', () => {
        expect(matchesQuery([null, undefined, 'Caruso'], 'caruso')).toBe(true);
    });

    test('finds singers, composers and operas from one query', () => {
        expect(searchCatalogue('caruso').tracks.length).toBeGreaterThan(0);
        expect(searchCatalogue('puccini').operas.length).toBeGreaterThan(0);
    });

    test('a query that matches nothing returns empty lists, not undefined', () => {
        const result = searchCatalogue('zzzzzzz');
        expect(result.tracks).toEqual([]);
        expect(result.operas).toEqual([]);
    });
});

describe('colorsFor', () => {
    test('is stable for the same seed', () => {
        expect(colorsFor('la-boheme')).toEqual(colorsFor('la-boheme'));
    });

    test('always returns a usable pair of hex colours', () => {
        for (const seed of ['a', 'la-boheme', 'carmen', 'x'.repeat(50)]) {
            const pair = colorsFor(seed);
            expect(pair).toHaveLength(2);
            pair.forEach(c => expect(c).toMatch(/^#[0-9a-f]{6}$/i));
        }
    });
});
