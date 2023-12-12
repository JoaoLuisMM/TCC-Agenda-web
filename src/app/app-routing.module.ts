import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TratamentoErroComponent} from "./core/components/tratamento-erro/tratamento-erro.component";

const routes: Routes = [{
  path: 'erro',
  component: TratamentoErroComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
