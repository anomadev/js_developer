/**
 *
 * Los documentos no estan limitas a almacenar strings, enteros, etc, los
 * documentos pueden almacenar listas u otros documentos.
 *
 * a) agregar una lista de cursos a los usuarios determinados
 * b) obtener el usuario que posea los cursos que enviamos en una lista
 */

db.users.updateOne(
	{ name: 'Rick Sanchez' },
	{
		$set: { courses: ['Python', 'PHP', 'JavaScript', 'Ruby'] }
	}
)


db.users.updateOne(
	{ name: 'Anomadev' },
	{
		$set: { courses: ['Vagrant', 'Docker', 'Jenkins', 'Terraform'] }
	}
)

// el método findOne busca mediante una lista exacta
db.users.findOne({ courses: ['Vagrat', 'Docker', 'Jenkins', 'Terraform'] })

/**
 *
 * $all nos permite buscar elementos dentro de listas y de esta manera obtener
 * los documentos. En esta instrucción no importa el orden de los argumentos.
 * $all funciona como un and, lo que indica que todos los valores que pasamos
 * como argumentos deben encontrarse en el documento. El orden no importa pero
 * si los valores.
 *
 * a) obtener los usuarios que posean por curso Docker y Vagrant
 */

db.users.find({
	courses: { $all: ['Docker', 'Vagrant'] }
}).pretty()

/**
 *
 * Si mongo se encuentra con que el atributo es una lista, entonces buscará el
 * valor dentro de la lista, si el valor existe entonces obtiene el documento
 */

db.users.find({ 
	courses: 'Ruby'
})

// equivalente a la consulta con $all
db.users.find({
	$and: [
		{course: 'Docker'},
		{course: 'Vagrant'}
	]
})

/**
 *
 * Operadores relacionales sobre listas
 *
 * a) actualizar el registro de usuarios para agregarle una lista con scores
 * b) obtener todos los usuarios que posean por lo menos califiacación de 10
 * c) obtener todos los usuarios que posean por lo menos califiacación de 5
 */

db.users.updateOne(
	{ name: "Rick Sanchez" },
	{
		$set: { scores: [9, 8, 9, 5,10] }
	}
)

db.users.updateOne(
	{ name: "Anomadev" },
	{
		$set: { scores: [10, 7, 9, 6,10] }
	}
)

db.users.find({
	scores: 10
}).pretty()

db.users.find({
	scores: {
		$lte: 5
	}
})


/**
 *
 * Insertar elementos a las listas con $push
 * Agregar un elemento nuevo a lista courses de un usuario con $push
 * Agregar varios elementos nuevos a la lista con $push y $each
 * 
 */

db.users.updateOne(
	{
		name: "Anomadev"
	},
	{
		$push: { courses: "Kubernetes" }
	}
)

db.users.updateOne(
	{
		name: "Rick Sanchez"
	},
	{
		$push: {
			courses: { $each: ["Java", "Go", "Dart"] }
		}
	}
)

/**
 *
 * $position nos permite definir en que indice de la lista se agregará el 
 * nuevo elemento.
 */


// agregar elemento a la posicion especificada
db.users.updateOne(
	{ name: "Rick Sanchez" },
	{
		$push: {
			courses: {
				$each: ["Rust"],
				$position: 0
			}
		}
	}
)

// agregar elementos a partir de la posición especificada
db.users.updateOne(
	{ name: "Rick Sanchez" },
	{
		$push: {
			courses: {
				$each: ["C", "C#"]
				$position: 1
			}
		}
	}
)

/**
 *
 * Ordenar elementos de las listas con $sort, el cual permite agregar nuevos
 * elementos a la lista, manteniendo el orden que especifiquemos.
 *
 * a) ordenar la lista scores en los documentos de la colección users
 */

db.users.updateOne(
	{ name: "Anomadev" },
	{
		$push: {
			scores: {
				$each: [3, 10],
				$sort: 1 // ordenamiento de forma ascendente
			}
		}
	}
)

/**
 *
 * Eliminar elementos de una lista con $pull.
 * 
 * a) eliminar el elemento Python de la lista de cursos
 * b) eliminar un conjunto de elemento de la lista de cursos 
 */

db.users.updateMany(
	{ 
		courses: { $exists: true } 
	},
	{
		$pull: { courses: "Python" }
	}
)


db.users.updateMany(
	{ 
		courses: { $exists: true }
	},
	{
		$pull: {
			courses: { $in: ["C", "C#"] }
		}
	}
)

/**
 *
 * Actualizar registros por indices
 * 
 * a) Cuando se conoce el numero de indice, buscamos si la lista existe en el
 * 	  documento y editamos el indice especificando con un punto y el indice.
 * b)  
 */

db.users.updateMany(
	{ scores: { $exists: true } },
	{
		$set: {
			'scores.0': 5
		}
	}
)

db.users.updateMany(
	{ 
		scores: { $exists: true },
		scores: 9 // indicamos la condición donde aplicara el cambio
	},
	{
		$set: {
			'scores.$': 6 // $ es la posición donde se cumpla la condición
		}
	}

)

/**
 *
 * Obtener un elemento de la lista a partir de su posición o indice.
 * $slice permite obtener elementos de una lista por su posición o indice.
 *
 * a) obtener el primer elemento de la lista courses
 * b) obtener los primeros 3 elementos de la lista courses
 */

db.users.findOne(
	{ name: "Rick Sanchez" },
	{
		_id: false,
		name: true,
		courses: {
			$slide: 1 // obtener la posición 1 de la lista courses
		}
	}
)

db.users.findOne(
	{ name: "Rick Sanchez" },
	{
		_id: false,
		name: true,
		courses: {
			$slide: [0, 3] // obtener las primeras 3 posiciones
		}
	}
)

/**
 *
 * Busqueda por tamaño de listas
 * a) obtener los usuarios con 5 cursos con el uso del operador $size
 * b) obtener todos los usuarios que posean por lo menos 3 cursos
 */

db.users.find({
	courses: {
		$size: 5 // condicional para el tamaño de la lista
	}
}).pretty()

db.users.find({
	$and: [
		{ courses: { $exists: true } },
		{ $where: 'this.courses.length >= 3' }
	]
}).pretty()