export default class JaratKezelo {
    constructor() {
        this.jaratok = [];
    }

    ujJarat(jaratszam, honnan, hova, indulas) {
        if (this.jaratok.some(jarat => jarat.jaratszam === jaratszam)) {
            throw new Error("A jaratszamnak egyedinek kell lennie!");
        }
        this.jaratok.push({
            jaratszam,
            honnan,
            hova,
            indulas: new Date(indulas),
            keses: 0
        });
    }

    keses(jaratszam, keses) {
        const jarat = this.jaratok.find(j => j.jaratszam === jaratszam);
        if (!jarat) {
            throw new Error("nem letezo jarat!");
        }
        if (jarat.keses + keses < 0) {
            throw new Error("NegativKesesException");
        }
        jarat.keses += keses;
    }

    mikorIndul(jaratszam) {
        const jarat = this.jaratok.find(j => j.jaratszam === jaratszam);
        if (!jarat) {
            throw new Error("nem letezo jarat!");
        }
        const indulas = new Date(jarat.indulas);
        indulas.setMinutes(indulas.getMinutes() + jarat.keses);
        return indulas;
    }

    jaratokRepuloterrol(repter) {
        return this.jaratok
            .filter(jarat => jarat.honnan === repter)
            .map(jarat => jarat.jaratszam);
    }
}

