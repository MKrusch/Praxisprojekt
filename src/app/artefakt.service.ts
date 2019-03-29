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
        result = this.sortNames();
        break;
      }
      case Modus.SORT_PROJECT: {
        result = this.sortProjects();
        break;
      }
      case Modus.SORT_DATE: {
        result = this.sortDates();
        break;
      }
      default:{
        result = this.alleSzenarien;
        break;
      }
    }

    return result;
  }

  sortingMode1 = 1;
  private sortNames(){
    this.sortingMode1 *= -1;

    let temp = this.alleSzenarien;
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
  private sortProjects(){
    this.sortingMode2 *= -1;

    let temp = this.alleSzenarien;
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
  private sortDates(){
    this.sortingMode2 *= -1;

    let temp = this.alleSzenarien;
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
  filterSzenario(query){
      
    function filterFunction(item) {
      if(item.name.includes(query)) return true;
      return false;
    }

    let temp = this.alleSzenarien;
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
