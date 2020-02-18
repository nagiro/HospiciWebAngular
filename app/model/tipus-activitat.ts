export class TagsActivitat {
  idTipusActivitat: number = 0;
  Nom: string = '';
  CategoriaVinculada: number = 0;
  site_id: number = 0;
  actiu: boolean = false;

  constructor() {}

  fromAjax(OA: TagsActivitat) {
    return Object.assign(this, OA);
  }
}

export class TipusActivitat {
  idTipus: number = 0;
  tipusNom: string = 'Totes les categories';
  tipusDesc: string = 'Totes les categories';
  site_id: number = 1;
  actiu: boolean = true;

  constructor() {}

  fromAjax(OA: TipusActivitat) {
    return Object.assign(this, OA);
  }
}

export class TipusActivitatArray {
  Tipus: TipusActivitat[] = [];

  constructor() {}

  fromAjax(OA: TipusActivitatArray) {
    this.Tipus = [];
    OA.Tipus.forEach(X => {
      this.Tipus.push(new TipusActivitat().fromAjax(X));
    });
    this.Tipus.push(new TipusActivitat());
    return this;
  }

  getKey(id: number): TipusActivitat {
    return this.Tipus.find(X => X.idTipus == id);
  }
}

export class TagsArray {
  Tags: TagsActivitat[] = [];

  constructor() {}

  fromAjax(OA: TagsArray) {
    this.Tags = [];
    OA.Tags.forEach(X => {
      this.Tags.push(new TagsActivitat().fromAjax(X));
    });
    this.Tags.push(new TagsActivitat());
    return this;
  }

  getKey(id: number): TagsActivitat {
    return this.Tags.find(X => X.CategoriaVinculada == id);
  }
}
