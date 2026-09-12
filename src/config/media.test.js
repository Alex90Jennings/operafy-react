import { MEDIA_BASE, mediaUrl } from './media';

describe('mediaUrl', () => {
    test('puts a relative catalogue path on the CDN', () => {
        expect(mediaUrl('audio/celeste-aida.mp3')).toBe(`${MEDIA_BASE}/audio/celeste-aida.mp3`);
    });

    test('tolerates a leading slash without doubling it', () => {
        expect(mediaUrl('/covers/aida.jpg')).toBe(`${MEDIA_BASE}/covers/aida.jpg`);
        expect(mediaUrl('/covers/aida.jpg')).not.toContain('//covers');
    });

    test('leaves an absolute URL alone, so a one-off external file still works', () => {
        const wikimedia = 'https://upload.wikimedia.org/wikipedia/commons/a/a8/track.mp3';
        expect(mediaUrl(wikimedia)).toBe(wikimedia);
        expect(mediaUrl('http://example.com/x.mp3')).toBe('http://example.com/x.mp3');
    });

    test('passes empty values straight through rather than building a broken URL', () => {
        expect(mediaUrl('')).toBe('');
        expect(mediaUrl(undefined)).toBeUndefined();
        expect(mediaUrl(null)).toBeNull();
    });

    test('the base never ends in a slash, whatever it is configured with', () => {
        expect(MEDIA_BASE).not.toMatch(/\/$/);
    });

    test('the base is https, because the page is', () => {
        expect(MEDIA_BASE).toMatch(/^https:\/\//);
    });
});
