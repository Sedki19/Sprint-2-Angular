import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from '../model/marque.model';  // Updated import
import { PC } from '../model/pc.model';  // Updated import
import { PCService } from '../services/pc.service';

@Component({
  selector: 'app-update-pc',
  templateUrl: './update-pc.component.html',
  styles: []
})
export class UpdatePcComponent implements OnInit {

  currentPC = new PC();
  marques!: Marque[];
  updatedMarqueId!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private pcService: PCService) { }

  ngOnInit(): void {
    // Fetching the list of Marques (Categories renamed to Marque)
    this.pcService.listeMarques().
      subscribe(marques => {
        this.marques = marques._embedded.marques;  // Adjusted for marque
        console.log(marques);
      });

    // Fetching the PC by its ID from the route
    this.pcService.consulterPC(this.activatedRoute.snapshot.params['id']).
      subscribe(pc => {
        this.currentPC = pc;
        this.updatedMarqueId = this.currentPC.marque.idMarq;  // Adjusted for marque
      });
  }

  updatePC() {
    this.currentPC.marque = this.marques.find(marque => marque.idMarq == this.updatedMarqueId)!;  // Adjusted for marque
    this.pcService.updatePC(this.currentPC).subscribe(pc => {
      this.router.navigate(['pcs']);  // Navigating back to the produits list
    });
  }

}
