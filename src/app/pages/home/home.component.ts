import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardProductComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  public products: any[] = []

  public icons = {
    angleRightIcon: faAngleRight,
    angleLeftIcon: faAngleLeft,
  }

  constructor(private productService: ProductService) {
    register();
  }
  ngOnInit(): void {
    this.productService.getBestSale().subscribe({
      next: (data: any) => {
        this.products = data
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
