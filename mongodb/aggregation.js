/**
 *
 * Agregate es un método el cual recibe como parametro una lista de aquellas
 * tareas que deseamos ejecutar, cada una de estas tareas funcionara como un 
 * pipe (el input de una tarea es el outpout de la tarea anterior).
 *
 * 
 */

db.users.aggregate([
	{
		// output: usuarios con edad mayor a 25
		$match: {
			age: { $gt: 25 }
		}
	},
	{
		//  output: usuarios del query anterior con la propiedad courses 
		$match: {
			courses: { $exists: true }
		}
	}
]).pretty()

/**
 *
 * De las tareas anteriores obtener solamente el nombre y el listado de cursos
 * el operador $project: indicamos que atributos queremos mostrar, la 
 * proyección se va a realizar sobre el output de la tarea anteriror
 */

db.users.aggregate([
	{
		// output: usuarios con edad mayor a 25
		$match: {
			age: { $gt: 25 }
		}
	},
	{
		//  output: usuarios del query anterior con la propiedad courses 
		$match: {
			courses: { $exists: true }
		}
	},
	{
		// definiendo los atributos que vamos a mostrar
		$project: {
			_id: false,
			name: true,
			courses: true
		}
	}
]).pretty()

/**
 *
 * Obtener los dos primeros cursos del resultado de las tareas anteriores.
 * El operador $project nos permite definir nuevos atributos para los
 * resultados de las tareas que estemos ejecutando.
 */

db.users.aggregate([
	{
		// output: usuarios con edad mayor a 25
		$match: {
			age: { $gt: 25 }
		}
	},
	{
		//  output: usuarios del query anterior con la propiedad courses 
		$match: {
			courses: { $exists: true }
		}
	},
	{
		// definiendo los atributos que vamos a mostrar
		$project: {
			_id: false,
			name: true,
			courses: true
		}
	},
	{
		$project: {
			name: true,
			firstCourses: {
				// $ para tomar el output de la tarea anterior
				$slice: ['$courses', 2] // tomamos 2 elementos de la lista 
			}
		}
	},
	{
		$project: {
			name: true,
			// tomamos el primer elemento de la lista anterior "firstCourses"
			course: {
				$arrayElemAt: ['$firstCourses', 0]
			}
		}
	}
]).pretty()

/**
 *
 * Agregar nuevos campos a documentos ya existentes con el uso de $addFields
 */


db.users.aggregate([
	{
		// output: usuarios con edad mayor a 25
		$match: {
			age: { $gt: 25 }
		}
	},
	{
		//  output: usuarios del query anterior con la propiedad courses 
		$match: {
			courses: { $exists: true }
		}
	},
	{
		// definiendo los atributos que vamos a mostrar
		$project: {
			_id: false,
			name: true,
			courses: true
		}
	},
	{
		$project: {
			name: true,
			firstCourses: {
				// $ para tomar el output de la tarea anterior
				$slice: ['$courses', 2] // tomamos 2 elementos de la lista 
			}
		}
	},
	{
		$project: {
			name: true,
			// tomamos el primer elemento de la lista anterior "firstCourses"
			course: {
				$arrayElemAt: ['$firstCourses', 0]
			}
		}
	},
	{
		$addFields: {
			currentDate: new Date(),
			username: '$name'
		}
	}
]).pretty()

/**
 *
 * El operador al igual que addFields nos permite agregar campos nuevos a 
 * documentos ya existente, sin embargo de hace uso de $set cuando queramos
 * realizar ciertas operaciones sobre los docuementos
 */

db.users.aggregate(
	{
		$match: {
			scores: { $exists: true }
		}
	},
	{
		$project: {
			_id: false,
			name: true,
			score: true	
		}
	},
	{
		$set: {
			// sumamos los registros de la lista scores del documento obtenido
			sum: { $sum: '$scores' }
		}
	},
	{
		$set: {
			// obtenemos el promedio de la lista scores del documento obtenido
			avg: { $avg: '$scores' }
		}
	},
	{
		$match: {
			// obtenemos unicamente los usuarios con promedio mayor a 7
			avg: { $gt: 7 }
		}
	}
)

/**
 * 
 * Concat:
 * el operador $concat permite concatenar diferentes atributos de un documento
 */

db.users.aggregate(
	[
		{
			// primera tarea obtenemos los usuarios con nombre y contraseña
			$match: {
				$and: [
					{ name: { $exists: true } },
					{ lastname: { $exists: true } }
				]
			},
		}
		{
			// segunda tarea: mediante una proyección retornamos los atributos
			$project: {
				_id: false,
				name: true,
				lastname: true
			}
		},
		{
			// tercera tarea: concatenamos la información que retorna la tarea
			$project: {
				fullname: {
					$concat: ['$name', ' ', '$lastname']
				}
			}
		}
	]
)

/**
 *
 * Group by
 * El operador $group permite agrupar documentos a partir de ciertos atributos
 *
 * a) agrupar y contar la cantidad de items con respecto a su tipo
 */

db.items.insertMany([
	{ type: 'Camera', color: 'red', price: 120 },
	{ type: 'Laptop', color: 'white', price: 400 },
	{ type: 'Laptop', color: 'black', price: 600 },
	{ type: 'Camera', color: 'silver', price: 200 },
	{ type: 'Microphone', color: 'black', price: 200 },
	{ type: 'Mouse', color: 'white', price: 50 },
	{ type: 'Monitor', color: 'white', price: 50 }
])

db.items.aggregate([
	{
		$group: {
			// agrupar los documentos con respecto al atributo type
			_id: '$type',
			// por cada documento agrupado sumamos 1 al atributo total
			total: { $sum: 1 }
		}
	},
	{
		$match: {
			// obtenemos los documentos cuyo tipo que se encuentre más de 1 vez
			total: { $gt: 1 }
		}
	}
])

/**
 *
 * Ordenamiento
 * obtener al usuario más joven con $limit y $sort
 */

db.users.aggregate([
	{
		$sort: {
			// ordenamos los documentos con respecto a la edad decendentemente
			age: 1
		}
	},
	{
		// obtenemos solo el primer registro de la colección
		$limit: 1
	},
	{
		// obtenemos solo el nombre y la edad del documento
		$project: {
			_id: false,
			name: true,
			age: true
		}
	}
])

/**
 *
 * $map nos permite aplicar una expresión para cada uno de los elementos dentro
 * de una lista.
 *
 * a) multiplicar cada uno de los elementos de lista scores por 10
 * b) multiplicar el progreso de los elementos de la lista courses por 10
 */

db.users.aggregate([
	{
		$match: {
			scores: { $exists: true }
		}
	},
	{
		$project: {
			_id: false,
			name: true,
			scores: true
		}
	},
	{
		$project: {
			name: true,
			scores: true,
			newListScores: {
				$map: {
					// lista con la que vamos a trabajar el $map
					input: 'scores',
					// alias que permite identificar los elementos de la lista
					as: 'score',
					// expresion que deseemos aplicar a los elementos
					in: {
						// $$ indica que score no es el output, sino el alias
						$multiply: ['$$score', 10] 
					}
				}
			}
		}
	}
]).pretty()

db.users.aggregate([
	{
		match: {
			courses: { $exists: true }
		}
	},
	{
		$project: {
			_id: false,
			name: true,
			courses: true
		}
	},
	{
		$project: {
			newList: {
				$map: {
					input: 'courses',
					as: 'course',
					in: {
						$multiply: ['$$course.progress', 10]
					}
				}
			}
		}
	}
])