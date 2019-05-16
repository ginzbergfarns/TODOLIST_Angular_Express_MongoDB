import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../_providers/auth.service';
import {TaskService} from '../../_providers/task.service';
import {timer} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userName: string;
  tasks;
  previousCategory;

  @ViewChild('drawer') sidenav;

  constructor(private authP: AuthService,
              private taskP: TaskService) { }

  ngOnInit() {
    this.userName = this.authP.getUserName();
    this.initEvents();
    this.fetchAllTask();
  }

  initEvents() {
    this.newTaskSubscription();
    this.deleteTaskSubscription();
    this.changeTaskEventSubscription();
    this.updateTaskEvent();
  }

  newTaskSubscription() {
    this.taskP.addEvent.subscribe(task => {
      if (task.category === this.previousCategory || this.previousCategory === undefined) {
        this.tasks.push(task);
        this.tasks.sort((a, b) => {
          return b.priority - a.priority;
        });
      }
      this.sidenav.close();
    });
  }

  fetchAllTask() {
    this.taskP.fetchAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTaskSubscription() {
    this.taskP.deletedEvent.subscribe(id => {
      timer(1200).subscribe(() => {
        const updatedTasks = [...this.tasks];
        this.tasks = updatedTasks
          .filter(task => {
            return task._id !== id;
          });
      });
    });
  }

  updateTaskEvent() {
    this.taskP.updateEvent.subscribe((task) => {
      const targetIndex = this.tasks.findIndex(item => {
        return item._id === task._id;
      });
      this.tasks[targetIndex] = task;
    });
  }

  changeTaskEventSubscription() {
    this.taskP.formEditEvent.subscribe(() => {
      this.sidenav.open();
    });
  }

  categoryChange(category) {
    if (category === undefined && this.previousCategory === undefined) {
      return;
    } else {
      this.taskP.filterByCategory(category).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
    this.previousCategory = category;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
