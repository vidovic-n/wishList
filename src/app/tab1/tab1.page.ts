import { Component, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList} from '@ionic/angular';


const ITEMS_KEY = 'my-items';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  items: Item[] = [];

  newItem: Item = {} as Item;

  @ViewChild('myList')myList: IonList;
  sh: any;
  storage: any;


  constructor(private storageService: StorageService, private plt: Platform,
              private toastController: ToastController) {
                this.plt.ready().then(() => {
                  this.loadItems();
                });
              }


  loadItems() {
    this.storageService.getItems().then( items => {
      this.items = items;
    });
  }

  addItem() {
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = {} as Item;
      this.showToast('Item added!');
      this.loadItems();
    });
  }
 
  updateItem(item: Item) {
    item.title = 'UPDATED: ${item.title}';
    
// tslint:disable-next-line: variable-name
    this.storageService.updateItem(item).then(_item => {
      this.showToast('Item update!');
      this.myList.closeSlidingItems();
      this.loadItems();
    });
  }

  deleteItem(item: Item) {
// tslint:disable-next-line: variable-name
    this.storageService.deleteItem(item.id).then( _item => {
      this.showToast('Item removed!');
      this.myList.closeSlidingItems();
      this.loadItems();
    });
  }

async showToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}
