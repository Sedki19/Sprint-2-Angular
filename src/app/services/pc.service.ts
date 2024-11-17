import { Injectable } from '@angular/core';
import { Marque } from '../model/marque.model';  // Renamed Categorie to Marque
import { PC } from '../model/pc.model';  // Renamed Produit to PC
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/marqueWrapped.model';  // Renamed CategorieWrapper to MarqueWrapper
import { AuthService } from './auth.service';
import { apiURL } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PCService {  // Renamed ProduitService to PCService

  apiURLMarque: string = 'http://localhost:8080/pcs/marques';  // Renamed apiURLCat to apiURLMarque

  pcs!: PC[]; // Un tableau de PC (replacing produits)

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  // Get all PCs
  listePCs(): Observable<PC[]> {  // Renamed listeProduit to listePCs

    return this.http.get<PC[]>(apiURL + "/all");
  }

  // Add a PC
  ajouterPC(pc: PC): Observable<PC> {  // Renamed ajouterProduit to ajouterPC
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<PC>(apiURL + "/addpc", pc, { headers: httpHeaders });
  }

  // Delete a PC
  supprimerPC(id: number) {  // Renamed supprimerProduit to supprimerPC
    const url = `${apiURL}/delpc/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  // Get a PC by ID
  consulterPC(id: number): Observable<PC> {  // Renamed consulterProduit to consulterPC
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<PC>(url, { headers: httpHeaders });
  }

  // Update a PC
  updatePC(pc: PC): Observable<PC> {  // Renamed updateProduit to updatePC
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<PC>(apiURL + "/updatepc", pc, { headers: httpHeaders });
  }

  // Get all marques
  listeMarques(): Observable<MarqueWrapper> {  // Renamed listeCategories to listeMarques
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<MarqueWrapper>(this.apiURLMarque, { headers: httpHeaders });
  }

  // Search PCs by marque
  rechercherParMarque(idMarque: number): Observable<PC[]> {  // Renamed rechercherParCategorie to rechercherParMarque
    const url = `${apiURL}/pcsparmarque/${idMarque}`;
    return this.http.get<PC[]>(url);
  }

  // Search PCs by name
  rechercherParNom(nom: string): Observable<PC[]> {  // Renamed rechercherParNomProduit to rechercherParNom
    const url = `${apiURL}/pcsByName/${nom}`;
    return this.http.get<PC[]>(url);
  }

  // Add a marque
  ajouterMarque(marque: Marque): Observable<Marque> {  // Renamed ajouterCategorie to ajouterMarque
    return this.http.post<Marque>(this.apiURLMarque, marque, httpOptions);
  }
}
