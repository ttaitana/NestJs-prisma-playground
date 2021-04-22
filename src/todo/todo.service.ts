import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  todo_array: Todo[] = [];

  addTodo(title: string, subtitle: string) {
    console.log(`title: ${title}, subtitle: ${subtitle}`);

    const todo = new Todo();
    todo.id = uuidv4();
    todo.title = title;
    todo.subtitle = subtitle;

    this.todo_array.push(todo);
    return todo;
  }

  getTodo() {
    return this.todo_array;
  }

  deleteTodo(id: string) {
    console.log(id);

    const todo_item: Todo = this.todo_array.find((item) => item.id === id);
    if (!todo_item) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    this.todo_array = this.todo_array.filter((item) => item.id !== id);
    return this.todo_array;
  }
}
