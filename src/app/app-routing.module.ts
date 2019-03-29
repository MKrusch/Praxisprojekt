import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { CreateSzenarioComponent } from './create-szenario/create-szenario.component';
import { CreateErfordernisComponent } from './create-erfordernis/create-erfordernis.component';
import { CreateAnforderungComponent } from './create-anforderung/create-anforderung.component';
import { DetailSzenarioComponent } from './detail-szenario/detail-szenario.component';
import { DetailErfordernisComponent } from './detail-erfordernis/detail-erfordernis.component';
import { DetailAnforderungComponent } from './detail-anforderung/detail-anforderung.component';


const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'create_szenario', component: CreateSzenarioComponent },
  { path: 'create_erfordernis', component: CreateErfordernisComponent },
  { path: 'create_anforderung', component: CreateAnforderungComponent },
  { path: 'detail_szenario/:id', component: DetailSzenarioComponent },
  { path: 'detail_erfordernis/:id', component: DetailErfordernisComponent },
  { path: 'detail_anforderung/:id', component: DetailAnforderungComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
