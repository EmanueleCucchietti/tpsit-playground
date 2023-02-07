import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  @Input() student: any;

  //student: any = {};

  constructor() {
    //let pos = this.generaNumero(0, this.studentList.length - 1);
    //this.student = this.studentList[pos];
  }

  ngOnInit(): void {
    let num = this.generaNumero(1, 2);
    this.student.present = num % 2 == 0;
  }

  ngOnClick() {
    this.student.present = !this.student.present;
  }

  getStyle(student:any){
    const color = student.gender == 'F'? 'pink':'cyan';
    return{
      "backgroundColor":color
    }
  }

  getClasses(student:any){
    return {
      "blink": !student.present
    }
  }

  generaNumero(a: number, b: number) {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }
}
