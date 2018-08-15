import { DatabaseOptionsPage } from './../database-options/database-options';
import { AlertController, PopoverController } from 'ionic-angular';
import { AuthService } from './../../services/auth';
import { RecipePage } from '../recipe/recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private recipesService: RecipesService,
     private popoverCtrl: PopoverController,
     private authService: AuthService,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(!data) {
          return;
        }
        if(data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if(list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  )
              }
            );
        } else if(data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  )
              }
            );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    this.alertCtrl.create({
      title: 'An error occured',
      message: errorMessage,
      buttons: ['Ok']
    }).present();
  } 

}
