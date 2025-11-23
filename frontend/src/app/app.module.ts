import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerMenuBarComponent } from './menadzer-menu-bar/menadzer-menu-bar.component';
import { MenadzerRegistracijeComponent } from './menadzer-registracije/menadzer-registracije.component';
import { MenadzerPreglediComponent } from './menadzer-pregledi/menadzer-pregledi.component';
import { MenadzerPacijentiComponent } from './menadzer-pacijenti/menadzer-pacijenti.component';
import { MenadzerLekariComponent } from './menadzer-lekari/menadzer-lekari.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UserAddComponent } from './user-add/user-add.component';
import { ListLekariComponent } from './list-lekari/list-lekari.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { MenadzerSpecijalizacijeComponent } from './menadzer-specijalizacije/menadzer-specijalizacije.component';
import { PregledAddComponent } from './pregled-add/pregled-add.component';
import { PregledEditComponent } from './pregled-edit/pregled-edit.component';
import { PacijentProfilComponent } from './pacijent-profil/pacijent-profil.component';
import { PacijentLekariComponent } from './pacijent-lekari/pacijent-lekari.component';
import { PacijentMenuBarComponent } from './pacijent-menu-bar/pacijent-menu-bar.component';
import { PacijentPreglediComponent } from './pacijent-pregledi/pacijent-pregledi.component';
import { PacijentLekariInfoComponent } from './pacijent-lekari-info/pacijent-lekari-info.component';
import { UserViewComponent } from './user-view/user-view.component';
import { LekarProfilComponent } from './lekar-profil/lekar-profil.component';
import { LekarMenuBarComponent } from './lekar-menu-bar/lekar-menu-bar.component';
import { PacijentZakaziPregledComponent } from './pacijent-zakazi-pregled/pacijent-zakazi-pregled.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component';
import { LekarRaznoComponent } from './lekar-razno/lekar-razno.component';
import { PacijentKartonComponent } from './pacijent-karton/pacijent-karton.component';
import { LekarDodajIzvestajComponent } from './lekar-dodaj-izvestaj/lekar-dodaj-izvestaj.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LekarOdmorComponent } from './lekar-odmor/lekar-odmor.component';


@NgModule({
  declarations: [
    AppComponent,
    MenadzerComponent,
    MenadzerMenuBarComponent,
    MenadzerRegistracijeComponent,
    MenadzerPreglediComponent,
    MenadzerPacijentiComponent,
    MenadzerLekariComponent,
    UserEditComponent,
    UserAddComponent,
    ListLekariComponent,
    HomeComponent,
    LoginComponent,
    LoginMenadzerComponent,
    LekarComponent,
    PacijentComponent,
    UserChangePasswordComponent,
    MenadzerSpecijalizacijeComponent,
    PregledAddComponent,
    PregledEditComponent,
    PacijentProfilComponent,
    PacijentLekariComponent,
    PacijentMenuBarComponent,
    PacijentPreglediComponent,
    PacijentLekariInfoComponent,
    UserViewComponent,
    LekarProfilComponent,
    LekarMenuBarComponent,
    PacijentZakaziPregledComponent,
    LekarPreglediComponent,
    LekarRaznoComponent,
    PacijentKartonComponent,
    LekarDodajIzvestajComponent,
    LekarOdmorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
