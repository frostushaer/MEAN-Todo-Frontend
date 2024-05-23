import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private todoUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTodos() {
    return this.http.get<any[]>(`${this.todoUrl}/getAll`, { headers: this.getAuthHeaders() });
  }

  addTodo(todo: any) {
    return this.http.post<any>(`${this.todoUrl}/create`, todo, { headers: this.getAuthHeaders() });
  }

  toggleComplete(todoId: string) {
    return this.http.put<any>(`${this.todoUrl}/toggle/${todoId}`, { headers: this.getAuthHeaders() });
  }

  editTodo(todoId: string, newTodo: any) {
    return this.http.put<any>(`${this.todoUrl}/edit/${todoId}`, newTodo, { headers: this.getAuthHeaders() });
  }

  deleteTodo(todoId: string) {
    return this.http.delete<any>(`${this.todoUrl}/delete/${todoId}`, { headers: this.getAuthHeaders() });
  }
}
