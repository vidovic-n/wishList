import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Item } from 'src/app/item.model';


const ITEMS_KEY = 'my-items';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {

  newItem: Item = {} as Item;
  items: Item[] = [];

  constructor(private storageService: StorageService, private plt: Platform,
              private toastController: ToastController, private storage: Storage, private router: Router) {
                this.plt.ready().then(() => {
                  this.loadItems();
                });
              }

  ngOnInit() {}

  ionViewWillLeave() {
    console.log('ioNViewWillLeaveAddForm');
    // this.storage.set(ITEMS_KEY, this.items);
   }

   loadItems() {
    this.storageService.getItems().then( items => {
      this.items = items;
    });
  }

  addItem() {
    this.newItem.id = (Date.now()).toString();
    this.newItem.purchased = false;
    this.storageService.addItem(this.newItem).then(item => {
     // this.newItem = {} as Item;
      this.showToast('Item added!');
      this.loadItems();
      this.router.navigate(['/tabs/tab1']);
    });
   // this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

 
}
