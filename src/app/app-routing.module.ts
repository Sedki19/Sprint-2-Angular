import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPCComponent } from './add-pc/add-pc.component';  // Changed from AddProduitComponent to AddPCComponent
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';  // Changed from ListeCategoriesComponent to ListeMarquesComponent
import { LoginComponent } from './login/login.component';
import { PcGuard } from './pc.guard';
import { PCsComponent } from './pcs/pcs.component';  // Changed from ProduitsComponent to PCComponent
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';  // Changed from RechercheParCategorieComponent to RechercheParMarqueComponent
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdatePcComponent } from './update-pc/update-pc.component';  // Changed from UpdateProduitComponent to UpdatePCComponent

const routes: Routes = [
  { path: "pcs", component: PCsComponent },  // Changed from "produits" to "pcs"
  { path: "add-pc", component: AddPCComponent, canActivate: [PcGuard] },  // Changed from "add-produit" to "add-pc"
  { path: "updatePC/:id", component: UpdatePcComponent },  // Changed from "updateProduit" to "updatePC"
  { path: "rechercheParMarque", component: RechercheParMarqueComponent },  // Changed from "rechercheParCategorie" to "rechercheParMarque"
  { path: "rechercheParNom", component: RechercheParNomComponent },
  { path: "listeMarques", component: ListeMarquesComponent },  // Changed from "listeCategories" to "listeMarques"
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: "", redirectTo: "pcs", pathMatch: "full" }  // Changed from "produits" to "pcs"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
