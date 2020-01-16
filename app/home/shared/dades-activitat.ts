export class DadesActivitat {
    UrlImatge: String;
    TextTitol: String;
    TextDates: String;
    Pagina: Number;
}

export class DadesDemo {
    Dades: DadesActivitat[] = [];

    constructor() {
        for (let i = 1; i < 11; i++) {
            let D = new DadesActivitat();
            let Imatge = 23392;
            D.TextDates = 'Del 02/04 al 25/05 de maig ' + i;
            D.TextTitol = 'Títol ' + i;
            D.UrlImatge = 'https://casadecultura.cat/images/activitats/A-' + (Imatge + i) + '-L.jpg';
            D.Pagina = Math.ceil(i / 3);
            this.Dades.push(D);
        }
    }
}