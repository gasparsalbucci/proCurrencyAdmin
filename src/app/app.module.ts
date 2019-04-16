import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpMessageInterceptor } from "./shared/services/http-interceptor";
import { TaskManagerService } from "./shared/services/task-manager.service";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        TaskManagerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpMessageInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
