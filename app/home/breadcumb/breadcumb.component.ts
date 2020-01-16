import { Component, OnInit, Input } from '@angular/core';
import { Breadcumb } from 'src/app/model/breadcumb';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss']
})
export class BreadcumbComponent implements OnInit {

  @Input() Breadcumb: Breadcumb = new Breadcumb();

  constructor() { }

  ngOnInit() { }

  getColor(Nivell: number) {
    //Miro quants nivells hi ha

    let TotalNivells = this.Breadcumb.BreadcumbList.length - 1;
    switch (TotalNivells - Nivell) {
      case -1: return "#EEEEEE";
      case 0: return "#EEEEEE";
      case 1: return "#DDDDDD";
      case 2: return "#CCCCCC";
      case 3: return "#BBBBBB";
      case 4: return "#AAAAAA";
      case 5: return "#888888";
    }
  }

}
