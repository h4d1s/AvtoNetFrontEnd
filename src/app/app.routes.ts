import { Routes } from '@angular/router';
import { ListingListComponent } from './components/listing-list/listing-list.component';
import { ListingComponent } from './components/listing/listing.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListingAddComponent } from './components/listing-add/listing-add.component';
import { ListingEditComponent } from './components/listing-edit/listing-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { path: '', component: SearchFiltersComponent, pathMatch: 'full' },
    { path: 'search-filters', component: SearchFiltersComponent },
    { path: 'listings', component: ListingListComponent },
    { path: 'listing-add', component: ListingAddComponent },
    { path: 'listing-edit/:id', component: ListingEditComponent },
    { path: 'listings/:id', component: ListingComponent },
    { path: 'users', component: UserListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];