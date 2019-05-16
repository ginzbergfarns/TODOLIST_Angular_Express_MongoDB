import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_providers/auth.service";
import {TaskService} from "../../_providers/task.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userName: string;
  tasks;

  constructor(private authP: AuthService,
              private taskP: TaskService) { }

  ngOnInit() {
    this.userName = this.authP.getUserName();
    this.taskP.fetchAll().subscribe((tasks) => {
      console.log(tasks);
      this.tasks = tasks;
    });
    this.taskP.taskAddedEvent.subscribe(task => {
      if (task.priority >= 70) {
        this.tasks.priorityTasks.push(task);
      } else {
        this.tasks.lowPriorityTasks.push(task);
      }
    });
  }

  categoryChange(category) {
    console.log(category);
  }

  drop(event) {
    console.log(event);
  }
}
