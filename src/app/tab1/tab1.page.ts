import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import {AddFormPage} from './add-form/add-form.page';



const ITEMS_KEY = 'my-items';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {


  items: Item[] = [];

  newItem: Item = {} as Item;

  formPage: AddFormPage = {} as AddFormPage;

  @ViewChild('myList')myList: IonList;


  constructor(private storageService: StorageService, private plt: Platform,
              private toastController: ToastController, private storage: Storage, private location: Location) {
                this.plt.ready().then(() => {
                  this.loadItems();
                });
              }


   ngOnInit() {
   // this.storage.clear();
    console.log('ngOnINitTab1');
   }



  loadItems() {
    this.storageService.getItems().then( items => {
      this.items = items;
    });
  }



  ionViewWillEnter() {
    // this.storage.clear();
    console.log('ioNViewWillEnter');

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

// tslint:disable-next-line: variable-name
    this.storageService.deleteItem(item.id).then( _item => {
      this.showToast('Item removed!');
      this.myList.closeSlidingItems();
      this.loadItems();
    });
  }


ngOnDestroy() {
  console.log('ngonDestroy');
}

}
