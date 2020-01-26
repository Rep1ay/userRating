import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchersComponent } from './watchers/watchers.component';
import { WinnerComponent } from './winner/winner.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full'
  },
  { path: "members", component: WatchersComponent },
  { path: "winner", component: WinnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
