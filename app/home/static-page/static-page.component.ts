import { Component, OnInit, Input } from '@angular/core';
import { StaticPage } from 'src/app/model/static-page';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent implements OnInit {

  _page: StaticPage = new StaticPage();

  @Input() set InputDades(Page: StaticPage) {
    this._page = Page;
  }

  constructor() { }

  ngOnInit() {
  }

}
