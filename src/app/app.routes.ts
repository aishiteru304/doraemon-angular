import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { privateGuard } from './guards/private.guard';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'cart', component: CartComponent, canActivate: [privateGuard] },
            { path: 'checkout', component: CheckoutComponent, canActivate: [privateGuard] },
        ],
    },
];
