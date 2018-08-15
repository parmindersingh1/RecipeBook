import { DatabaseOptionsPage } from './../pages/database-options/database-options';
import { AuthService } from '../services/auth';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { RecipesService } from '../services/recipes';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipesPage } from '../pages/recipes/recipes';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { ShoppingListService } from '../services/shopping-list';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
