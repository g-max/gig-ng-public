import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './components/payments/payments.component';
import { GeneratorComponent } from './components/generator/generator.component';

const routes: Routes = [
  { path: 'generator', component: GeneratorComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
