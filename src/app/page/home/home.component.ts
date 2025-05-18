import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TodoService, UpdateTodoDto } from '../../service/todo.service';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../../service/data.service';
import {MatToolbarModule} from '@angular/material/toolbar';

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class HomeComponent implements OnInit {
  user: any;
  todos: Todo[] = [];
  newTodoTitle = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private data:DataService,
  ) {}

  ngOnInit(): void {
    
    this.user = localStorage.getItem('user');
    
    if(this.user == null){
      this.router.navigate(['/login']);
    }
    this.user = JSON.parse(this.user );
    
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos(this.user._id).subscribe({
      next: (todos) => {
        console.log('Loaded todos:', todos); // <-- This logs the response
        this.todos = todos;
      },
      error: (err) => console.error('Error loading todos:', err)
    });
  }

  createTodo() {
    if (!this.newTodoTitle.trim()) return;

    this.todoService.createTodo({
      title: this.newTodoTitle,
      userId: this.user._id
    }).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      },
      error: (err) => console.error('Error creating todo:', err)
    });
  }

  updateTodo(todo: Todo) {
  console.log(todo._id,  this.editedTitle)
    this.todoService.updateTodo(todo._id, {title : this.editedTitle}).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t._id === updatedTodo._id);
        if (index !== -1) this.todos[index] = updatedTodo;
        this.editingTodoId = null;
        this.loadTodos();
      },
      error: (err) => console.error('Error updating todo:', err)
    });
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId, this.user._id).subscribe({
      next: () => this.todos = this.todos.filter(t => t._id !== todoId),
      error: (err) => console.error('Error deleting todo:', err)
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  editingTodoId: string | null = null;
editedTitle: string = '';

startEdit(todo: any) {
  this.editingTodoId = todo._id;
  this.editedTitle = todo.title;
}

cancelEdit() {
  this.editingTodoId = null;
  this.editedTitle = '';
}

}
