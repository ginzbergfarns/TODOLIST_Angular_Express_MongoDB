import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../_providers/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  date = new Date();
  failed = false;
  done = false;
  deleted = false;
  tasks;

  @Input() taskData;
  constructor(private taskP: TaskService) { }

  ngOnInit() {
    this.done = this.taskData.done;
    this.failed = this.taskData.failed;
  }

  markAsFailed() {
    this.failed = true;
  }

  markAsDone() {
    this.done = true;
    console.log(this.done);
  }

  delete() {
    this.deleted = true;
  }

}
