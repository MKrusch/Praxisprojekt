import { Component, OnInit } from '@angular/core';
import { Anforderung } from '../Artefakte/Anforderung';
import { NeohandlerService } from '../neohandler.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-create-anforderung',
  templateUrl: './create-anforderung.component.html',
  styleUrls: ['./create-anforderung.component.css']
})

export class CreateAnforderungComponent implements OnInit {

  anforderung: Anforderung = new Anforderung();
  id:number;

  constructor(
    private neohandler: NeohandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async erstellen() {
    this.id = await this.neohandler.createAnforderung(this.anforderung);
  }

  abschicken() {
    this.erstellen();
    this.router.navigate(['/detail_anforderung', this.id]);
    console.log("navigate:")
    //console.log(temp)
  }
}
