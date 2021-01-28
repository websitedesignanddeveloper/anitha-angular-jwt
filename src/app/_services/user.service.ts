import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    constructor(private http: HttpClient) {
     }

    getAll() {
        console.log("getAll is called ===> ",`${environment.apiUrl}/users`);
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    getSingleUser(id,apiKey){
        const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
        headers.append("Authorization","Bearer "+apiKey);
        console.log("userService : getSingleUser is called... ");
        return this.http.put(`${environment.apiUrl}/users/getSingleUser`, {"Id":id}, {headers});
    }
}