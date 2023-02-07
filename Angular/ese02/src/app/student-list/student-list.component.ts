import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  @ViewChild('txtName') _txtName: ElementRef = new ElementRef('');


  studentList: any[] = [
    { name: 'Pippo', city: 'Fossano', gender: 'M' },
    { name: 'Elena', city: 'Bra', gender: 'F' },
    { name: 'Minnie', city: 'Cuneo', gender: 'F' },
    { name: 'Pluto', city: 'Bra', gender: 'M' },
    { name: 'Mario', city: 'Fossano', gender: 'M' },
    { name: 'Paola', city: 'Fossano', gender: 'F' },
    { name: 'Maura', city: 'Bra', gender: 'F' },
    { name: 'Paolo', city: 'Cuneo', gender: 'M' },
    { name: 'Piero', city: 'Bra', gender: 'M' },
    { name: 'Francesca', city: 'Fossano', gender: 'F' },
  ];
  public studentName: string = '';
  public studentGender: string = 'M';
  public studentCity: string = '';
  public cities: string[] = ['Fossano', 'Bra', 'Cuneo'];

  onCreateStudent(){
    let newStudent = {
      name: this.studentName,
      city: this.studentCity,
      gender : this.studentGender,
      present: true
    }
  this.studentList.push(newStudent);
  this.studentName = '';
  this._txtName.nativeElement.focus();
  }

  onChangeCity(){
    console.log(this.studentCity);
  }

  onRemoveStudent(index: any){
    this.studentList.splice(index, 1);
  }
}
