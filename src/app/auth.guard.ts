import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService: SellerService = inject(SellerService);

  let seller = localStorage.getItem('seller');
  if (seller) {
    return true;
  }

  return sellerService.isSellerLoggedIn;
};
