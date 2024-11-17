import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marque } from '../model/marque.model';
import { PC } from '../model/pc.model';
import { PCService } from '../services/pc.service';

@Component({
  selector: 'app-add-pc',
  templateUrl: './add-pc.component.html'
})
export class AddPCComponent implements OnInit {

  newPC = new PC();
  marques!: Marque[];
  newIdMarq!: number;
  newMarque!: Marque;

  constructor(private pcService: PCService,
    private router: Router) { }

  ngOnInit(): void {
    this.pcService.listeMarques()
      .subscribe(marqs => {
        this.marques = marqs._embedded.marques;
        console.log(marqs);
      });
  }

  addPC() {
    this.newPC.marque = this.marques.find(marq => marq.idMarq === this.newIdMarq)!;
    this.pcService.ajouterPC(this.newPC)
      .subscribe(pc => {
        console.log(pc);
        this.router.navigate(['pcs']);
      });
  }
}
