import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgToastService } from 'ng-angular-popup';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/cart/cart.reducer';
import { addItem } from '../../store/cart/cart.action';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() product: any

  public icons = {
    heartIcon: faHeart,
    cartIcon: faCartShopping
  }
  public cartItems$: Observable<any[]>;


  constructor(private userService: UserService, private toast: NgToastService, private router: Router, private store: Store<{ cart: CartState }>) {
    this.cartItems$ = this.store.select(state => state.cart.items);
  }

  public username = this.userService.getUsernameFromSessionStorage()

  public handleAddToCart = () => {
    if (!this.username) {
      this.toast.danger("Please login");
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 500)
      return
    }

    // this.cartItems$.pipe(take(1)).subscribe(cartItems => {
    //   // Kiểm tra nếu product đã tồn tại trong cartItems
    //   const productExists = cartItems?.some(item => item.id === this.product.id);

    //   if (!productExists) {
    //     console.log("Product is not in cart. Adding...");
    //     this.store.dispatch(addItem({ item: this.product })); // Dispatch action thêm sản phẩm
    //     // Hàm lấy cart từ session và thêm product và bỏ lại vào session
    //   } else {
    //     this.toast.danger("Product already in cart");
    //   }
    // });

    // Lấy giỏ hàng hiện tại từ sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

    // Kiểm tra nếu sản phẩm đã tồn tại
    const productIndex = cart.findIndex((item: any) => item.id == this.product.id);
    if (productIndex !== -1) {
      // console.log('Product is already in the cart.');
      this.toast.danger("Product is already in the cart");
      return;
    }

    const cartItem = { ...this.product, quantity: 1 }

    // Thêm sản phẩm vào giỏ hàng
    cart.push(cartItem);

    // Lưu giỏ hàng vào sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // Dispatch action thêm sản phẩm
    this.store.dispatch(addItem({ item: cartItem }));

    this.toast.success("Product added to cart");
  }


}
