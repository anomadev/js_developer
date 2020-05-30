let iterator = {
  currentValue: 1,
  next() {
    let result = { value: null, done: false };

    if(this.currentValue > 0 && this.currentValue <= 5) {
      result = { value: this.currentValue, done: false };
      this.currentValue += 1;
    } else {
      result = { done: true };
    }
  }
};

let item = iterator.next();
while(!item.done) {
  console.log(item.value);
  item = iterator.next();
}
