import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.services';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController,
     public menu: MenuController,
     public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {console.log('Autenticação falhou!')});
  }

  login() {
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {console.log('Autenticação falhou!')});
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

}
