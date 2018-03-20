import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Student} from'./Student.model'

@Injectable()
export class StudentService {

  selectedStudent : Student;
  studentList : Student[];
  constructor(private http : Http) { }
  postStudent(std : Student){
    var body = JSON.stringify(std);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:65409/api/Students',body,requestOptions).map(x => x.json());
  }


  putStudent(id, std) {
    var body = JSON.stringify(std);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:65409/api/Students/' + id,
      body,
      requestOptions).map(res => res.json());
  }

  getStudentList(){
    console.log("Hitting api");
    this.http.get('http://localhost:65409/api/Students')
    .map((data : Response) =>{
      return data.json() as Student[];
    }).toPromise().then(x => {
      this.studentList = x;
    })
  }
  deleteStudent(id: number) {
    return this.http.delete('http://localhost:65409/api/Students/' + id).map(res => res.json());
  }



}
