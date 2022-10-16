import { Action } from '@ngrx/store';
import { recipe } from '../recipe.model'

export enum RecipeActionType {
  ADD_ITEM = '[RECIPE] Add RECIPE',
}

export class AddRecipeAction implements Action {

  readonly type = RecipeActionType.ADD_ITEM;
  constructor(public payload: recipe) {}

}

export type RecipeAction = AddRecipeAction;