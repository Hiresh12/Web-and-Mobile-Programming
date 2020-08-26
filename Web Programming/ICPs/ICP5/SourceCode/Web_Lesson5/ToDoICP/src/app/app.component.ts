import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // define list of items
  items = ['check','add'];

  // Write code to push new item
  submitNewItem(s) {
    this.items.push(s);
  }

  // Write code to complete item
  completeItem() {

  }

  // Write code to delete item
  deleteItem(todo) {
    for ( let i = 0 ; i <= this.items.length ;i++){
      if (todo === this.items[i]){
         this.items.splice(i,1);
      }
    }
  }

}
