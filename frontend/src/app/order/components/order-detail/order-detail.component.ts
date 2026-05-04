import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<div class="order-detail"><h2>Order Details</h2></div>`
})
export class OrderDetailComponent {}
