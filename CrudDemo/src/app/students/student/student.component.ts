// import { Component, OnInit } from '@angular/core';
// import {StudentService} from '../shared/student.service';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-student',
//   templateUrl: './student.component.html',
//   styleUrls: ['./student.component.css']
// })
// export class StudentComponent implements OnInit {

//   constructor(private studentService : StudentService) { }

//   ngOnInit() {
//     this.resetForm();
//   }
  
//   resetForm(form?: NgForm) {
//     if (form != null)
//       form.reset();
//     this.studentService.selectedStudent = {
//       Id: null,
//       Name: '',
//       FatherName: '',
//       Contact: '',
//       ProgramId: null,
//       Semester: ''
//     }
//   }
// onSubmit(std:NgForm){
//   this.studentService.postStudent(std.value)
//   .subscribe( data => {
//     this.resetForm(std);
//   })
// }
  
// }


import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { StudentService } from '../shared/student.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService,private toastr :ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.studentService.selectedStudent = {
      Id: null,
      Name: '',
      FatherName: '',
      Contact: '',
      ProgramId: null,
      Semester: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.Id == null) {
      this.studentService.postStudent(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.studentService.getStudentList();
          this.toastr.success('New Record Added','Student Register');
        })
    }
    else {
      this.studentService.putStudent(form.value.Id, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.studentService.getStudentList();
        this.toastr.info('Record Updated','Student Register');
      });
    }
  }
}
