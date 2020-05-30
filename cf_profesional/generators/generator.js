function* counter() {
  for(var i = 1; i <= 5; i++) {
    yield i;
  }
}

let generator = counter();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
