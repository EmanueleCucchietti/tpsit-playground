import { Component, OnInit, VERSION } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    clicked = false;
    title = `Angular ${VERSION.full} is rad!`;

    boats = [
        {
            name: 'Starfire',
            year: 1977,
            img: 'assets/boat.jpg'
        },
        {
            name: 'Oracle',
            year: 1965,
            img: 'assets/boat2.jpg'
        }
    ]

    handleClick(){
        this.clicked = true;
    }
}
