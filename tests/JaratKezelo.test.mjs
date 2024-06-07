import JaratKezelo from '../src/JaratKezelo.mjs';

describe('JaratKezelo', () => {
    let jaratKezelo;

    beforeEach(() => {
        jaratKezelo = new JaratKezelo();
    });

    test('ujJarat - hibas jaratszam - error', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        expect(() => jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z')).toThrow(Error);
    });

    test('keses - hibas parameter - error', () => {
        expect(() => jaratKezelo.keses('XYZ999', 30)).toThrow(Error);
    });

    test('keses - negativ szumma keres - NegativKesesException', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        expect(() => jaratKezelo.keses('ABC123', -30)).toThrow('NegativKesesException');
    });

    test('keses - hozzaadott keses helyesen mukodik', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        jaratKezelo.keses('ABC123', 15);
        jaratKezelo.keses('ABC123', 10);
        const jarat = jaratKezelo.jaratok.find(j => j.jaratszam === 'ABC123');
        expect(jarat.keses).toBe(25);
    });

    test('mikorIndul - hibas jaratszam - error', () => {
        expect(() => jaratKezelo.mikorIndul('XYZ999')).toThrow(Error);
    });

    test('mikorIndul - helyes mukodes', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        jaratKezelo.keses('ABC123', 15);
        const indulas = jaratKezelo.mikorIndul('ABC123');
        expect(indulas).toEqual(new Date('2023-01-01T10:15:00Z'));
    });

    test('jaratokRepuloterrol - helyes mukodes', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        jaratKezelo.ujJarat('DEF456', 'BUD', 'LAX', '2023-01-02T11:00:00Z');
        expect(jaratKezelo.jaratokRepuloterrol('BUD')).toEqual(['ABC123', 'DEF456']);
    });

    test('jaratokRepuloterrol - nincs jarat a repuloterrol', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        expect(jaratKezelo.jaratokRepuloterrol('JFK')).toEqual([]);
    });

    test('ujJarat - sikeres hozzaadas', () => {
        jaratKezelo.ujJarat('GHI789', 'LHR', 'DXB', '2023-01-03T12:00:00Z');
        const jarat = jaratKezelo.jaratok.find(j => j.jaratszam === 'GHI789');
        expect(jarat).toEqual({
            jaratszam: 'GHI789',
            honnan: 'LHR',
            hova: 'DXB',
            indulas: new Date('2023-01-03T12:00:00Z'),
            keses: 0
        });
    });

});
