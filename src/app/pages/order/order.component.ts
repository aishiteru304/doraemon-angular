import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  public orders: any[] = []

  constructor(private orderService: OrderService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.orderService.getOrder().subscribe({
      next: (data: any) => {
        this.orders = data
        console.log(data)
      },
      error: (err) => {
        if (err?.status == 401) {
          this.userService.removeUserFromSessionStorage()
          window.location.href = "/"
        }
        console.log(err)
      }
    })
  }

  public displayedColumns: string[] = ["orderDetails", "name", "phone", "address", "status"];

}
