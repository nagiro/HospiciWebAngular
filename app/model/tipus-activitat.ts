export class TipusActivitat {
    idTipus: number = 0;
    tipusNom: string = 'Totes les categories';
    tipusDesc: string = 'Totes les categories';
    site_id: number = 1;
    actiu: boolean = true;

    constructor() { }

    fromAjax(OA: TipusActivitat) {
        return Object.assign(this, OA);
    }
}

export class TipusActivitatArray {
    Tipus: TipusActivitat[] = [];

    constructor() { }

    fromAjax(OA: TipusActivitatArray) {
        this.Tipus = [];
        OA.Tipus.forEach((X) => {
            this.Tipus.push(new TipusActivitat().fromAjax(X));
        });
        this.Tipus.push(new TipusActivitat());
        return this;
    }

    getKey(id: number): TipusActivitat {
        return this.Tipus.find(X => X.idTipus == id);
    }
}