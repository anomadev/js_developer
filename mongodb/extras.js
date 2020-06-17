/**
 *
 * Para representar una relación uno a uno en mongodb, basta con trabajar
 * documentos embebidos.
 */

var usuario = {
	nombre: "Anomadev",
	apellido: "Uchiha",
	edad: 29,
	correo: "mail@example.com",
	direccionPostal: {
		calle: "userStreet",
		ciudad: "userCity",
		estado: "userState",
		codigoPostal: "76000",
		numero: 323
	}
}

db.users.insertOne(usuario)

/**
 *
 * Relación uno a muchos
 * a) representada como una lista de objetos dentro del documento
 * b) trabajar con "llaves foraneas" --> objectsId
 */

var autor = {
	nombre: 'George R. R. Martin',
	nacionalidad: 'Estadounidense',
	libros: [
		{
			titulo: 'Juego de tronos',
			fecha: 1996,
			coleccion: 'Canción de hielo y fuego' 
		},
		{
			titulo: 'Choque de reyes',
			fecha: 1998,
			coleccion: 'Canción de hielo y fuego' 
		},
		{
			titulo: 'Tormenta de espadas',
			fecha: 2000,
			coleccion: 'Canción de hielo y fuego' 
		},
		{
			titulo: 'Festín de cuervos',
			fecha: 2005,
			coleccion: 'Canción de hielo y fuego' 
		},
		{
			titulo: 'Danza de dragones',
			fecha: 2011,
			coleccion: 'Canción de hielo y fuego' 
		},
	]
}

// Registramos el autor para obtener el ObjectId del autor

var author = {
	name: "George R. R. Martin",
	nationality: "American"
}

db.authors.insertOne(author)

// Almacenamos el ObjectId del documento al cual hace referencia

var bookGameOfThrones = {
	title: 'Juego de tronos',
	date: 1996,
	collection: 'Canción de hielo y fuego',
	author_id: ObjectId("*****b3a") // llave foranea
}

var bookClashOfKings = {
	title: 'Choque de reyes',
	date: 1998,
	collection: 'Canción de hielo y fuego',
	author_id: ObjectId("*****b3a") // llave foranea
}

var bookStormOfSwords = {
	title: 'Tormenta de espadas',
	date: 2000,
	collection: 'Canción de hielo y fuego',
	author_id: ObjectId("*****b3a") // llave foranea
}

var bookFeastForCrows = {
	title: 'Festín de cuervos',
	date: 2005,
	collection: 'Canción de hielo y fuego',
	author_id: ObjectId("*****b3a") // llave foranea
}

var bookDanceWithDragons = {
	title: 'Danza de dragones',
	date: 2011,
	collection: 'Canción de hielo y fuego',
	author_id: ObjectId("*****b3a") // llave foranea
}

db.books.insertMany([
	bookGameOfThrones,
	bookClashOfKings,
	bookStormOfSwords,
	bookFeastForCrows,
	bookDanceWithDragons
])

/**
 *
 * Para crear un nuevo indice debemos usar el método createIndex.
 * Indexamos el atributo author_id de forma ascendente.
 *
 * Podemos ejecutar el método getIndexes para obtener todos los indices que
 * posee la colección. 
 */

db.users.createIndex({ author_id: 1 })

db.users.getIndexes()

/**
 * 
 * El operador $lookup permite simular el comportamiento de join en una
 * base de datos relacional.
 *
 * a) obtener todos los autores con su correspondiente listado de libros
 * b) obtener todos los autores que posean por lo menos un libro
 */

db.authors.insertMany([
	{ name: 'George R. R. Martin', nationality: 'Estadounidense' },
	{ name: 'J.K Rowling', nationality: 'Britanica' }
])

db.books.insertMany([
	{ 
		title: 'Harry Potter y la Piedra Filosofal',
		date: 1997,
		author_id: ObjectId('*********b40')
	},
	{
		title: 'Harry Potter y El prisionero de Azkaban',
		date: 1999,
		author_id: ObjectId('*********b40')
	}
])

db.authors.aggregate([
	{
		$lookup: {
			// colección con la cual queremos realizar el join
			from: 'books',
			// campo de la colección el cual vamos a utilizar para el join
			localField: '_id',
			// campo de la colección "from" el cual utilizaremos para el join
			foreignField: 'author_id',
			// alias de la union de los documentos
			as: 'publications'
		}
	},
	{
		$match: {
			// publicaciones diferentes a una lista vacia
			publications: { $ne: [] }
		}
	},
	{
		$project: {
			_id: false,
			name: true
		}
	}
]).pretty()

/**
 *
 * $unwind genera un nuevo documento por cada uno de los elementos dentro de 
 * una lista, similar al comportamiento de un cross join.
 *
 * Obtenemos un resultado por cada unión del autor con su correspondiente libro
 */

db.authors.aggregate([
	{
		$lookup: {
			from: 'books',
			localField: '_id',
			foreignField: 'author_id',
			as: 'publications'
		}
	},
	{
		// lista sobre cual utilizaremos el operador unwind
		$unwind: 'publications'
	},
	{
		$project: {
			_id: false,
			name: true,
			book: '$publications'
		}
	}
])

/**
 *
 * Plan de ejecución: 
 * El método explain retornara información adicional acerca de la consulta:
 * criterios de busqueda, tiempo de respuesta, etc.
 */

db.authors.find({ name: 'George R. R. Martin' }).explain('executionStats')

/**
 *
 * Crear colecciones y establecer reglas con createCollection para limitar
 * los tipos de datos que pueden registrar en los documentos.
 */

db.createCollection('contacts', {
	validator: { $jsonSchema: {
		bsonType: "object",
		required: ["phone"],
		properties: {
			phone: {
				bsonType: "string",
				description: "must be a string and is required"
			},
			email: {
				bsonType: "string",
				pattern: "@mongodb\.com$",
				description: "must be a string and match the regular expression pattern"
			},
			status: {
				enum: ["Unknown", "Imcomplete"],
				description: "can only be one of the enum values"
			}
		}
	}}
})

/**
 *
 * Respaldo de información
 * mongodump: nos permite generar un respaldo de la base de datos.
 * mongodump --db cursoMongoDB
 * 
 * mongorestore: nos permite restaurar una base de datos a partir de un backup
 * mongorestore --db cursoMongoDB path/to/backup
 *
 * 
 * Para respaldar colecciones en particular utilizamos el comando:
 * mongodump --collection authors --db cursoMongoDB
 *
 * Para restaurar una colección utilizamos:
 * mongorestore --collection authors --db cursoMongoDB path/collection.bson
 */


