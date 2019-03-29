import { Component, OnInit } from '@angular/core';
import { Erfordernis } from '../Artefakte/Erfordernis';
import { NeohandlerService } from '../neohandler.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-erfordernis',
  templateUrl: './create-erfordernis.component.html',
  styleUrls: ['./create-erfordernis.component.css']
})
export class CreateErfordernisComponent implements OnInit {

  erfordernis: Erfordernis = new Erfordernis();
  id:number;

  constructor(
    private neohandler: NeohandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async erstellen() {
    this.id = await this.neohandler.createErfordernis(this.erfordernis);
    console.log(typeof(this.id))
    
  }

  abschicken() {
    this.erstellen();
    this.router.navigate(['/detail_erfordernis', this.id]);
    console.log("navigate:")
    //console.log(temp)
  }
}
