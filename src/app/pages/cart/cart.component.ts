import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../store/cart/cart.reducer';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { removeItem } from '../../store/cart/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTableModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {
  public cartLength$: Observable<number>;
  public cartItems: any[];

  constructor(private store: Store<{ cart: CartState }>, private userService: UserService) {
    this.cartLength$ = this.store.select(state => state.cart.items.length);
    this.cartItems = this.userService.getCartFromSessionStorate()
  }
  public displayedColumns: string[] = ['image', 'name', "price", "quantity", "amount", "action"];


  public onQuantityChange(element: any): void {
    if (element.quantity < 1) {
      element.quantity = 1;
    }

    // Tính lại thành tiền khi số lượng thay đổi
    element.amount = element.price * element.quantity;
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  protected totalPrice = () => {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  protected handleDelete = (element: any) => {
    this.cartItems = this.cartItems.filter(item => item.id !== element.id);
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.store.dispatch(removeItem({ id: element.id }));
  }
}
