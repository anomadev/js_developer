class Curso {
  constructor(titulo) {
    this.titulo = titulo;
  }

  inscribir(usuario) {
    console.log(usuario + " se ha inscrito");
  }
}

let cursoTS = new Curso("Curso Profesional TypeScript");
console.log(cursoTS.titulo);
cursoTS.inscribir("Cristhofer");
