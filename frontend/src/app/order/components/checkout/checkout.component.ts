import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<div class="checkout"><h2>Checkout</h2></div>`
})
export class CheckoutComponent {}
