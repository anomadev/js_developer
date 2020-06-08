var Speaker = /** @class */ (function () {
    function Speaker() {
    }
    Speaker.prototype.hi = function (nombre) {
        console.log(nombre);
    };
    return Speaker;
}());
var speaker = new Speaker();
speaker.hi('Cristhofer');
// arreglos
var cursos = ["Javascript", "PHP", "Python", "Ruby"];
// funciones
function suma(v1, v2) {
    return v1 + v2;
}
console.log(suma(2, 8));
