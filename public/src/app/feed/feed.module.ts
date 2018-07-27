import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FeedRoutingModule} from "./feed-routing.module";
import {ProfileComponent} from "./profile/profile.component";
import {LocationComponent} from "./location/location.component";
import {FeedComponent} from "./feed.component";
import {FileSelectDirective} from "ng2-file-upload";


@NgModule({
  declarations: [
    FeedComponent,
    ProfileComponent,
    LocationComponent,
    FileSelectDirective
  ],
  imports: [
    FormsModule,
    FeedRoutingModule,
    CommonModule
  ]
})
export class FeedModule {
}
