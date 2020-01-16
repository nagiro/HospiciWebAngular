import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cicles/:idCicle/:titolCicle', component: HomeComponent },
  { path: 'activitats/:idTipus/:titolActivitat', component: HomeComponent },
  { path: 'detall/:idActivitat/:titolActivitat', component: HomeComponent },
  { path: 'pagina/:idNode/:titolNode', component: HomeComponent },
  { path: 'calendari', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
