# Angular 4 Login

This simple application demonstrate Login functionality in Angular 4. Functionalities included :

* Login page
* Authentication service to login and fetch profile
* App-wide components communication
* Protected routes using `canActivate`

Added features :

* Register page
* Mapping laravel validation errors to form fields

## Backend not included

The backend was created using Laravel 5.4 and Dingo API package. If login fails, it will return a 401 with error message, otherwise it will return a valid token that will be used to fetch protected endpoints - like `/profile`.

Backend not included. I may create a separate repo for the backend in the future