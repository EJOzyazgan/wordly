import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: ''},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'feed', loadChildren: './feed/feed.module#FeedModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [];
