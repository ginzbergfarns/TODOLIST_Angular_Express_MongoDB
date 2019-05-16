import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../_providers/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  failed = false;
  done = false;
  deleted = false;

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
    });
  }

  changeTask(task) {
    this.taskP.formEditEvent.next(task);
  }

  delete() {
    this.taskP.deleteById(this.taskData._id).subscribe((result) => {
      this.deleted = true;
    });
  }

}
