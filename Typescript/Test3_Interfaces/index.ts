interface User {
    first: string,
    last: string,
    [key: string]: any //permit to add any other keys (with string type) and assign to it any value
}
const person: User = {
    first: "2",
    last: "3"
}
const person2: User={
    first : "alberto",
    last : "3",
    age : 3
}