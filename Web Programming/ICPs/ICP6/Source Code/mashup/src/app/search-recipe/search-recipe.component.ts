import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {

      this._http
        .get('https://api.edamam.com/search?q='+this.recipeValue+'&app_id=3668c7dd&app_key=a2096947ce3500e034d199cfba515bda')
        .subscribe(
          data=>this.recipeList=data.hits.slice( 0 ,4 ));
      /**
       * Write code to get recipe
       */
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this._http
        .get('https://api.foursquare.com/v2/venues/explore?client_id=NSLQLNWC44MJ5LRC3A0IAWSOUBQEJ13RG5TJG21RBNWDXARA&client_secret=KLDIDOU4TFUG51K25VRA5JYNY0TQJSKEBK4FBKJYTIHNWFUI&v=20180323&limit=6&ll=40.7243,-74.0018&query='+this.recipeValue+'&near='+this.placeValue)
        .subscribe(
          data=>this.venueList=data.response.groups[0].items);
    }
  }
}
