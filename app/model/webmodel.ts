import { ActivitatDetall, ActivitatsPerTipus, ActivitatsCicle, ActivitatHome } from './activitat';
import { NoticiaHome } from './noticies';
import { PromocioHome } from './promocio';
import { Breadcumb } from './breadcumb';
import { MenuElement } from './nodes';
import { StaticPage } from './static-page';

/* Model que es genera amb una crida HTTP */
export class Webmodel {
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
  Breadcumb: Breadcumb = new Breadcumb();
  Menu: MenuElement = new MenuElement();
  StaticPage: StaticPage = new StaticPage();

  constructor() {}
}

export class ModeClass {
  banner = false;
  static_banner = false;
  breadcumb = false;
  noticies = false;
  lists = false;
  lists_cicles = false;
  lists_activitats = false;
  detall = false;
  banners = false;
  static_page = false;
  calendari = false;

  constructor() {}

  setAllFalse() {
    for (let a of Object.keys(this)) {
      this[a] = false;
    }
  }

  setModeHome() {
    this.setAllFalse();
    this.banner = true;
    this.noticies = true;
    this.lists = true;
    this.banners = true;
    this.calendari = true;
  }

  setModeLlistatCicles() {
    this.setAllFalse();
    this.static_banner = true;
    this.breadcumb = true;
    this.lists_cicles = true;
  }

  setModeLlistatActivitats() {
    this.setAllFalse();
    this.static_banner = true;
    this.breadcumb = true;
    this.lists_activitats = true;
  }

  setModeDetall() {
    this.setAllFalse();
    this.static_banner = true;
    this.breadcumb = true;
    this.detall = true;
  }

  setModeStaticPage() {
    this.setAllFalse();
    this.static_banner = true;
    this.breadcumb = true;
    this.static_page = true;
  }

  setModeCalendari() {
    this.setAllFalse();
    this.static_banner = true;
    this.breadcumb = true;
    this.calendari = true;
  }
}
