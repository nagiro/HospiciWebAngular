import { environment } from 'src/environments/environment';
import { Node } from './nodes';

export class StaticPage {
  idNodes: number = 0;
  Titol: string = '';
  Text: string = '';
  ImgLUrl: string = '';
  ImgXLUrl: string = '';
  Fills: Node[] = [];

  constructor() {}

  fromAjax(OA: Node, OF: Node[]) {
    this.Titol = OA.Nodes_TitolMenu;
    this.Text = OA.Nodes_Html;
    this.idNodes = OA.Nodes_idNodes;
    this.ImgLUrl = environment.url_pagina_img + this.idNodes + '-L.jpg';
    this.ImgXLUrl = environment.url_pagina_img + this.idNodes + '-XL.jpg';
    OF.forEach(X => {
      this.Fills.push(new Node().fromAjax(X));
    });
    console.log(this);
  }
}
