import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from "../../../_providers/task.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  minDateValue = new Date();
  currentTask;
  updateTaskCycle = false;

  constructor(private taskP: TaskService) { }

  ngOnInit() {
    this.formInit();
    this.updateTaskCycle = false;
    this.changeEventSubscription();
  }

  formInit() {
    this.taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        description: new FormControl(''),
        category: new FormControl('', Validators.required),
        priority: new FormControl(50)
    });
  }

  changeEventSubscription() {
      this.taskP.taskChangeEvent.subscribe(task => {
         this.updateTaskCycle = true;
         this.currentTask = task;
         this.taskForm.setValue({
             title: task.title,
             date: task.deadline,
             description: task.description,
             category: task.category,
             priority: task.priority
         });
      });
  }

  onSubmit() {
      if (this.updateTaskCycle) {
          const task = this.taskForm.value;
          task.failed = this.currentTask.failed;
          task.done = this.currentTask.done;
          task._id = this.currentTask._id;
          this.taskP.updateTask(task).subscribe((eventTask) => {
              console.log(eventTask);
              this.taskP.taskUpdateEvent.next(eventTask);
          });
      } else {
          this.taskP.insertTask(this.taskForm.value).subscribe((result) => {
              this.taskForm.reset();
          });
      }
  }

  ngOnDestroy() {
      this.taskForm.reset();
  }
}
