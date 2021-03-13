import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/services/auth-service/auth.guard';
import { SignedInGuard } from './shared/services/auth-service/SignedIn.guard';
import { CompanyComponent } from './components/company/company.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'auth', component: LoginComponent, canActivate: [SignedInGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'company/:id', component: CompanyComponent },
  { path: 'new-review', component: NewReviewComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: UserProfileComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
