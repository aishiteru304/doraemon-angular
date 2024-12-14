import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../store/cart/cart.reducer';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public cartLength$: Observable<number>;
  public cartItems: any[];
  public checkoutForm: FormGroup;


  constructor(private fb: FormBuilder, private store: Store<{ cart: CartState }>, private userService: UserService) {
    this.cartLength$ = this.store.select(state => state.cart.items.length);
    this.cartItems = this.userService.getCartFromSessionStorate()
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
  public displayedColumns: string[] = ['name', "price", "quantity"];


  protected totalPrice = () => {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  protected handleCheckout = () => {
    console.log(this.checkoutForm.value)
  }
}
