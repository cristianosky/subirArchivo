import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ViewDocumentComponent } from './page/view-document/view-document.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'verdoc/:id', component: ViewDocumentComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
