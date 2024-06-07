import JaratKezelo from '../src/JaratKezelo.mjs';

describe('JaratKezelo', () => {
    let jaratKezelo;

    beforeEach(() => {
        jaratKezelo = new JaratKezelo();
    });

    test('ujJarat - hibás járatszám - Error', () => {
        jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z');
        expect(() => jaratKezelo.ujJarat('ABC123', 'BUD', 'JFK', '2023-01-01T10:00:00Z')).toThrow(Error);
    });

});
