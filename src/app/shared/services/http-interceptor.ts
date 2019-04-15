import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { TaskManagerService } from "./task-manager.service";
// import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class HttpMessageInterceptor implements HttpInterceptor {
    router;
    constructor(private taskManager: TaskManagerService, private injector: Injector) {
        // Fix for ciclyc dependency
        setTimeout(() => {
            this.router = injector.get(Router);
        });

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let taskId = 'generic';
        if (!req.headers.get('task_name')) {
            console.log("PLEASE ADD A TASK NAME FOR THE REQUEST");
            req.headers.append("task_name", 'generic');
        } else {
            taskId = req.headers.get('task_name');
        }
        let Headers = req.headers.append("Content-Type", 'application/json').append("Accept", 'application/json');
        if(localStorage.getItem('tk')) {
            Headers = new HttpHeaders({ 'x-authorization': 'Bearer ' + localStorage.getItem('tk') });
        }
        
        const changedReq = req.clone({ headers: Headers });
        const currentTask = { id: taskId, status: 1, loading: true };
        this.taskManager.addTask(currentTask);


        return next.handle(changedReq).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this._handleSuccessResponse(event, taskId);
                    }
                }, 
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this._handleErrorResponse(err, taskId);
                    }
                }
            )
        )
    }

    _handleErrorResponse(error: any, taskId: string) {
        this.taskManager.removeTask(taskId);
        let errorMessage;
        let errorTitle;
        switch (error.status) {
            case 401:
                errorMessage = 'No estas autorizado';
                errorTitle = "Hubo un inconveniente";
                this.router.navigate(['login']);
            break;
            case 404:
                errorMessage = error.message;
                errorTitle = "No se encontro el metodo";
            break;
            case 500:
                errorMessage = error.message;
                errorTitle = "Error Inesperado";
            break;
        }
        
        //this.toasterService.pop('error', errorTitle, errorMessage);
    }

    _handleSuccessResponse(response: any, taskId: string) {
        let resp = response.body;
        let task = this.taskManager.getTask(taskId);
        task.loading = false;
        this.taskManager.updateTask(taskId, task);
        this.taskManager.removeTask(taskId);
        

        if(resp.status) {
            localStorage.setItem('tk', resp.token);
            return resp;
        } else {
            //this.toasterService.pop('error', 'Upss', resp.message);
        }
    }
}