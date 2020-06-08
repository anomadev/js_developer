// decorador de propiedades
function Decorador(clsProto: any, prototypeName: string) {
  console.log('Soy un decorador en ejecución');
  clsProto.className =  clsProto.constructor.name;
  console.log(prototypeName);
}

// decorador de métodos & method factory
function Auditable(message: string) {
  return function(clsProto: any, methodName: string, descriptor ?: any) {
    let originalFunction = clsProto[methodName];

    let decoratedFunction = function() {
      originalFunction();
      console.log(message);
    }
  
    descriptor.value = decoratedFunction;
    return descriptor;
  }
  
}

class Speaker {
  @Decorador
  numero: number;

  @Auditable('oldN está obsoleto, hay que usar n')
  oldN() { console.log(10); }

  @Auditable('n fue ejecutada')
  n() { console.log(20); }
}

let speaker: Speaker = new Speaker;

// probando decoradores
console.log((speaker as any).className);
speaker.n();
speaker.oldN();
