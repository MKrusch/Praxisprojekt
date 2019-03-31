import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { Szenario} from './Artefakte/Szenario';
import { Erfordernis } from './Artefakte/Erfordernis';
import { Anforderung } from './Artefakte/Anforderung';
import { NeohandlerService } from './neohandler.service';
import { map } from 'rxjs/operators';

export enum Modus {
  DEFAULT = 0,
  SORT_NAME = 1,
  SORT_PROJECT = 2,
  SORT_DATE = 3,
}

@Injectable({
  providedIn: 'root'
})
export class ArtefaktService {

  private alleSzenarien:Observable<Szenario[]>;
  private alleErfordernisse:Observable<Erfordernis[]>;
  private alleAnforderungen:Observable<Anforderung[]>;

  private ladeHelfer:Observable<any[]>;

  constructor(private neoService: NeohandlerService) {
    this.load(); // Initiales Laden der Artefakte.
  }

  private load(){ // Hier würde das Paginated Loading stattfinden.
    console.log()
    try{
      this.alleSzenarien = from(this.neoService.getAll(new Szenario));
      this.alleErfordernisse = from(this.neoService.getAll(new Erfordernis));
      this.alleAnforderungen = from(this.neoService.getAll(new Anforderung));
      this.ladeHelfer = from(this.neoService.getAll());
    }catch(e){
      console.log(e);
    }

  }

  getSzenarien(chosenMode):Observable<Szenario[]>{
    let result;

    switch(chosenMode){
      case Modus.SORT_NAME: {
        result = this.sortNames(3);
        break;
      }
      case Modus.SORT_PROJECT: {
        result = this.sortProjects(3);
        break;
      }
      case Modus.SORT_DATE: {
        result = this.sortDates(3);
        break;
      }
      default:{
        result = this.alleSzenarien;
        break;
      }
    }

    return result;
  }

  getErfordernisse(chosenMode):Observable<Erfordernis[]>{
    let result;

    switch(chosenMode){
      case Modus.SORT_NAME: {
        result = this.sortNames(1);
        break;
      }
      case Modus.SORT_PROJECT: {
        result = this.sortProjects(1);
        break;
      }
      case Modus.SORT_DATE: {
        result = this.sortDates(1);
        break;
      }
      default:{
        result = this.alleErfordernisse;
        break;
      }
    }

    return result;
  }

  getAnforderungen(chosenMode):Observable<Anforderung[]>{
    let result;

    switch(chosenMode){
      case Modus.SORT_NAME: {
        result = this.sortNames(2);
        break;
      }
      case Modus.SORT_PROJECT: {
        result = this.sortProjects(2);
        break;
      }
      case Modus.SORT_DATE: {
        result = this.sortDates(2);
        break;
      }
      default:{
        result = this.alleAnforderungen;
        break;
      }
    }

    return result;
  }

  sortingMode1 = 1;
  private sortNames(mode){
    this.sortingMode1 *= -1;

    let temp = this.alleSzenarien;
    if(mode === 1){
      let temp = this.alleErfordernisse;
    }else if(mode === 2){
      let temp = this.alleAnforderungen;
    }
    
    temp = temp.pipe(
      map(array => {
        array.sort((a ,b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1*this.sortingMode1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1*this.sortingMode1;
          return 0;
          });
        return array;
      })
    )
    return temp;
  }

  sortingMode2 = 1;
  private sortProjects(mode){
    this.sortingMode2 *= -1;

    let temp = this.alleSzenarien;
    if(mode === 1){
      let temp = this.alleErfordernisse;
    }else if(mode === 2){
      let temp = this.alleAnforderungen;
    }
    temp = temp.pipe(
      map(array => {
        array.sort((a ,b) => {
          if (a.project.toLowerCase() < b.project.toLowerCase()) return -1*this.sortingMode2;
          if (a.project.toLowerCase() > b.project.toLowerCase()) return 1*this.sortingMode2;
          return 0;
          });
        return array;
      })
    )
    return temp;
  }

  sortingMode3 = 1;
  private sortDates(mode){
    this.sortingMode2 *= -1;

    let temp = this.alleSzenarien;
    if(mode === 1){
      let temp = this.alleErfordernisse;
    }else if(mode === 2){
      let temp = this.alleAnforderungen;
    }

    temp = temp.pipe(
      map(array => {
        array.sort((a ,b) => {
          if (a.date < b.date) return -1*this.sortingMode3;
          if (a.date > b.date) return 1*this.sortingMode3;
          return 0;
          });
        return array;
      })
    )
    return temp;
  }

  query;
  filterSzenario(query, mode){
      
    function filterFunction(item) {
      if(item.name.includes(query)) return true;
      return false;
    }

    let temp = this.alleSzenarien;
    if(mode === 1){
      let temp = this.alleErfordernisse;
    }else if(mode === 2){
      let temp = this.alleAnforderungen;
    }

    this.query = query;
    temp = temp.pipe(
      map(array => {
        array = array.filter(filterFunction)
        return array;
      })
    )
    return temp;
  }


}
