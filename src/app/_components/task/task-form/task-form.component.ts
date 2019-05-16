import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../../_providers/task.service';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  minDateValue = new Date();
  currentTask;

  @Input() sideNav: MatSidenav;
  constructor(private taskP: TaskService) { }

  ngOnInit() {
    this.formInit();
    this.initEvents();
  }

  initEvents() {
    this.editFormEventSubscription();
    this.navCloseEventSubscription();
  }

  formInit() {
    this.taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
        deadline: new FormControl('', Validators.required),
        description: new FormControl(''),
        category: new FormControl('', Validators.required),
        priority: new FormControl(50)
    });
  }

  editFormEventSubscription() {
    this.taskP.formEditEvent.subscribe(task => {
      this.currentTask = task;
      this.taskForm.setValue({
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        category: task.category,
        priority: task.priority
      });
    });
  }

  navCloseEventSubscription() {
    this.sideNav.closedStart.subscribe(() => {
        this.formReset();
    });
  }

  onSubmit() {
      if (this.currentTask) {
          const task = this.taskForm.value;
          task.failed = this.currentTask.failed;
          task.done = this.currentTask.done;
          task._id = this.currentTask._id;
          this.taskP.updateTask(task).subscribe(() => {
              this.formReset();
              this.taskP.updateEvent.next(task);
          });
      } else {
          this.taskP.insertTask(this.taskForm.value).subscribe((result) => {
              this.formReset();
          });
      }
  }

  formReset() {
    this.currentTask = null;
    this.taskForm.reset();
  }

  ngOnDestroy() {
      this.formReset();
  }
}
