import { Injectable } from '@angular/core';
import { BreadcumbElement } from '../model/breadcumb';
import { ActivitatHome } from '../model/activitat';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  Breadcumb: BreadcumbElement[] = [];
  ActivitatActual: ActivitatHome = new ActivitatHome();

  constructor() { }
}
