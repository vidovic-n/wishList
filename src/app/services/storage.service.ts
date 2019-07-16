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
    console.log('updateovani item nakon edita3');
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      // if (!items || items.length === 0) {
      //   console.log('updateovani item nakon edita7');
      //   return null;
      // }
       let newItems: Item[] = [];
       // newItem mi je bio prazan niz i storage sam setovala na njega
      // console.log('itemi za edit ' + JSON.stringify(items));
       if (! Array.isArray(items)) {
        items = [items];
      }
       for (let i of items) {
       console.log('updateovani item nakon edita6');
       if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
       console.log('updateovani item nakon edita4' + newItems);
      // items.push(newItem);
       return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  deleteItem(id: string) {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      if (! Array.isArray(items)) {
        items = [items];
      }

      this.items = this.items.filter(item => {
        if (item.id !== id) {
         return this.storage.set(ITEMS_KEY, items);
        }
      });
      // console.log('itemi za delete ' + JSON.stringify(items));
      // let toKeep: Item[] = [];

      // for (let i of items) {
      //   console.log('itemi za delete u for ' + JSON.stringify(i));
      //   if (i.id !== id) {
      //     toKeep.push(i);
      //     console.log('-------toKeep item-i koji nisu za brisanje--------- : ' + JSON.stringify(toKeep));
      //   }
      // }
      return this.storage.set(ITEMS_KEY, items);

    });
  }

}
