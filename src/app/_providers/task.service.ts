import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = `/api/${this.authP.getUserId()}/`;

  taskAddedEvent = new EventEmitter<any>();
  taskDeletedEvent = new EventEmitter<any>();
  taskChangeEvent = new EventEmitter<any>();
  taskUpdateEvent = new EventEmitter<any>();

  constructor(private http: HttpClient,
              private authP: AuthService) { }

  fetchAll() {
    console.log(this.url);
    return this.http.get(this.url + 'get');
  }

  insertTask(task) {
    return this.http.post(this.url + 'add', task).pipe(map(savedTask => {
        console.log(savedTask);
        this.taskAddedEvent.next(savedTask);
      }
    ));
  }

  filterByCategory(tCategory) {
    return this.http.post(this.url + 'filter-by-category', {category: tCategory});
  }

  updateTask(task) {
    return this.http.post(this.url + 'update', task);
  }

  deleteById(id) {
    return this.http.post(this.url + `delete/${id}`, {}).pipe(map(() => {
      this.taskDeletedEvent.next(id);
    }));
  }
}
