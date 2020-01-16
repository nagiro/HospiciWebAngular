export class NoticiaHome {
    Titol: string = "";
    Text: string = "";
    Imatge: string = "";
    Adjunt: string = "";

    constructor(NH?: NoticiaHome) {
        this.Titol = (NH) ? NH.Titol : "";
        this.Text = (NH) ? NH.Text : "";
        this.Imatge = (NH) ? NH.Imatge : "";
        this.Adjunt = (NH) ? NH.Adjunt : "";
    }
}

export class NoticiesHomeArray {
    NH: NoticiaHome[] = [];

    constructor(NH?: NoticiaHome[]) {
        this.NH = NH.map((X: NoticiaHome) => {
            let AH = new NoticiaHome(X);
            return AH;
        });
    }

    getArray(): NoticiaHome[] {
        return this.NH;
    }
}
