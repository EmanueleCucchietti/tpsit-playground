class Observable<T> {
    constructor(public value: T){

    }
}

let x : Observable<number>;

let z = new Observable(32);