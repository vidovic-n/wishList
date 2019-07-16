import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService} from '../../services/storage.service';
import { Platform } from '@ionic/angular';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  items: Item[] = [];
  loadedItem  = new Item ('', '', '', '', '',  34, false);
  // loadedItem: Item = {} as Item;


constructor( private activatedRoute: ActivatedRoute, private router: Router,
             private storageService: StorageService, private plt: Platform) {
  this.plt.ready().then(() => {
    this.loadItems();
  });
}

ngOnInit() {

  this.activatedRoute.paramMap.subscribe(paramMap => {
    if (!paramMap.has('itemId')) {
      // redirect
      this.router.navigate(['/tabs/tab1']);
      return;
    }
    const itemId = paramMap.get('itemId');
    console.log('Item ID' + itemId);
    console.log(this.storageService.getItem(itemId));


    this.storageService.getItemForDetails(itemId).then(item => {
      this.loadedItem = item;
    } );
  });
}

loadItems() {
  this.storageService.getItems().then( items => {
    this.items = items;
  });
}
}
