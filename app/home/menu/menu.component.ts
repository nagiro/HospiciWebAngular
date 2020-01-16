import { Component, OnInit, Input } from '@angular/core';
import { MenuElement } from 'src/app/model/nodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  _Menu: MenuElement = new MenuElement();
  _Obert: boolean = false;
  _Pare1: MenuElement = new MenuElement();
  _Pare2: MenuElement = new MenuElement();
  _Pare3: MenuElement = new MenuElement();

  @Input() set InputDades(DA: MenuElement) {
    this._Menu = DA;
  };


  constructor(private router: Router) { }

  ngOnInit() {
  }

  MostraSimbolMenu(ME: MenuElement) {
    if (ME.TeFills && !ME.Obert) return '+';
    if (ME.TeFills && ME.Obert) return '-';
    if (!ME.TeFills) return '>';
  }

  ClickMenu() {
    this._Obert = !this._Obert;
  }

  ClickElement(Element: MenuElement) {
    let NodeActual = Element.Element;
    Element.Obert = !Element.Obert;

    //Si el node és buit, és només un link, no carreguem res.
    if (NodeActual.Nodes_Html.length > 0) {
      //Mostrem HTML
    }
    if (NodeActual.Nodes_Url.length == 0 && NodeActual.Nodes_isActiva) {
      this.router.navigate(NodeActual.GenUrl);
    }
    if (NodeActual.Nodes_Url.length > 0 && NodeActual.Nodes_isActiva) {
      this.router.navigateByUrl(NodeActual.Nodes_Url);
    }

    // Si no disposa d'una URL o HTML, simplement despleguem el menú

  }

}
