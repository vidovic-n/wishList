import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'add-form', loadChildren: './tab1/add-form/add-form.module#AddFormPageModule' },
  { path: 'item-details', loadChildren: './tab1/item-details/item-details.module#ItemDetailsPageModule' },
  { path: 'edit-form', loadChildren: './tab1/edit-form/edit-form.module#EditFormPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
