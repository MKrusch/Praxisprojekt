import { Component, OnInit } from '@angular/core';
import { Szenario } from '../Artefakte/Szenario';
import { NeohandlerService } from '../neohandler.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-szenario',
  templateUrl: './create-szenario.component.html',
  styleUrls: ['./create-szenario.component.css']
})
export class CreateSzenarioComponent implements OnInit {

  szenario: Szenario = new Szenario();
  id:number;

  constructor(
    private neohandler: NeohandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async erstellen() {
    this.id = await this.neohandler.createSzenario(this.szenario);
    console.log(typeof(this.id))
    
  }

  abschicken() {
    this.erstellen();
    this.router.navigate(['/detail_szenario', this.id]);
    console.log("navigate:")
    //console.log(temp)
  }
}
