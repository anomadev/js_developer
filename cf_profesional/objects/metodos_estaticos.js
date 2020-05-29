class Usuario {
  constructor(permisos = "lectura") {
    this.permisos = permisos;
  }

  static createAdmin() {
    let usuario = new Usuario("Administrador");
    return usuario;
  }
}

let administrador = Usuario.createAdmin();
