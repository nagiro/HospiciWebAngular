import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SingleListComponent } from './single-list/single-list.component';
import { DoubleListComponent } from './double-list/double-list.component';
import { BannerComponent } from './banner/banner.component';
import { NoticiesComponent } from './noticies/noticies.component';
import { BarrasuperiorComponent } from './barrasuperior/barrasuperior.component';
import { BannersComponent } from './banners/banners.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LlistatCiclesComponent } from './llistat-cicles/llistat-cicles.component';
import { LlistatActivitatsComponent } from './llistat-activitats/llistat-activitats.component';
import { DetallComponent } from './detall/detall.component';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CalendariComponent } from './calendari/calendari.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomeComponent,
    SingleListComponent,
    DoubleListComponent,
    BannerComponent,
    NoticiesComponent,
    BarrasuperiorComponent,
    BannersComponent,
    FooterComponent,
    LlistatCiclesComponent,
    LlistatActivitatsComponent,
    DetallComponent,
    BreadcumbComponent,
    MenuComponent,
    StaticPageComponent,
    CalendariComponent
  ],
  imports: [CommonModule, HttpClientModule, RouterModule, NgxUsefulSwiperModule, BrowserModule],
  exports: [LlistatCiclesComponent, LlistatActivitatsComponent, DetallComponent],
  providers: []
})
export class HomeModule {}
