import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faCircleQuestion, faEarthAsia, faAngleDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/cart/cart.reducer';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule, CartItemComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  public icons = {
    mailIcon: faEnvelope,
    helpIcon: faCircleQuestion,
    earthIcon: faEarthAsia,
    angleDownIcon: faAngleDown,
    heartIcon: faHeart,
    cartIcon: faCartShopping
  }

  public isShowProfile: boolean = false
  public isShowCart: boolean = false

  public cartItems$: Observable<any[]>;
  public cartLength$: Observable<number>;


  constructor(private userService: UserService, private toast: NgToastService, private router: Router, private store: Store<{ cart: CartState }>) {
    this.cartItems$ = this.store.select(state => state.cart.items);
    this.cartLength$ = this.store.select(state => state.cart.items.length);
  }

  public username = this.userService.getUsernameFromSessionStorage()
  public toggleShowProfile() {
    this.isShowProfile = !this.isShowProfile
  }

  public toggleShowCart() {
    this.isShowCart = !this.isShowCart
  }

  get currentPath(): string {
    return this.router.url;
  }

  public handleLogout() {
    this.userService.logout().subscribe({
      next: (res: any) => {
        this.userService.removeUserFromSessionStorage()
        window.location.href = "/"
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
