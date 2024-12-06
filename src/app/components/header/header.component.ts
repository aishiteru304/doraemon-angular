import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faCircleQuestion, faEarthAsia, faAngleDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
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

  constructor(private userService: UserService, private toast: NgToastService) { }

  public username = this.userService.getUsernameFromSessionStorage()
  public cartItems = this.userService.getCartFromSessionStorate()
  public toggleShowProfile() {
    this.isShowProfile = !this.isShowProfile
  }

  public toggleShowCart() {
    this.isShowCart = !this.isShowCart
  }

  public handleLogout() {
    this.userService.logout().subscribe({
      next: (res: any) => {
        this.toast.success(res?.message)
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
