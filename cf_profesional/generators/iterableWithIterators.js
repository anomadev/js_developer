let rango = {
  min: null,
  max: null,
  currentValue: null,

  [Symbol.iterator]() {
    return this;
  },

  next() {
    if (this.currentValue == null) this.currentValue = this.min;
    let result = {};

    if (this.currentValue >= this.min && this.currentValue <= this.max) {
      result = { value: this.currentValue, done: false };
      this.currentValue += 1;
    } else {
      result = { done: true };
    }
    return result;
  }
};

rango.min = 1;
rango.max = 10;
for (n of rango) { console.log(n) }
