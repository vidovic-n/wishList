import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ItemDetailsPage } from '../tab1/item-details/item-details.page';
import { Item } from '../item.model';
import { Router } from '@angular/router';


// export interface Item {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   category: string;
//   price: number;
// }


const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


// dodala sam =[]
  private items: Item[] = [];

  constructor(private storage: Storage, private router: Router) { }

  addItem(item: Item) {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);

      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });


  }

  getItems() {
    return this.storage.get(ITEMS_KEY);
  }

  getItemForDetails(itemId: string) {

      return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
        if (!items || items.length === 0) {
          return null;
        }
        let oneItem: Item ;
        for (let i of items) {
          if (i.id === itemId) {
            oneItem = i;
          }
        }
        return this.storage.set(ITEMS_KEY, oneItem);
      });
  }

  getItem(itemId: string) {
  //   return {
  //     ...this.storage.get(ITEMS_KEY).then(item => {
  //       if(item.id == itemId){
  //     return item = {} as Item;
  //       }
  //   })
  // };

  return this.storage.get(ITEMS_KEY).then(item => {
    if (item.id === itemId) {
      return item;
    }
    return this.storage.set(ITEMS_KEY, item);
  });

      // return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      //   if (!items || items.length === 0) {
      //     return null;
      //   }
      //   let oneItem: Item ;
      //   for (let i of items) {
      //     if (i.id === itemId) {
      //       oneItem = i;
      //     }
      //   }
      //   return this.storage.set(ITEMS_KEY, oneItem);
      // });
      
 }

  updateItem(item: Item) {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: Item[] = [];

      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
          console.log('updateovani item nakon edita' + newItems);
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  deleteItem(id: string) {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: Item[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);

    });
  }

}
