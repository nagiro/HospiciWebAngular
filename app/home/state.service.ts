import { Injectable } from '@angular/core';
import { BreadcumbElement, Breadcumb } from '../model/breadcumb';
import { ActivitatHome } from '../model/activitat';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  Breadcumb: Breadcumb = new Breadcumb();
  ActivitatActual: ActivitatHome = new ActivitatHome();

  constructor() { }

}
