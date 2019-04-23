import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Users } from './users.model';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit {
    users : Array<Users> = [
        {
            firstName: 'Gaspar',
            lastName: 'Salbucci',
            email: 'gaspar@gaspar.com',
            telephone: '234234234232'
        },
        {
            firstName: 'Gustavo',
            lastName: 'García',
            email: 'gustavo@gaspar.com',
            telephone: '234834236232'
        }
    ];
    constructor() {}

    ngOnInit() {}
}