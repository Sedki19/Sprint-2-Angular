import { Component, OnInit } from '@angular/core';
import { PC } from '../model/pc.model';
import { AuthService } from '../services/auth.service';
import { PCService } from '../services/pc.service';

@Component({
  selector: 'app-pcs',
  templateUrl: './pcs.component.html'
})
export class PCsComponent implements OnInit {

  pcs?: PC[]; // an array of PCs

  constructor(private pcService: PCService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerPCs();
  }

  chargerPCs() {
    this.pcService.listePCs().subscribe(pcsList => {
      console.log(pcsList);
      this.pcs = pcsList;
    });
  }

  supprimerPC(pc: PC) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.pcService.supprimerPC(pc.idPc).subscribe(() => {
        console.log("PC supprimé");
        this.chargerPCs();
      });
  }
}
