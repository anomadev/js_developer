class Speaker {
  hi(nombre: string) {
    console.log(nombre);
  }
}

let speaker: Speaker = new Speaker();
speaker.hi('Cristhofer');

// arreglos
let cursos: string[] = ["Javascript", "PHP", "Python", "Ruby"];

// funciones
function suma(v1: number, v2: number): number {
  return v1 + v2;
}

console.log(suma(2, 8));
