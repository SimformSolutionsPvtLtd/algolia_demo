import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';

const searchClient = algoliasearch(
  environment.algolia_secret,
  environment.algolia_key
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'algolia-poc';
  config = {
    indexName: 'news_items',
    searchClient,
    searchFunction(helper: any) {
      let optionalWords = [];
      if (helper.state.query.indexOf('OR') > 0) {
        optionalWords = helper.state.query.split('OR');
        optionalWords = optionalWords.map((element: any) => {
          return element.trim();
        });
      }
      if (helper.state.query.indexOf('or') > 0) {
        optionalWords = helper.state.query.split('or');
        optionalWords = optionalWords.map((element: any) => {
          return element.trim();
        });
      }
      helper
        .setQueryParameter('getRankingInfo', true)
        .setQueryParameter('optionalWords', optionalWords)
        .search();
    },
  };
}
