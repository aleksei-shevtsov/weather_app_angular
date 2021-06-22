import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(): {} {
    return {
      users: [
        {id: 1, login: 'test1', password: 'admin1'},
        {id: 2, login: 'test2', password: 'admin2'},
        {id: 3, login: 'test3', password: 'admin3'}
      ]
    }
  }
}
