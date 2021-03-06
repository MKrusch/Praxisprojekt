import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Anforderung } from '../Artefakte/Anforderung';
import { NeohandlerService } from '../neohandler.service';
import { Artefakt } from '../Artefakte/Artefakt';
import { ArtefaktService } from '../artefakt.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail-anforderung',
  templateUrl: './detail-anforderung.component.html',
  styleUrls: ['./detail-anforderung.component.css']
})
export class DetailAnforderungComponent implements OnInit {

  constructor(private route: ActivatedRoute,private neohandler: NeohandlerService,private location: Location, private router: Router, private artefactHandler: ArtefaktService) { }

  anforderung$: Observable<Anforderung>;
  anforderung: Artefakt;
  andereAnforderungen$: Observable<Anforderung[]>;
  id;

  ngOnInit() {
    this.getAnforderung()
    console.log(this.id);
  }

  async getÄhnliche(erfordernis){
    let promise = await this.artefactHandler.getSzenarien("");
    let helper = erfordernis
    
    function filterFunction(item) {
      if(item.project === helper.project && !(item.id === helper.id)) {
        return true;
      }
  
      return false;
    }

    let temp = promise.pipe(
      map(array => {
        array = array.filter(filterFunction);
        return array;
      })
    )
    this.andereAnforderungen$ = temp;
  }

  async getAnforderung() {
    this.id = +this.route.snapshot.paramMap.get('id');
    let promise = await this.neohandler.getSpecificArtefact(this.id);
    this.anforderung = promise;
    this.anforderung$ = of(promise);
  }

  async delete(){
    console.log("Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    await this.neohandler.deleteArtefact(this.id);
    this.router.navigate(['/overview']);
  }

  async change(){
    try{
      let promise = await this.neohandler.changeArtefakt(this.anforderung)
    }catch(e){
      console.log("Error in Ändernfunktion2");
      console.log(e);
    }

    this.router.navigate(['/overview']);
  }
}
