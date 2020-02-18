import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ActivitatHome,
  ActivitatHomeArray,
  ActivitatsCicle,
  ActivitatsPerTipus,
  ActivitatDetall,
  FiltreActivitat
} from '../model/activitat';
import { NoticiaHome, NoticiesHomeArray } from '../model/noticies';
import { PromocioHome, PromocioHomeArray } from '../model/promocio';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { StateService } from './state.service';
import { Webmodel, ModeClass } from '../model/webmodel';
import { TipusActivitatArray, TagsArray } from '../model/tipus-activitat';
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
      let FirstParameter = URL[0] ? URL[0].toString() : '';

      switch (FirstParameter) {
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
        case 'calendari': {
          this.ExecutaCalendari();
          break;
        }
        case 'tag': {
          this.ExecutaActivitats(URL);
          this.Mode.setModeLlistatActivitats();
          break;
        }
        default: {
          this.ExecutaHome();
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
        this.WebStructure = new Webmodel();

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
        this.WebStructure = new Webmodel();

        this.WebStructure.StaticPage.fromAjax(OA['Pagina'], OA['Fills']);
        const img = this.WebStructure.StaticPage.ImgXLUrl;
        this.WebStructure.Promocions = [new PromocioHome().fromApp(0, '', img, '')];
        this.WebStructure.Breadcumb.fromAjax(OA['Breadcumb']);
        this.WebStructure.Menu = new MenuElement(OA['Menu']);
        this.WebStructure.Mode.setModeStaticPage();
      });
  }

  /** Aquí hi podem entrar amb TAG (On hi ha el tipus d'activitat) o bé amb Activitats ( on hi ha la categoria de l'activitat ) */
  /** Podem entrar per: http://localhost:4200/activitats/0/Totes_les_activitats o a través d'aplicar filtres */
  ExecutaActivitats(URL: UrlSegment[] = [], Filtres: FiltreActivitat[] = []) {
    /* Entrem amb URL */

    let H = new HttpParams().set('mode', 'activitats');
    let TipusActivitat = 0;

    /** Si entrem alguna cosa per URL */
    if (URL.length === 3) {
      if (URL[0].toString() == 'activitats') {
        TipusActivitat = Number(URL[1].toString());
        H = H.append('idTipus', String(TipusActivitat));
      }
    }

    /** Si entrem per Filtres */
    if (Filtres.length > 0) {
      H = H.append('Filtres', JSON.stringify(Filtres));
    }

    this.http.post<any>(this.api.apiURL + '/getActivitats', H).subscribe((OA: any) => {
      this.WebStructure = new Webmodel();
      this.WebStructure.Promocions = [];
      this.WebStructure.ActivitatsPerTipus = [];
      this.WebStructure.Activitats = new ActivitatHomeArray(OA['Activitats']).getArray();

      //Si entrem un filtre de tag (Tipus d'activitat) o una Categoria d'activitat (Checkbox d'activitat)
      if (Filtres.length > 0) {
        if (Filtres[0].isTag()) {
          const TA = new TagsArray().fromAjax(OA['TagsActivitats']).getKey(Number(Filtres[0].key));
          this.WebStructure.ActivitatsPerTipus.push(
            new ActivitatsPerTipus(parseInt(Filtres[0].key), TA.Nom, this.WebStructure.Activitats)
          );
        }
        if (Filtres[0].isData()) {
          this.WebStructure.ActivitatsPerTipus.push(
            new ActivitatsPerTipus(parseInt(Filtres[0].key), Filtres[0].key, this.WebStructure.Activitats)
          );
        }
      }

      if (URL.length == 3 && URL[0].toString() == 'activitats') {
        const TA = new TipusActivitatArray().fromAjax(OA['TipusActivitats']).getKey(Number(TipusActivitat));
        this.WebStructure.ActivitatsPerTipus.push(
          new ActivitatsPerTipus(TipusActivitat, TA.tipusDesc, this.WebStructure.Activitats)
        );
      }

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
        this.WebStructure = new Webmodel();
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

  ExecutaHome() {
    let H = new HttpParams().set('mode', 'home');
    this.http
      .get<any>(this.api.apiURL + '/getActivitats', { params: H })
      .subscribe((OA: any) => {
        this.WebStructure = new Webmodel();
        this.WebStructure.Cicles = new ActivitatHomeArray(OA['Cicles']).getArray();
        this.WebStructure.Exposicions = new ActivitatHomeArray(OA['Exposicions']).getArray();
        this.WebStructure.Petita = new ActivitatHomeArray(OA['Petita']).getArray();
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

  executaFiltre(FA: FiltreActivitat[]) {
    this.ExecutaActivitats([], FA);
  }
}
