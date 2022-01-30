window.onload = function () {
    let userList = [];
    let names = [
        {"first": "fa", "last":"la"}, 
        {"first": "fb", "last":"lb"}, 
        {"first": "fb", "last":"lb"},
    ];
    class User {
        Id;
        Name; //{first, last}
        Username;
        Age;
        //private properties
        #Money;

        constructor(id, name, username, age, money = 0) {
            this.Id = "user-" + id;
            this.Name = name;
            this.Username = username;
            this.Age = age;
            this.#Money = money;
        }
        getMoney() {
            return this.#Money;
        }
        setMoney(money) {
            this.#Money = money;
        }
        addMoney(money) {
            this.#Money += money;
        }
        getFirstName(){
            return this.name.first;
        }
    }

    for (const [i, name] of names.entries()) {
        userList.push(new User(i, name, "tes", generaNumero(20, 70), generaNumero(1000, 50000)));
    }
    for (const user of userList) {
        console.log(user)
        console.log("Money Utente: " + user.Id + " - " + user.Username + " - " + user.getMoney());
    }
    //azzera conti Correnti
    for (const user of userList) {
        user.setMoney(0);
        console.log("Money Utente: " + user.Id + " - " + user.Username + " - " + user.getMoney());
    }
    //randomizza Conti Correnti con Add Money
    for (const user of userList) {
        user.addMoney(generaNumero(1000, 50000));
        console.log("Money Utente: " + user.Id + " - " + user.Username + " - " + user.getMoney());
    }
    //stampa all first namse
    for (const user of userList) {
        console.log("First Name: " + user.Name.first);
    }
    function generaNumero(a, b) {
        //estremi inlcusi
        return Math.floor((b - a + 1) * Math.random()) + a;
    }
}