/**
 *
 * Documentos anidados en el documento usuario.
 * Actualización del usuario anomadev agregando un documento para la dirección
 */

db.users.updateOne(
	{ name: 'Anomadev' },
	{
		$set: {
			address: {
				state: "Queretaro",
				city: "Queretaro",
				postalCode: "76000"
			}
		}
	}
)

/**
 *
 * Dot nottation, 
 * a) obtener todos los usuario que posean una dirección postal
 * b) obtener todos los usuarios que posean el código postal 76099
 * c) obtener la primera referencia de los usuarios con código postal y referencias
 */

// a)
db.users.find(
	{
		address: { $exists: true }
	}
).pretty()

// b)
db.users.find({
	$and: [
		{ 'address.postalCode': 76099 }, // dot notation
		{ 'address.number': { $exists: true } }, 
		{ 'adreess.number': 323 }
	]
}).pretty()

// c)
db.users.find(
	{
		$and: [
			{ adress: { $exists: true } },
			{ 'adreess.reference': { $exists: true } }
		]
	},
	{
		_id: false,
		name: true,
		'adress.reference': true // dot notation
	}
).pretty()

/**
 *
 * Actualizar elementos, agregando atributos al documento anidado del usuario
 * Agregar una nueva referencia al documento anidado del usuario
 */

db.users.updateOne(
	{ name: 'Anomadev' },
	{
		$set: {
			'address.number': 323,
			'address.reference': [
				'Casa de color amarillo',
				'Cerca de la casa se encuentra un parque'
			]
		}
	}
)

db.users.updateOne(
	{ name: 'Anomadev' },
	{
		$push: {
			'address.reference': {
				$each: [
					'Cerca de la casa hay una panaderia',
					'Cerca de la casa hay un rio'
				]
			}
		}
	}
)

/**
 *
 * Listado de documentos, sustituir los atributos courses de listas a lista de
 * documentos.
 * 
 * a) eliminar la lista courses de los usuarios
 * b) establecemos una nueva lista de cursos pero almacenando documentos
 */

db.users.updateMany(
	{ courses: { $exists: true } },
	{
		$unset: {
			courses: true
		}
	}
)

db.users.updateOne(
	{ name: 'Anomadev' },
	{
		$set: {
			courses: [
				{
					title: "MongoDB",
					progress: 50,
					completed: false
				},
				{
					title: "MySQL",
					progress: 100,
					completed: true
				},
				{
					title: "Postgres",
					progress: 100,
					completed: true
				}
			]
		}
	}
)

/**
 *
 * ElemMatch
 * a) obtener todos los usuarios que hayan completado por lo menos un curso
 * b) obtener todos los usuarios con progreso de sus cursos mayor a 80
 */

db.cursos.find({
	courses: {
		$elemMatch: {
			completed: true
		}
	}
}).pretty()

db.users.find({
	courses: {
		$elemMatch: {
			progress: { $gte: 80 }
		}
	}
}).pretty()

/**
 *
 * Proyecciones: obtener el nombre del usuario con el titulo de cada uno de 
 * sus cursos.
 */

db.users.find(
	{ courses: { $exists: true } },
	{
		_id: false,
		name: true,
		'courses.title': true
	}
)

/**
 *
 * Actuallizar elementos de listas
 * a) conociendo el indice
 * b) sin conocimiento del indice
 * c) actualizar el nombre del tutor en el documento cursos
 */

db.users.updateOne(
	{ name: "Anomadev" },
	{
		$set: {
			'courses.0.progress': 100,
			'courses.0.completed': true
		}
	}
)

db.users.updateOne(
	{ 
		name: "Anomadev",
		'courses.title': "MongoDB"
	},
	{
		$set: {
			'courses.$.progress': 100,
			'courses.$.completed': true,
			'courses.$.tutor': {
				'name': 'Rick'
			}
		}
	}
)

db.users.updateOne(
	{
		name: "Anomadev",
		'courses.title': 'MongoDB'
	},
	{
		$set: {
			'courses.$.tutor.name': 'Rick Sanchez'
		}
	}
)