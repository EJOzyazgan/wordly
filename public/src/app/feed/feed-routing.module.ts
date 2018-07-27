import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FeedComponent} from "./feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {LocationComponent} from "./location/location.component";
import {FriendsComponent} from "./friends/friends.component";
import {MainFeedComponent} from "./main-feed/main-feed.component";

const profileRoutes: Routes = [
  {
    path: '', component: FeedComponent, children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'location', component: LocationComponent},
      {path: 'friends', component: FriendsComponent},
      {path: 'mainFeed', component: MainFeedComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule]
})
export class FeedRoutingModule {
}
