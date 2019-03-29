import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularNeo4jModule } from 'angular-neo4j';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateSzenarioComponent } from './create-szenario/create-szenario.component';
import { DetailSzenarioComponent } from './detail-szenario/detail-szenario.component';
import { CreateErfordernisComponent } from './create-erfordernis/create-erfordernis.component';
import { CreateAnforderungComponent } from './create-anforderung/create-anforderung.component';
import { DetailErfordernisComponent } from './detail-erfordernis/detail-erfordernis.component';
import { DetailAnforderungComponent } from './detail-anforderung/detail-anforderung.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    NavigationComponent,
    CreateSzenarioComponent,
    DetailSzenarioComponent,
    CreateErfordernisComponent,
    CreateAnforderungComponent,
    DetailErfordernisComponent,
    DetailAnforderungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularNeo4jModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
