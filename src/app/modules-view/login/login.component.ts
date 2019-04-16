import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    loginForm: FormGroup;

    constructor(
      public _router: Router,
      private _formBuilder: FormBuilder
    ) {
        this.loginForm = this._formBuilder.group({
            email: [null, Validators.compose([Validators.required, Validators.email])],
            password: [null, Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {}

    get isFormValid() {
        return this.loginForm.valid;
    }

    onHandleLoginClick() {
        localStorage.setItem('tk', 'asd90989asdsa08908asdasf0808');
        this._router.navigate(['/dashboard']);
    }
}
