import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Szenario } from '../Artefakte/Szenario';
import { NeohandlerService } from '../neohandler.service';
import { ArtefaktService } from '../artefakt.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail-szenario',
  templateUrl: './detail-szenario.component.html',
  styleUrls: ['./detail-szenario.component.css']
})
export class DetailSzenarioComponent implements OnInit {

  constructor(private route: ActivatedRoute,private neohandler: NeohandlerService,private location: Location, private router: Router, private artefactHandler:ArtefaktService) { }

  szenario$: Observable<Szenario>;
  szenario: Szenario;
  andereSzenarien$: Observable<Szenario[]>;
  id;

  ngOnInit() {
    this.getSzenario()

  }

  async getÄhnliche(szenario){
    let promise = await this.artefactHandler.getSzenarien("");
    let helper = szenario
    
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
    this.andereSzenarien$ = temp;
  }
  
  async getSzenario() {
    this.id = +this.route.snapshot.paramMap.get('id');
    let promise = await this.neohandler.getSpecificArtefact(this.id);
    this.szenario = promise;
    this.szenario$ = of(promise);
    this.getÄhnliche(this.szenario)
  }

  async delete(){
    await this.neohandler.deleteArtefact(this.id);
    this.router.navigate(['/overview']);
  }

  async change(){
    try{
      let promise = await this.neohandler.changeArtefakt(this.szenario)
    }catch(e){
      console.log("Error in Ändernfunktion2");
      console.log(e);
    }

    this.router.navigate(['/overview']);
  }

}
