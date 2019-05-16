import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../_providers/auth.service";
import {TaskService} from "../../_providers/task.service";
import {timer} from 'rxjs';

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
    this.fetchAllTask();
    this.newTaskSubscription();
    this.deleteTaskSubscription();
    this.changeTaskEventSubscription();
    this.updateTaskEvent();
  }

  newTaskSubscription() {
    this.taskP.taskAddedEvent.subscribe(task => {
      if (task.priority >= 70) {
        this.tasks.priorityTasks.push(task);
      } else {
        if (task.category === this.previousCategory || this.previousCategory === undefined) {
          this.tasks.lowPriorityTasks.push(task);
        }
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
    this.taskP.taskDeletedEvent.subscribe(id => {
      timer(1200).subscribe(() => {
        const updatepriorityTasks = [...this.tasks.priorityTasks];
        const updatedTasks = [...this.tasks.lowPriorityTasks];
        this.tasks.priorityTasks = updatepriorityTasks
            .filter(task => {
              return task._id !== id;
            });
        this.tasks.lowPriorityTasks = updatedTasks
            .filter(task => {
              return task._id !== id;
            });
      });
    });
  }

  updateTaskEvent() {
    this.taskP.taskUpdateEvent.subscribe((task) => {
      const updatePriorityTasks = [...this.tasks.priorityTasks];
      const updatedTasks = [...this.tasks.lowPriorityTasks];
      if (task.priority < 70) {
        const targetIndex = updatedTasks.findIndex(item => {
          return item._id === task._id;
        });
        updatedTasks[targetIndex] = task;
        this.tasks.lowPriorityTasks = updatedTasks;
      } else {
        const targetIndex = updatePriorityTasks.findIndex(item => {
          return item._id === task._id;
        });
        updatePriorityTasks[targetIndex] = task;
        this.tasks.priorityTasks = updatePriorityTasks;
      }
    });
  }

  changeTaskEventSubscription() {
    this.taskP.taskChangeEvent.subscribe(() => {
      this.sidenav.open();
    });
  }

  categoryChange(category) {
    if (category === undefined && this.previousCategory === undefined) {
      return
    } else if (category === undefined) {
      this.fetchAllTask();
    } else {
      this.taskP.filterByCategory(category).subscribe(tasks => {
        this.tasks.lowPriorityTasks = tasks;
      });
    }
    this.previousCategory = category;
  }

  drop(event) {
    console.log(event);
  }
}
