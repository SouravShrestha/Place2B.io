import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { TagsComponent } from './tags/tags.component';
import { FavComponent } from './fav/fav.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'upload', component:UploadComponent, canActivate: [AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'fav', component:FavComponent, canActivate: [AuthGuard]},
  {path:'search', component:SearchComponent},
  {path:'tags', component:TagsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
