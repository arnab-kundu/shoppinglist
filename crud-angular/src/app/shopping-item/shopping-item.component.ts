import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {DataService} from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {

  shoppingItemList: Item[] = [];
  selectedItem: Item;
  toggleForm: boolean = false;

  getItems(): void {
    this.dataService.getShoppingItems().subscribe(items => {
      this.shoppingItemList = items;

      console.log('data from data service ' + this.shoppingItemList);
    });
  }

  addItem(form): void {
    console.log(form.value);
    const newItem: Item = {
      id: 0,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBrought: false
    };
    this.dataService.addShoppingItem(newItem)
      .subscribe(item => {
        // console.log(item);
        this.getItems();
      });
  }

  deleteItem(id): void {
    console.log(id);
    this.dataService.deleteShopping(id)
      .subscribe(data => {
        if (data.affectedRows === 1) {
          for (let i = 0; i < this.shoppingItemList.length; i++) {
            if (id === this.shoppingItemList[i].id) {
              this.shoppingItemList.splice(i, 1);
            }
          }
        }
      });
  }

  editItem(form): void {
    const newItem: Item = {
      id: this.selectedItem.id,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBrought: this.selectedItem.itemBrought
    };
    this.dataService.updateShoppingItem(newItem)
      .subscribe(result => {
        console.log('Original Item to be updated with old values: ' + result);
        this.getItems();
      });
    this.toggleForm = !this.toggleForm;
  }

  showEditForm(item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  updateItemCheckbox(item) {
    item.itemBrought = !item.itemBrought;
    this.dataService.updateShoppingItem(item)
      .subscribe(result => {
        console.log('Original checkbox values: ' + result.itemBrought);
        this.getItems();
      });
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getItems();
  }

}
