import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Item } from '../item.model';
import { stringify } from '@angular/core/src/render3/util';


const ITEMS_KEY = 'my-items';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  items: Item[] = [];
  newItem: Item = {} as Item;
  selectedValue = '';

  @ViewChild('myList') myList: IonList;


  constructor(private storageService: StorageService, private plt: Platform,
              private toastController: ToastController, private storage: Storage, private location: Location,
              private alertCtrl: AlertController, private router: Router) {
                     this.plt.ready().then(() => {
                     this.loadItems();
                      });
  }


  ngOnInit() {
    // this.storage.clear();
    console.log('ngOnINitTab1');
  }

  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;

      if (!Array.isArray(items)) {
        items = [items];
      }
    });
  }


  ionViewWillEnter() {
    // this.storage.clear();
    this.loadItems();
    this.router.navigate(['/tabs/tab1']);
    console.log('ioNViewWillEnterTab1');
  }

  //   updateItem(item: Item) {
  //     item.title = 'UPDATED: ${item.title}';


  // // tslint:disable-next-line: variable-name
  //     this.storageService.updateItem(item).then(_item => {
  //       this.showToast('Item update!');
  //       this.myList.closeSlidingItems();
  //       this.loadItems();
  //     });
  //   }


  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  deleteItem(item: Item) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the item?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          // tslint:disable-next-line: variable-name
          this.storageService.deleteItem(item.id).then(_item => {
            this.showToast('Item removed!');
            this.myList.closeSlidingItems();
            this.loadItems();
            this.router.navigate(['/tabs/tab1']);
          });
          //  this.router.navigate(['/tabs/tab1']);
        }
      }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

filterCategory(event: any) {

  this.storageService.getItems().then((items: Item[]) => {
    this.selectedValue = event.target.value;
    if (this.selectedValue === 'technology') {
    this.items = this.items.filter(item => {
      if (item.category === 'technology') {
        return this.storage.set(ITEMS_KEY, items);
      }
    });
  } else if (this.selectedValue === 'food') {
    this.items = this.items.filter(item => {
      if (item.category === 'food') {
        return this.storage.set(ITEMS_KEY, items);
      }
    });
  } else if (this.selectedValue === 'clothes') {
    this.items = this.items.filter(item => {
      if (item.category === 'clothes') {
        return this.storage.set(ITEMS_KEY, items);
      }
    });
  } else if (this.selectedValue === 'cosmetics') {
    this.items = this.items.filter(item => {
      if (item.category === 'cosmetics') {
        return this.storage.set(ITEMS_KEY, items);
      }
    });
  } else if (this.selectedValue === 'all') {
    this.items = items;
  }
  });
}

  ngOnDestroy() {
    console.log('ngonDestroy');
  }

}
