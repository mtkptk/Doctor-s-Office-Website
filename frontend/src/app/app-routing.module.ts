import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerRegistracijeComponent } from './menadzer-registracije/menadzer-registracije.component';
import { MenadzerPreglediComponent } from './menadzer-pregledi/menadzer-pregledi.component';
import { MenadzerPacijentiComponent } from './menadzer-pacijenti/menadzer-pacijenti.component';
import { MenadzerLekariComponent } from './menadzer-lekari/menadzer-lekari.component';
import { UserAddComponent } from './user-add/user-add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { MenadzerSpecijalizacijeComponent } from './menadzer-specijalizacije/menadzer-specijalizacije.component';
import { PregledAddComponent } from './pregled-add/pregled-add.component';
import { PacijentProfilComponent } from './pacijent-profil/pacijent-profil.component';
import { PacijentLekariComponent } from './pacijent-lekari/pacijent-lekari.component';
import { PacijentPreglediComponent } from './pacijent-pregledi/pacijent-pregledi.component';
import { PacijentLekariInfoComponent } from './pacijent-lekari-info/pacijent-lekari-info.component';
import { LekarProfilComponent } from './lekar-profil/lekar-profil.component';
import { PacijentZakaziPregledComponent } from './pacijent-zakazi-pregled/pacijent-zakazi-pregled.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component';
import { LekarRaznoComponent } from './lekar-razno/lekar-razno.component';
import { PacijentKartonComponent } from './pacijent-karton/pacijent-karton.component';
import { LekarDodajIzvestajComponent } from './lekar-dodaj-izvestaj/lekar-dodaj-izvestaj.component';

const routes: Routes = [
  {path: "menadzer", component: MenadzerComponent},
  {path: "menadzer/pacijenti", component: MenadzerPacijentiComponent},
  {path: "menadzer/lekari", component: MenadzerLekariComponent},
  {path: "menadzer/registracije", component: MenadzerRegistracijeComponent},
  {path: "menadzer/pregledi/:zahtev", component: MenadzerPreglediComponent},
  {path: "register", component: UserAddComponent},
  {path: "", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "login-menadzer", component: LoginMenadzerComponent},
  {path: "lekar", component: LekarComponent},
  {path: "pacijent", component: PacijentComponent},
  {path: "change-password", component: UserChangePasswordComponent},
  {path: "menadzer/specijalizacije", component: MenadzerSpecijalizacijeComponent},
  {path: "menadzer/add-pregled/:spec", component: PregledAddComponent},
  {path: "pacijent/profil", component: PacijentProfilComponent},
  {path: "pacijent/lekari", component: PacijentLekariComponent},
  {path: "pacijent/pregledi", component: PacijentPreglediComponent},
  {path: "pacijent/lekari-info/:id", component: PacijentLekariInfoComponent},
  {path: "lekar/profil", component: LekarProfilComponent},
  {path: "pacijent/zakazi-pregled/:pregled_id/:lekar_id", component: PacijentZakaziPregledComponent},
  {path: "lekar/pregledi", component: LekarPreglediComponent},
  {path: "lekar/razno", component: LekarRaznoComponent},
  {path: "lekar/karton/:pacijent_id", component: PacijentKartonComponent},
  {path: "lekar/dodaj-izvestaj/:pacijent_id/:lekar_id/:termin_id", component: LekarDodajIzvestajComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
