import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  menuType: string = 'default';
  sellerName: string = '';

  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        let storedSeller = localStorage.getItem('seller');
        if (storedSeller && value.url.includes('seller')) {
          let seller: User = JSON.parse(storedSeller)[0];
          this.sellerName = seller.username;
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
}
