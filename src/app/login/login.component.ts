import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService:UserService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        console.log("onSubmit => username : ", this.f.username.value,' , password : ', this.f.password.value);
        this.authenticationService.login(this.f.username.value,this.f.password.value)
            .subscribe((result)=>{
                console.log("RESULT SUBSCRIBRIED => ", result, " => this.returnUrl : ", this.returnUrl);
               // this.getSingleUser();
                this.router.navigate([this.returnUrl]);
                
            },err=>{
                console.log("Err login comp => ", err);
                this.error = err;
                this.loading = false;
            })

    }

    getSingleUser(){
        // https://apps.prci.org/v1/user/{userid}	
        console.log("get single user is called ..... ");

        this.userService.getSingleUser(1,'apikey').subscribe((result)=>{
            console.log("RESULT getSingleUser => ", result);
        },err=>{
            console.log("Err from getSingleUser Api => ", err);
        })

    }

}
