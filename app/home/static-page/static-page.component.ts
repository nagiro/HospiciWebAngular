import { Component, OnInit, Input } from '@angular/core';
import { StaticPage } from 'src/app/model/static-page';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent implements OnInit {
  _page: StaticPage = new StaticPage();
  _html: SafeHtml;

  @Input() set InputDades(Page: StaticPage) {
    this._page = Page;
    this._html = this.sanitizer.bypassSecurityTrustHtml(this._page.Text);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
