import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.services';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StorageService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email) { // checar se é nulo
      this.email = LocalUser.email;
    }
  }

}
