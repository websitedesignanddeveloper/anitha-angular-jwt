import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    public host: string = `${environment.apiUrl}`;
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<any[]>(this.host + '/users');
    }

    getSingleUser(id, apiKey) {
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + apiKey);
        console.log("userService : getSingleUser is called... ");
        return this.http.put(this.host + '/users/getSingleUser', { "Id": id }, { headers });
    }
    getAllFlowLineDim() {
        console.log("getAllFlowLineDim() is called ");
        return this.http.get<any[]>(this.host + '/users/getAllFlowLineDim');
    }

}