import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivitatHome, ActivitatHomeArray, ActivitatsCicle, ActivitatsPerTipus, ActivitatDetall } from '../model/activitat';
import { NoticiaHome, NoticiesHomeArray } from '../model/noticies';
import { PromocioHome, PromocioHomeArray } from '../model/promocio';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { StateService } from './state.service';
import { Webmodel, ModeClass } from '../model/webmodel';
import { TipusActivitatArray } from '../model/tipus-activitat';
import { MenuElement } from '../model/nodes';
import { StaticPage } from '../model/static-page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  WebStructure: Webmodel = new Webmodel();

  ActivitatDetall: ActivitatDetall = new ActivitatDetall();
  ActivitatsPerTipus: ActivitatsPerTipus[] = [];
  ActivitatsCicles: ActivitatsCicle[] = [];
  Activitats: ActivitatHome[] = [];
  Exposicions: ActivitatHome[] = [];
  Musica: ActivitatHome[] = [];
  Cicles: ActivitatHome[] = [];
  ProperesActivitats: ActivitatHome[] = [];
  Noticies: NoticiaHome[] = [];
  Promocions: PromocioHome[] = [];
  Mode: ModeClass = new ModeClass();

  constructor(
    public api: ApiService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public State: StateService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((URL: UrlSegment[]) => {
      switch (URL[0].toString()) {
        case 'cicles': {
          this.ExecutaCicles(URL);
          this.Mode.setModeLlistatCicles();
          break;
        }
        case 'activitats': {
          this.ExecutaActivitats(URL);
          this.Mode.setModeLlistatActivitats();
          break;
        }
        case 'detall': {
          this.ExecutaDetall(URL);
          this.Mode.setModeDetall();
          break;
        }
        case 'pagina': {
          this.ExecutaStaticPage(URL);
          break;
        }
        case 'home': {
          this.ExecutaHome();
          break;
        }
        case 'calendari': {
          this.ExecutaCalendari();
          break;
        }
      }
    });
  }

  ExecutaDetall(URL: UrlSegment[]) {
    let H = new HttpParams().set('mode', URL[0].toString()); // detall_cicle o detall_activitat
    H = H.append('idActivitat', URL[1].toString());

    this.http
      .get<ActivitatDetall>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure.ActivitatDetall.fromAjax(OA);

        const img = this.WebStructure.ActivitatDetall.ActivitatDetall.gURLImatge;
        this.WebStructure.Promocions = [new PromocioHome().fromApp(0, '', '', img, '')];

        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeDetall();
      });
  }

  ExecutaStaticPage(URL: UrlSegment[]) {
    let H = new HttpParams().set('mode', URL[0].toString());
    H = H.append('idNode', URL[1].toString());

    this.http
      .get<StaticPage>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure.StaticPage.fromAjax(OA['Pagina']);
        const img = this.WebStructure.StaticPage.ImgXLUrl;
        this.WebStructure.Promocions = [new PromocioHome().fromApp(0, '', img, '')];
        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeStaticPage();
      });
  }

  ExecutaActivitats(URL: UrlSegment[]) {
    let idA: number = Number(URL[1].toString());
    let H = new HttpParams().set('mode', 'activitats');
    H = H.append('idTipus', String(idA));

    this.http
      .get<any>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure.Promocions = [];
        this.WebStructure.ActivitatsPerTipus = [];

        let TA = new TipusActivitatArray().fromAjax(OA['TipusActivitats']).getKey(Number(idA));
        this.WebStructure.Activitats = new ActivitatHomeArray(OA['Activitats']).getArray();
        this.WebStructure.ActivitatsPerTipus.push(new ActivitatsPerTipus(idA, TA.tipusDesc, this.WebStructure.Activitats));
        this.WebStructure.Promocions.push(new PromocioHome().fromApp(0, 'Totes les activitats', '', '', '', []));
        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeLlistatActivitats();
      });
  }

  ExecutaCicles(URL: UrlSegment[]) {
    let H = new HttpParams().set('mode', 'cicles');
    H = H.append('idCicle', URL[1].toString());

    this.http
      .get<any>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure.Promocions = [];
        this.WebStructure.ActivitatsCicles = [];

        this.WebStructure.Cicles = new ActivitatHomeArray(OA['Cicles']).getArray();
        this.WebStructure.Activitats = new ActivitatHomeArray(OA['Activitats']).getArray();

        this.WebStructure.Cicles.forEach(C => {
          const AC = new ActivitatsCicle(
            C,
            this.WebStructure.Activitats.filter(A => A.idCicle === C.idCicle)
          );
          this.WebStructure.ActivitatsCicles.push(AC);
          this.WebStructure.Promocions.push(AC.Promocio);
        });

        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeLlistatCicles();
      });
  }

  ExecutaHome(FiltreData = '') {
    let H = new HttpParams().set('mode', 'home');
    if (FiltreData.length > 0) H = H.set('FiltreData', FiltreData);

    this.http
      .get<any>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure = new Webmodel();
        this.WebStructure.Cicles = new ActivitatHomeArray(OA['Cicles']).getArray();
        this.WebStructure.Exposicions = new ActivitatHomeArray(OA['Exposicions']).getArray();
        this.WebStructure.Musica = new ActivitatHomeArray(OA['Musica']).getArray();
        this.WebStructure.ProperesActivitats = new ActivitatHomeArray(OA['ProperesActivitats']).getArray();
        this.WebStructure.Noticies = new NoticiesHomeArray(OA['Noticies']).getArray();
        this.WebStructure.Promocions = new PromocioHomeArray(OA['Promocions']).getArray();
        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeHome();
      });
  }

  ExecutaCalendari() {
    let H = new HttpParams().set('mode', 'calendari');

    this.http
      .get<any>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeCalendari();
      });
  }

  AplicaFiltre($event) {
    console.log($event.toString());
    this.ExecutaHome($event.toString());
  }
}
