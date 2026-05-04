import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<div class="product-manage"><h2>Product Management (Admin)</h2></div>`
})
export class ProductManageComponent {}
