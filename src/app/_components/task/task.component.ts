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
    if (!this.taskData.done && !this.failed) {
      this.taskData.failed = true;
      this.failed = true;
      this.update();
    }
  }

  markAsDone() {
    this.taskData.deadline = 0;
    this.taskData.done = true;
    this.update();
  }

  update() {
    this.taskP.updateTask(this.taskData).subscribe((result) => {
      console.log(result);
    });
  }

  changeTask(task) {
    this.taskP.taskChangeEvent.next(task);
  }

  delete() {
    this.deleted = true;
    this.taskP.deleteById(this.taskData._id).subscribe((result) => {
      console.log(result);
    });
  }

}
