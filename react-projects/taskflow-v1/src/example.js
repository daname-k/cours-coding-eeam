function add(a, b){
    return a() + b
}


function get_a(){
    return 10
}

const sum = (x, y) => x + y 

const result = add(get_a, 5)


console.log("Resultat = " + result)

console.log(sum(70, 15))