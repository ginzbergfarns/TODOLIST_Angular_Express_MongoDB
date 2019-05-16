import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../_providers/auth.service";
import {TaskService} from "../../../_providers/task.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  minDateValue = new Date();

  constructor(private taskP: TaskService) { }

  ngOnInit() {
    this.formInit();
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
  onSubmit() {
    this.taskP.insertTask(this.taskForm.value);
  }

}
