import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { GuideComponent } from './guidebook/guide-page/guide-page.component';
import { TableComponent } from './table/table.component';
import { KeepersFormComponent } from './keepers-form/keepers.form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomepageComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'table', component: TableComponent },
  { path: 'keepers-form', component: KeepersFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
