import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../store/cart/cart.reducer';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { resetCart } from '../../store/cart/cart.action';

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


  constructor(private fb: FormBuilder, private store: Store<{ cart: CartState }>,
    private userService: UserService, private orderService: OrderService,
    private router: Router
  ) {
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
    const { name, address, phone } = this.checkoutForm.value
    const orderDetails = this.cartItems.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      bookId: item.id
    }));
    this.orderService.createOrder({ name, address, phone, orderDetails }).subscribe({
      next: () => {
        this.userService.removeCartFromSessionStorate()
        this.store.dispatch(resetCart())
        this.router.navigate(["/order"]);
      },
      error: (err: any) => {
        if (err?.status == 401) {
          this.userService.removeUserFromSessionStorage()
          window.location.href = "/"
        }
        console.log(err)
      }
    })
  }
}
