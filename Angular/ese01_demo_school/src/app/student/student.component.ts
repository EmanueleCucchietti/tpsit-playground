import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  studentList = [
    {name: "John", city: "test", age: 20, gender: "M", present: true},
    {name: "t1", city: "test", age: 20, gender: "F", present: true},
    {name: "t2", city: "test", age: 20, gender: "M", present: false},
    {name: "54", city: "test", age: 20, gender: "F", present: true},
    {name: "t3", city: "test", age: 20, gender: "M", present: false},
    {name: "t12", city: "test", age: 20, gender: "M", present: true},
    
  ];

  // student : any = {};
  
  /**
   *
   */
  constructor() {
    // let pos = this.generaNumero(0, this.studentList.length - 1);
    // this.student = this.studentList[pos];
    // this.studentList[pos].present = false;
    
  }

  generaNumero(a : number, b : number) : number {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
}
