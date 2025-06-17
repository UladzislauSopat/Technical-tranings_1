import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [MatInputModule, MatSlideToggleModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  public isOpen: boolean = false;

  openModal() {
    this.isOpen = true;
  }
}
