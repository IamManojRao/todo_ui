import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../page/home/home.component'; 

export interface CreateTodoDto {
  title: string;
  userId: string;
}

export interface UpdateTodoDto {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todos';
  private currentDataSubject = new BehaviorSubject<any>(null);
  currentData$ = this.currentDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCurrentUser(user: any) {
    this.currentDataSubject.next(user);
  }

  getTodos(userId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/user/${userId}`);
  }

  createTodo(data: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}`, data);
  }

  updateTodo(todoId: string, data: UpdateTodoDto): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todoId}`, data);
  }

  deleteTodo(todoId: string, userId: string): Observable<void> {
    return this.http.request<void>('delete', `${this.apiUrl}/${todoId}`, {
      body: { userId }
    });
  }
}
