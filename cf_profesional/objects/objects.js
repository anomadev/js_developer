let curso = {
  titulo: "Curso Profesional de Javascript",
  duracion: 2.2,
  formato: "video",
  bloques: ["Introducción", "Funciones", "Arreglos"],

  inscribir: function(usuario) {
    console.log(usuario + " ahora esta inscrito a " + this.titulo);
  }
}

console.log(curso.titulo);
console.log(curso.inscribir("Cristhofer"));

// reasignación de de propiedades y métodos
curso.titulo = "Curso Profesional de Vue";
console.log(curso.inscribir("Cristhofer"));

curso.inscribir = function() {};
console.log(curso.inscribir("Cristhofer"));
