import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';

@Injectable()
export class TaskManagerService {

    taskList: Array<Task> = [];
    private taskChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public taskChangeEmitter: Observable<boolean> = this.taskChange.asObservable();
   
    addTask(task: Task) {
        const taskIndex = this.taskList.findIndex((existingTask) => existingTask.id === task.id);
        if (taskIndex === -1) {
            task.count = 1;
            this.taskList.push(task);
        } else {
            this.taskList[taskIndex].count++;
        }
        this.taskChange.next(true);
    }

    updateTask(id: string, task:Task) {
        const taskIndex = this.taskList.findIndex((existingTask) => existingTask.id === id);
        this.taskList[taskIndex] = task;
        this.taskChange.next(true);
    }

    removeTask(id: string) {
        const taskIndex = this.taskList.findIndex((existingTask) => existingTask.id === id);
        this.taskList[taskIndex].count--;
        if (this.taskList[taskIndex].count === 0) {
            this.taskList.splice(taskIndex, 1);
        }
        this.taskChange.next(false);
    }

    getTask(id:string): Task | null {
        const taskIndex = this.taskList.findIndex((existingTask) => existingTask.id === id);
        if (taskIndex != -1) {
            return this.taskList[taskIndex];
        } else {
            return null;
        }
    }
}