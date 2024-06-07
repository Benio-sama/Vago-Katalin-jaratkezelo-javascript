class JaratKezelo {
    constructor() {
        this.jaratok = [];
    }

    ujJarat(jaratszam, honnan, hova, indulas) {
        if (this.jaratok.some(jarat => jarat.jaratSzam === jaratSzam)) {
            throw new Error("A járatszámnak egyedinek kell lennie!");
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
            throw new Error("Nem létező járat!");
        }
        if (jarat.keses < 0) {
            throw new Error("NegativKesesException");
        }
        jarat.keses += keses;
    }

    mikorIndul(jaratszam) {
        if (!this.jaratok.has(jaratszam)) {
            throw new Error("Nem létező járat!");
        }
        const jarat = this.jaratok.get(jaratszam);
        const indulas = new Date(jarat.indulas);
        indulas.setMinutes(indulas.getMinutes() + jarat.keses);
        return indulas;
    }

    jaratokRepuloterrol(repter) {
        const result = [];
        for (const [jaratszam, jarat] of this.jaratok) {
            if (jarat.honnan === repter) {
                result.push(jaratszam);
            }
        }
        return result;
    }
}

export default JaratKezelo;