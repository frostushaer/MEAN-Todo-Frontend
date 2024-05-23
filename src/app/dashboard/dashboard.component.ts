import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any;
  todos: any[] = [];
  newTodoTitle: string = '';

  constructor( public authService: AuthService, public dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.user = this.authService.getDecodedAccessToken();
    this.getTodos();
  }

  getTodos(): void {
    this.dashboardService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.dashboardService.addTodo({ title: this.newTodoTitle }).subscribe(() => {
        this.getTodos();
        this.newTodoTitle = '';
      });
    }
  }

  toggleComplete(todoId: string): void {
    // console.log(todoId);
    
    this.dashboardService.toggleComplete(todoId).subscribe(() => {
      this.getTodos();
    });
  }

  editTodo(todoId: string, newTitle: string): void {
    this.dashboardService.editTodo(todoId, { title: newTitle }).subscribe(() => {
      this.getTodos();
    });
  }

  deleteTodo(todoId: string): void {
    this.dashboardService.deleteTodo(todoId).subscribe(() => {
      this.getTodos();
    });
  }
}
