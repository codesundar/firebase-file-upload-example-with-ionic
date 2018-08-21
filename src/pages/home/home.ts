import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url: any = '';
  constructor(public loadingCtrl: LoadingController) {

  }
  chooseFile() {
    // open file picker
    document.getElementById('image').click();
  }
  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = '/files/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then(() => {
        loading.dismiss();
        iRef.getDownloadURL().then( url => this.url = url )
      });
      
    }
  }
}
