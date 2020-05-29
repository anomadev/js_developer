class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name.charAt(0).toUpperCase() + this._name.slice(1);
  }

  set name(name) {
    this._name = name;
  }
}

let user = new User("cristhofer");
user.name = "gerardo";
console.log(user.name);
