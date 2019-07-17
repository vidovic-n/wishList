import { Component } from '@angular/core';
import { Item } from '../item.model';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  purchasedItems: Item[] = [];

  constructor(private plt: Platform, private storageService: StorageService, private router: Router) {
    this.plt.ready().then(() => {
      this.loadItems();
      this.router.navigate(['/tabs/tab2']);
    });
  }


  loadItems() {
    this.storageService.getItems().then(( items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }

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
