class User {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log("Hola " + this.name);
  }
}

class Admin extends User {
  constructor(name) {
    super(name);
  }

  hello() {
    super.hello();
    console.log("Aquí esta el panel de administración");
  }
}

let admin = new Admin("Cristhofer");
admin.hello();
