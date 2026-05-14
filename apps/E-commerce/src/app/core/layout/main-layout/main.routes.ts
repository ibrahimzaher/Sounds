import { Routes } from '@angular/router';
import { authGuard } from '@elevate/auth-data-access';
import { MainLayoutComponent } from './main-layout.component';
import type { SeoMeta } from '../../interfaces/seo-meta.interface';

const mainRouteSeo = {
  home: {
    title: 'Elevate Gifts | Flowers and Gift Boxes Online',
    description:
      'Discover elegant flowers, premium gift boxes, and curated surprises for birthdays, weddings, anniversaries, and every special moment.',
  },
  products: {
    title: 'Shop Flowers and Gifts | Elevate Gifts',
    description:
      'Browse Elevate products for flowers, gift boxes, and occasion-ready surprises with curated collections for the people you love.',
  },
  productDetails: {
    title: 'Product Details | Elevate Gifts',
    description:
      'View product details, images, reviews, and related gifts from Elevate before choosing the perfect surprise.',
  },
  categories: {
    title: 'Gift Categories | Elevate Gifts',
    description:
      'Explore Elevate gift categories to find flowers, premium gift boxes, and thoughtful surprises for every occasion.',
  },
  occasions: {
    title: 'Gifts by Occasion | Elevate Gifts',
    description:
      'Shop flowers and curated gifts by occasion, including birthdays, weddings, engagements, anniversaries, and romantic moments.',
  },
  contact: {
    title: 'Contact Elevate Gifts',
    description:
      'Contact Elevate Gifts for help with flower delivery, gift boxes, orders, and customer support.',
  },
  about: {
    title: 'About Elevate Gifts',
    description:
      'Learn about Elevate Gifts and our curated flowers, elegant gift boxes, reliable delivery, and thoughtful gifting experience.',
  },
} satisfies Record<string, SeoMeta>;

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        data: {
          seo: mainRouteSeo.home,
        },
        loadComponent: () =>
          import('../../../feature/home/home').then((m) => m.Home),
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            data: {
              seo: mainRouteSeo.products,
            },
            loadComponent: () =>
              import('../../../feature/products/products.component').then(
                (m) => m.ProductsComponent
              ),
          },
          {
            path: ':id',
            data: {
              seo: mainRouteSeo.productDetails,
            },
            loadComponent: () =>
              import('../../../feature/product-details/product.details').then(
                (m) => m.ProductDetailsComponent
              ),
          },
        ],
      },
      {
        path: 'categories',
        data: {
          seo: mainRouteSeo.categories,
        },
        loadComponent: () =>
          import('../../../feature/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'occasions',
        data: {
          seo: mainRouteSeo.occasions,
        },
        loadComponent: () =>
          import('../../../feature/occasions/occasions.component').then(
            (m) => m.OccasionsComponent
          ),
      },
      {
        path: 'shopping-cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../../../feature/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'wishlist',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../../../feature/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../feature/profile/profile.routes').then(
            (m) => m.profileRoutes
          ),
      },
      {
        path: 'allOrders',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../feature/orders/orders.routes').then(
            (m) => m.ordersRoutes
          ),
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../feature/checkout/checkout.routes').then(
            (m) => m.checkoutRoutes
          ),
      },
      {
        path: 'contact',
        data: {
          seo: mainRouteSeo.contact,
        },
        loadComponent: () =>
          import('../../../feature/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'about-us',
        data: {
          seo: mainRouteSeo.about,
        },
        loadComponent: () =>
          import('../../../feature/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
    ],
  },
];
