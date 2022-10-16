import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { recipe } from 'src/models/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  
  id: any;
  recipeDetails: any;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id');
     console.log(this.id);
     this.getRecipeDetails();
  }

  getRecipeDetails() {
    this.recipeService.getSingleRecipe(this.id).subscribe((data: any) => {
      console.log(data.recipe);
      this.recipeDetails = data.recipe;
    })
  }

}
