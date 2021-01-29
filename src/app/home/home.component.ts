import { Component } from '@angular/core';
// import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',styleUrls:['./home.component.scss'] })
export class HomeComponent {
    loading = false;
    users: User[];
    flowLineDimensions:any;
    constructor(private userService: UserService) { }
    ngOnInit() {
        this.loading = true;
        this.getAll();
        this.getAllFlowLineDim();
    }
    getAll() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }
    getAllFlowLineDim() {
        this.userService.getAllFlowLineDim().subscribe((result) => {
            this.flowLineDimensions = result[0];
            this.loading = false;
            console.log("getAllFlowLineDim result => ",this.flowLineDimensions);
        }, (err) => {
            console.log("Something went wrong!", err);
        })
    }
}