import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import tr from '@angular/common/locales/tr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//Firebase imports
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";

//NgZorro imports
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { tr_TR } from 'ng-zorro-antd/i18n';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

// Component imports
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonBlopComponent } from './components/shared-components/button-blop/button-blop.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { ResetComponent } from './components/login/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './shared/services/auth-service/auth.service';
import { FirstLoginComponent } from './components/login/first-login/first-login.component';
import { CompanyCardComponent } from './components/dashboard/company-card/company-card.component';
import { CompanyComponent } from './components/company/company.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { NewCompanyComponent } from './components/new-review/new-company/new-company.component';
import { ExpandReviewComponent } from './components/company/expand-review/expand-review.component';

import { FilterCompaniesPipe } from './shared/pipes/filterCompanies.pipe';
import { ExpandProfileReviewComponent } from './components/user-profile/expand-profile-review/expand-profile-review.component';


registerLocaleData(tr);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    ButtonBlopComponent,
    SignInComponent,
    SignUpComponent,
    ResetComponent,
    DashboardComponent,
    FirstLoginComponent,
    CompanyCardComponent,
    CompanyComponent,
    UserProfileComponent,
    NewReviewComponent,
    NewCompanyComponent,
    ExpandReviewComponent,
    FilterCompaniesPipe,
    ExpandProfileReviewComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzNotificationModule,
    NzModalModule,
    NzCardModule,
    NzAvatarModule,
    NzRateModule,
    NzIconModule,
    NzLayoutModule,
    NzButtonModule,
    NzSelectModule,
    NzRadioModule,
    NzUploadModule,
    NzDropDownModule
  ],
  providers: [{ provide: NZ_I18N, useValue: tr_TR }, AuthService, { provide: Storage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
