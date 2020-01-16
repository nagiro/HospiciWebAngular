import { ActivitatHomeArray, ActivitatDetall, ActivitatsCicle } from './activitat';
import { UrlSegment } from '@angular/router';

export class Breadcumb {
    BreadcumbList: BreadcumbElement[] = [];
    NivellActual: number = 0;

    constructor() { }

    fromAjax(OA: BreadcumbElement[]) {
        this.BreadcumbList = [];
        OA.forEach(BCumb => {
            let L = [];
            BCumb.Link.forEach((Element) => { L.push(Element); });
            this.BreadcumbList.push(new BreadcumbElement(BCumb.Titol, L));
        });

        return this;
    }

    clear() {
        this.BreadcumbList = [];
    }

    addBreadcumb(Nivell: number = 0, BCE: BreadcumbElement) {
        this.BreadcumbList.splice(Nivell, this.BreadcumbList.length);
        this.BreadcumbList.push(BCE);
    }

    setHome() {
        this.clear();
        this.BreadcumbList.push(new BreadcumbElement("Inici", ['/home']));
        this.NivellActual = 0;
    }

}

export class BreadcumbElement {
    Titol: string = "";
    Link = [];

    constructor(Titol: string, Link = []) {
        this.Titol = Titol;
        this.Link = Link;
    }
}
