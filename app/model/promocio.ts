export class Promocio {
  PROMOCIONS_PROMOCIO_ID: number = 0;
  PROMOCIONS_NOM: string = '';
  PROMOCIONS_TITOL: string = '';
  PROMOCIONS_SUBTITOL: string = '';
  PROMOCIONS_ORDRE: number = 0;
  PROMOCIONS_IS_ACTIVA: boolean = false;
  PROMOCIONS_URL: string = '';
  PROMOCIONS_IMATGE_S: string = null;
  PROMOCIONS_IMATGE_M: string = null;
  PROMOCIONS_IMATGE_L: string = null;
  PROMOCIONS_SITE_ID: number = 1;
  PROMOCIONS_ACTIU: boolean = true;
}

export class PromocioHome extends Promocio {
  linkRouter = [];
  mostraTextos = true;

  constructor(OA?: PromocioHome) {
    super();
    if (OA) this.fromAjax(OA);
  }

  fromAjax(OA: PromocioHome) {
    for (let key in OA) {
      this[key] = OA[key];
    }
  }

  fromApp(id: number, titol: string, subtitol: string, imatge: string, link: string = '', linkRouter = []) {
    this.PROMOCIONS_PROMOCIO_ID = id;
    this.PROMOCIONS_TITOL = titol;
    this.PROMOCIONS_SUBTITOL = subtitol;
    this.PROMOCIONS_IMATGE_L = imatge;
    this.PROMOCIONS_URL = link;
    this.linkRouter = linkRouter;
    return this;
  }
}
export class PromocioHomeArray {
  Promocions: PromocioHome[] = [];

  constructor(AA?: PromocioHome[]) {
    this.Promocions = AA.map((X: PromocioHome) => new PromocioHome(X));
  }

  getArray() {
    return this.Promocions;
  }
}
