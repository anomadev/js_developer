function Curso(titulo) {
  this.titulo = titulo;
  this.inscribir = function(usuario) {
    console.log(usuario + " se ha inscrito");
  }
}

let cursoRuby = new Curso("Curso Profesional de Ruby");
let cursoPython = new Curso("Curso Profesional de Python");

console.log(cursoRuby.titulo);
console.log(cursoPython.titulo);
