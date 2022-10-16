import { Component, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { recipe } from 'src/models/recipe.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgForm } from '@angular/forms';
import { hits } from 'src/models/hits.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeFilterForm: FormGroup;
  Data: Array<any> = [
    {name: 'Vegan', value: 'Vegan'},
    {name: 'Balanced', value: 'Balanced'},
    {name: 'Low-Carb', value: 'Low-Carb'},
    {name: 'Immunity', value: 'Immunity'},
  ]
  currentId: string = '';
  categoricalData: any = [];
  allRecipesData: any = [];
  clear: boolean = false;
  category: string = '';
  checkArray!: FormArray;

  constructor(private recipeService: RecipeService, private fb: FormBuilder, public router: Router) { 
    this.category = 'chicken';
    this.recipeFilterForm = this.fb.group({
      dietLabelArray: this.fb.array([], [Validators.required]), 
      from: [0 , Validators.required],
      to: [2000, Validators.required],
      ingredients: [10, Validators.required],
    })
  }

  

  ngOnInit(): void {
    this.getAllRecipes();
  }
  public getAllRecipes() {
    this.recipeService.getRecipes().subscribe((data: any) => {
      console.log(data);
      this.categoricalData = data;
    });
  }

  public findByCategory(category: string) {
    this.recipeService.getByCategory(category).subscribe((data: any)=> {
      console.log(data);
      this.categoricalData = data;
    })
  }

  public onDietLabelChange(e: any) {
    this.checkArray = this.recipeFilterForm.get('dietLabelArray') as FormArray;
    if(e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    }
    else {
      let i=0;
      this.checkArray.controls.forEach((item: any) => {
        if(item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      })
    }
    // if(this.clear) {
    //   let i=0;
    // this.checkArray.controls.forEach((element: any) => {
    //   element.checked = false;
    //   i++;
    // })
    // }
  }
  get f() {
    return this.recipeFilterForm.controls;
  }
  public onSubmitDietForm() {
    console.log(this.f.from.value)
    console.log(this.recipeFilterForm.value.dietLabelArray);
    if(this.recipeFilterForm.invalid) return;
    let array: Array<hits> = this.categoricalData.hits;
    let filteredRecipes: hits[] = [];
    array.filter((element: any) => {
      console.log(element);
      if(this.f.from.value <= element.recipe.calories && element.recipe.calories <= this.f.to.value && element.recipe.ingredients.length <= this.f.ingredients.value){
        if((this.recipeFilterForm.value.dietLabelArray).some((item: any) => (element.recipe.dietLabels).includes(item))) {
          filteredRecipes.push(element);
        }
      }
      
    });
    this.categoricalData.hits = filteredRecipes;
    
    console.log(this.categoricalData);
    console.log(filteredRecipes);
  }

  public unCheckAll() {
    this.clear = true;
    let i = 0;
    this.checkArray.controls.forEach((element: any) => {
      element.checked = false;
      i++;
    })
    this.recipeFilterForm.reset();
    this.getAllRecipes();
  }

  public openRecipeDetails(id: string) {
    this.router.navigate(['/api/recipe', id]);
  }
}
