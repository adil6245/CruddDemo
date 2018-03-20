import { Component, OnInit } from '@angular/core';
import {StudentService} from '../shared/student.service';
import {Student} from '../shared/student.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService : StudentService,private toastr:ToastrService) { }

  ngOnInit() {
    this.studentService.getStudentList();
  }

  showForEdit(std: Student) {
    this.studentService.selectedStudent = Object.assign({}, std);;
  }


  onDelete(id: number) {
     
      this.studentService.deleteStudent(id)
      .subscribe(x => {
        this.studentService.getStudentList();
        this.toastr.warning("Deleted Record");
    });
  }

}
