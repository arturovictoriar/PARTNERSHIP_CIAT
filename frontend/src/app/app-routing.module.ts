import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPartnerCiatComponent } from './set-partner-ciat/set-partner-ciat.component';
import { GetPartnerCiatComponent } from './get-partner-ciat/get-partner-ciat.component';

const routes: Routes = [{
  path: "",
  component: SetPartnerCiatComponent
},
{
  path: "partners",
  component: GetPartnerCiatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
