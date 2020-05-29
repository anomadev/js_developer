function User() {}
User.prototype.saludar = function() {
  console.log("Hola");
}

function Admin() {}
Admin.prototype = new User();

let cristhofer = new Admin();
cristhofer.saludar();
