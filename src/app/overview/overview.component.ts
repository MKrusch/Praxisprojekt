import { Component, OnInit } from '@angular/core';
import { NeohandlerService } from '../neohandler.service';
import { Szenario } from '../Artefakte/Szenario';
import { Erfordernis } from '../Artefakte/Erfordernis';
import { Anforderung } from '../Artefakte/Anforderung';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artefakt } from '../Artefakte/Artefakt';
import { ArtefaktService, Modus } from '../artefakt.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  szenarios$: Observable<Szenario[]>;
  erfordernisse$: Observable<Erfordernis[]>;
  anforderungen$: Observable<Anforderung[]>;
  //tempAnforderungen$: Observable<Anforderung[]>;
  test$: Observable<Anforderung[]>;

  highlighted:boolean=false;

  query: string;
  filteredSzenarios$: Observable<Szenario[]>;


  
  sortedSzenarios$: Observable<Szenario[]>;

  constructor(private neohandler: NeohandlerService, private artefaktHandler: ArtefaktService) { }

  ngOnInit() {
    this.getAllArtefacts();
  }

  selectedArtefakt: Artefakt= null;
  szenarioProperty: String = null;
  szenarioMode: number = 1;

  onSelect(artefakt: Artefakt): void {
    this.selectedArtefakt = artefakt;
    console.log("Clicked on a "+this.selectedArtefakt.constructor.name+": "+this.selectedArtefakt.name);
    this.getJoinedSzenarios(this.selectedArtefakt);
    this.getJoinedErfordernisse(this.selectedArtefakt);
    this.getJoinedAnforderungen(this.selectedArtefakt);
  }

  async getJoinedSzenarios(artefakt: Artefakt) {
    console.log("Szenario:")
    let promise = await this.neohandler.getSzenario(artefakt);
    this.changeHighlighState(promise,this.szenarios$);
    this.test$ = from(this.all()); // Nur damit node nicht während den Anforderungen abbricht.
  }

  async getJoinedErfordernisse(artefakt: Artefakt) {
    let promise = await this.neohandler.getErfordernis(artefakt);
    this.changeHighlighState(promise,this.erfordernisse$);
    this.test$ = from(this.all()); // Nur damit node nicht während den Anforderungen abbricht.
  }

  async getJoinedAnforderungen(artefakt: Artefakt) {
    let promise = await this.neohandler.getAnforderung(artefakt);
    this.changeHighlighState(promise,this.anforderungen$);
    this.test$ = from(this.all()); // Nur damit node nicht während den Anforderungen abbricht.
  }

  changeHighlighState(promise: Artefakt[], observable: Observable<Artefakt[]>) {
    if(this.highlighted){ // Wenn nichts ausgewählt wurde
      let temp = observable.pipe(map(data => {
        console.log(data)
        console.log(promise)
        data.forEach(anforderung => {
          promise.forEach(element => {
            if(element.id == anforderung.id) {
              anforderung.changeHighlight();
            }
          });
        })
        return data;
      }));
      temp.subscribe();
    }else if(!this.highlighted){ // wenn bereits was ausgewählt wurde
      let temp = observable.pipe(map(data => {
        data.forEach(anforderung => anforderung.highlighted = false )
      }));
      temp.subscribe();
    }
  }

  getAllArtefacts():void {
    // Observables aus den Promisses der asynchronen Funktionen generieren
    this.szenarios$ = this.artefaktHandler.getSzenarien(Modus.DEFAULT);
    this.erfordernisse$ = from(this.all(new Erfordernis));
    this.anforderungen$ = from(this.all(new Anforderung));
    this.test$ = from(this.all()); // Nur damit node nicht während den Anforderungen abbricht.
  }

  async all(artefakt?: Artefakt) {
    let data = await this.neohandler.getAll(artefakt);
    return data;
  }

   

  //(mouseenter)="enter(szenario)" (mouseleave)="leave(szenario)"
  enter(artefakt:Artefakt){
    if(!this.highlighted){
      this.highlighted = !this.highlighted;
      this.selectedArtefakt = artefakt;
      this.getJoinedSzenarios(this.selectedArtefakt);
      this.getJoinedErfordernisse(this.selectedArtefakt);
      this.getJoinedAnforderungen(this.selectedArtefakt);
      this.test$ = from(this.all());
    }
  }

  leave(artefakt){
    if(this.highlighted){
      this.highlighted = !this.highlighted;
      this.selectedArtefakt = artefakt;
      this.getJoinedSzenarios(this.selectedArtefakt);
      this.getJoinedErfordernisse(this.selectedArtefakt);
      this.getJoinedAnforderungen(this.selectedArtefakt);
      this.test$ = from(this.all());
    }
  }
   

  szenarioSortieren(property:String) {
    this.szenarioProperty = property;
    this.szenarioMode = this.szenarioMode*-1;
    console.log(property);

    switch(property) {
      case "Name":{
        this.szenarios$ = this.artefaktHandler.getSzenarien(Modus.SORT_NAME);
        break;
      }
      /*case "Name": {

        this.sortedSzenarios$ = this.szenarios$.pipe(
          map(data => {
            data.sort((a ,b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1*this.szenarioMode;
              if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1*this.szenarioMode;
              return 0;
              });
            return data;
          })
        )
        this.szenarios$ = this.sortedSzenarios$;
        break;
      }*/
      case "Projekt": {
        this.szenarios$ = this.artefaktHandler.getSzenarien(Modus.SORT_PROJECT);
        break;
      }
    }
    //this.sortedSzenarios$.subscribe(val => console.log(val));  dsad
  }

  

  
  szenariosFiltern(){

    this.szenarios$ = this.artefaktHandler.filterSzenario(this.query)
    /*
    this.filteredSzenarios$ = this.szenarios$;
    this.szenarios$ = this.filteredSzenarios$.pipe(map(data => {
      console.log("Überprüfe Array der länge: "+data.length)
      console.log(data)
      while(data[0].name.indexOf(this.filter) == -1 || data[data.length-1].name.indexOf(this.filter) == -1 ) { // ohne diese Schleife werden nur 11 Elemente gelöscht.
        for(let x = 0; x < data.length; x++) {
          console.log("schaue ob: "+this.filter+" an Stelle "+x+" in: "+data[x].name+" vorkommt");
          if(data[x].name.indexOf(this.filter) == -1){
            console.log("negativ")
            data.splice(x, 1);
          }else{
            console.log("positiv");
          }
        }
      }
      console.log(data)
      return data
    }))
    //this.filteredSzenarios$.subscribe();
    //this.szenarios$ = this.filteredSzenarios$;
    */
  }
  

}