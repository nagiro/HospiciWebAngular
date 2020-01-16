import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from 'querystring';

export class HorariSQL {
    HorarisID: number;
    Activitats_ActivitatID: number;
    Dia: string;
    HoraInici: string;
    HoraFi: string;
    HoraPre: string;
    HoraPost: string;
    Avis: string;
    Espectadors: number;
    Places: number;
    Titol: string;
    Preu: number;
    PreuR: number;
    Estat: number;
    Responsable: string;
    site_id: number;
    actiu: boolean;
    isEntrada: boolean;
}

class Element {
    k: string;
    v: Element[];
}

export class HorariDetallDates {

    Llistat: HorariDetall[] = [];
    LlistatText: string = "";

    Busca(T: Element[], Clau: string) {
        let I = T.findIndex(X => { return X.k == Clau });
        if (I < 0) T.push({ k: Clau, v: [] });
        I = (I > 0) ? I : (T.length - 1);
        return { T, I };
    }

    constructor(HA: HorariDetall[] = []) {
        let Espais: Element[] = [];

        for (let H of HA) {

            let Horari = new HorariDetall(H.DIA, H.HORA, H.ESPAI);

            let T = this.Busca(Espais, Horari.ESPAI);
            Espais = T.T;

            let T2 = this.Busca(Espais[T.I].v, Horari.HORA);
            Espais[T.I].v = T2.T;

            let T3 = this.Busca(Espais[T.I].v[T2.I].v, Horari.ANY_NUMERO);
            Espais[T.I].v[T2.I].v = T3.T;

            let T4 = this.Busca(Espais[T.I].v[T2.I].v[T3.I].v, Horari.MES_NUMERO);
            Espais[T.I].v[T2.I].v[T3.I].v = T4.T;

            let T5 = this.Busca(Espais[T.I].v[T2.I].v[T3.I].v[T4.I].v, Horari.DIA_NUMERO);
            Espais[T.I].v[T2.I].v[T3.I].v[T4.I].v = T5.T;

        }

        console.log(Espais);

        for (let E of Espais) {
            this.LlistatText += '<br />' + E.k + ' <br /> ';
            for (let H of E.v) {
                for (let A of H.v) {
                    for (let M of A.v) {
                        this.LlistatText += M.v.map(X => X.k).join(", ");
                        this.LlistatText += ' ' + this.Mesos(M.k) + ' ';
                    }
                    this.LlistatText += ' de ' + A.k;
                }
                this.LlistatText += ' a les ' + H.k + 'h';
            }
        }


    }

    Mesos(mes) {
        switch (mes) {
            case '01': return ' de gener';
            case '02': return ' de febrer';
            case '03': return ' de març';
            case '04': return ' d\'abril';
            case '05': return ' de maig';
            case '06': return ' de juny';
            case '07': return ' de juliol';
            case '08': return ' d\'agost';
            case '09': return ' de setembre';
            case '10': return ' d\'octubre';
            case '11': return ' de novembre';
            case '12': return ' de desembre';
        }
    }
}

export class HorariDetall {
    DIA: string;
    DIA_NUMERO: string;
    MES_NUMERO: string;
    ANY_NUMERO: string;
    HORA: string;
    ESPAI: string;

    constructor(DIA = "", HORA = "", ESPAI = "") {
        // Convertim el format de data al nostre
        let D = DIA.split('-');
        this.DIA_NUMERO = D[2];
        this.MES_NUMERO = D[1];
        this.ANY_NUMERO = D[0];
        this.DIA = DIA;
        this.HORA = HORA.slice(0, 5);
        this.ESPAI = ESPAI;
    }
}
