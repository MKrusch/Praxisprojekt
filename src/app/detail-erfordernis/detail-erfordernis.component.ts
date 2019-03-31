import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Erfordernis } from '../Artefakte/Erfordernis';
import { NeohandlerService } from '../neohandler.service';
import { ArtefaktService } from '../artefakt.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail-erfordernis',
  templateUrl: './detail-erfordernis.component.html',
  styleUrls: ['./detail-erfordernis.component.css']
})
export class DetailErfordernisComponent implements OnInit {
  andereSzenarien$: any;

  constructor(private route: ActivatedRoute,private neohandler: NeohandlerService,private location: Location, private router: Router, private artefactHandler: ArtefaktService) { }

  erfordernis$: Observable<Erfordernis>;
  erfordernis: Erfordernis;
  andereErfordernisse$: Observable<Erfordernis[]>;
  id;

  ngOnInit() {
    this.getErfordernis()
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
    this.andereErfordernisse$ = temp;
  }

  async getErfordernis() {
    this.id = +this.route.snapshot.paramMap.get('id');
    let promise = await this.neohandler.getSpecificArtefact(this.id);
    this.erfordernis = promise;
    this.erfordernis$ = of(promise);
    this.getÄhnliche(this.erfordernis$)
  }

  async delete(){
    console.log("Delete <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    await this.neohandler.deleteArtefact(this.id);
    this.router.navigate(['/overview']);
  }

  async change(){
    try{
      let promise = await this.neohandler.changeArtefakt(this.erfordernis)
    }catch(e){
      console.log("Error in Ändernfunktion2");
      console.log(e);
    }

    this.router.navigate(['/overview']);
  }
}
