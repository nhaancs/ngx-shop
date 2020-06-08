# NgxShop

A Food shop app built with Angular and Firebase. This project is for learning purpose only. Demo: [https://ngx-shop.web.app](https://ngx-shop.web.app)

This project is based on the final project of [The Complete Angular Course Beginner to Advanced](https://udemy.com/course/the-complete-angular-master-class) course with updated on features and libraries.

## Getting started

### 1. Clone this project to your local machine

- Run the command `git clone https://github.com/nhaancs/ngx-shop.git`

### 2. Setup Firebase configs, realtime database and authentication

- Create a Firebase project in [Firebase console](https://console.firebase.google.com/)
- Add a new web app for this project
- Inside the web app you will find the firebase configs. For example:
```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```
- Copy the config values to `src/environments/firebase-configs.sample.ts` file and rename this file to `firebase-configs.ts`
- In Firebase console, create a Realtime Database in test mode.
- In Firebase console, choose Authentication and enable Google provider so we can login with Google account in the app

### 3. Run the project

- Run the command `npm install`
- Then run `ng serve`
- Open the browser at `http://localhost:4200` and login with your Google account
- At this time you can browse arround the app as a normal user, but there are no data available yet 

### 4. Manually set admin role

- Go to the Realtime Database section in [Firebase console](https://console.firebase.google.com/)
- Under the node `users` will have 1 user that is the account that you just logged in. Under this user node, add the child node `isAdmin` with value `true`
- Now go back to the browser and you are now admin. You can add more categories, products and manage orders.

## Still have questions?

For any futher questions, just creat a new issue. Thank you.