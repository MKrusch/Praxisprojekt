import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Erfordernis } from '../Artefakte/Erfordernis';
import { NeohandlerService } from '../neohandler.service';

@Component({
  selector: 'app-detail-erfordernis',
  templateUrl: './detail-erfordernis.component.html',
  styleUrls: ['./detail-erfordernis.component.css']
})
export class DetailErfordernisComponent implements OnInit {

  constructor(private route: ActivatedRoute,private neohandler: NeohandlerService,private location: Location, private router: Router) { }

  erfordernis$: Observable<Erfordernis>;
  erfordernis: Erfordernis;
  id;

  ngOnInit() {
    this.getErfordernis()
    console.log(this.id);
  }

  async getErfordernis() {
    this.id = +this.route.snapshot.paramMap.get('id');
    let promise = await this.neohandler.getSpecificArtefact(this.id);
    this.erfordernis = promise;
    this.erfordernis$ = of(promise);
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
