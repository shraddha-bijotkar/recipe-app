import {Ingredients} from './ingredients.model';

export class recipe{
    public uri!: String;
    public label!: String;
    public image!: String;
    public yield!: number;
    public ingredients: Ingredients = new Ingredients();
    public dietLabels!: [];
    public calories!: number;    
}