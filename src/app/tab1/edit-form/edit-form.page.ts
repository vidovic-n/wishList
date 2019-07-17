import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Platform, ToastController } from '@ionic/angular';
import { Item } from 'src/app/item.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.page.html',
  styleUrls: ['./edit-form.page.scss'],
})
export class EditFormPage implements OnInit {

  itemForEdit: Item = {} as Item;
  items: Item[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemId')) {
        this.router.navigate(['/tabs/tab1']);
        return;
      }
      const itemId = paramMap.get('itemId');

      // console.log(this.storageService.getItem(itemId));
      this.storageService.getItem(itemId).then(item => {
        this.itemForEdit = item;
        console.log('ITEM  ' + item);
        console.log('Item ID za EDIT ' + itemId);
        console.log('title itema za edit' + this.itemForEdit.title);
      });
    });
  }

  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  updateItem(item: Item) {
    // tslint:disable-next-line: variable-name
    this.storageService.updateItem(item).then(_item => {
      this.showToast('Item updated!');
      this.loadItems();
      this.router.navigate(['/tabs/tab1']); // ovde sam izbrisala /item-details
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
