import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
    { path: 'profile', component: ProfileComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [ProfileComponent];
