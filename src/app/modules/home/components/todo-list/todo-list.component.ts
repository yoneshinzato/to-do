import { Component, OnInit, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]')

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.setLocalStorage()
  }

  deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1)
  }

  deleteAllTaskList() {
    const confirm = window.confirm("Você deseja realmente deletar tudo?")
    if(confirm) {
      this.taskList = []
    }
  }

  setEmitTaskList(event: string) {
    this.taskList.push({task: event, checked: false})
  }

  validationInput(event: string, index: number) {
    if(!event.length) {
      const confirm = window.confirm("Task está vazia! Deseja deletar?")

      if(confirm) {
        this.deleteItemTaskList(index)
      }
    }
  }

  setLocalStorage() {
    if(this.taskList) {
      this.taskList.sort( (a, b) => Number(a.checked) - Number(b.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
    }
  }

}
