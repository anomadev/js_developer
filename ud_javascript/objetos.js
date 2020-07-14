const mascota = {
  nombre: 'Cerbero',
  edad: 5,
  vivo: true,
  caracteristicas: ['peludo', 'negro']
}

console.log(mascota);
console.log(mascota.nombre);
console.log(mascota.edad);
console.log(mascota.caracteristicas[1]);

// Agregar propiedades al objeto
mascota.id = 1;
console.log(mascota.id);

// Destructuring objects
const {edad, nombre} = mascota
console.log(edad);
console.log(nombre);

const web = {
  nombre: 'ecode',
  links: {
    enlance: 'www.ecode.mx'
  },
  redesSociales: {
    youtube: {
      enlace: 'youtube.com/ecodemx',
      nombre: 'ecodemx'
    },
    facebook: {
      enlace: 'facebook.com/ecodemx',
      nombre: 'ECodeMX'
    }
  }
}

const enlaceYT = web.redesSociales.youtube.enlace;
console.log(enlaceYT);

const {enlace, nombre} = web.redesSociales.facebook;
console.log(enlace);