import { Component } from '@angular/core';
import { Item } from '../item.model';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  purchasedItems: Item[] = [];

  constructor(private plt: Platform, private storageService: StorageService) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }



  loadItems() {
    this.storageService.getItems().then(( items: Item[]) => {
      for (let i of items) {
        if (i.purchased === true) {
      this.purchasedItems = items;
      
    }
  }

      if (! Array.isArray(items)) {
        items = [items];
      }
    });
  }

}
