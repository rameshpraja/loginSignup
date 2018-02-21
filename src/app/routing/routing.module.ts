import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { AppComponent } from './../app.component';
import { ProtectGuard } from '../guard/protect.guard';
const appRoutes: Routes = [
    { path: `profile`, loadChildren: `./../components/profile/profile.module#ProfileModule`,canActivate: [AuthGuard]},
    { path: ``, redirectTo: `login` , pathMatch: `full` },
    { path: `login`,loadChildren: `./../components/login/login.module#LoginModule`,canActivate: [ProtectGuard]},
    { path: `sign-up`,loadChildren: `./../components/sign-up/sign-up.module#SignUpModule`,canActivate: [ProtectGuard]},
    { path: `not-found`,loadChildren: `./../components/not-found/not-found.module#NotFoundModule` },
    { path: `**`, redirectTo: `not-found` }
    
  ];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule],
  providers:[AuthGuard,ProtectGuard] 
})
export class RoutingModule { }
