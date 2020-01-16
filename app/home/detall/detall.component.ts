import { Component, OnInit, Input } from '@angular/core';
import { ActivitatDetall } from 'src/app/model/activitat';

@Component({
  selector: 'app-detall',
  templateUrl: './detall.component.html',
  styleUrls: ['./detall.component.scss']
})
export class DetallComponent implements OnInit {

  @Input() ActivitatDetall: ActivitatDetall = new ActivitatDetall();

  constructor() {
  }

  ngOnInit() {
  }

}
