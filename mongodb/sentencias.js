/**
 * 
 * insertOne sustituye al método insert que en versiones más actuales de mongo
 * se esta retirando, este método nos permite guardar un documento en la colección
 */

var user2 = {
    name: "Anomadev",
    last_name: "Unknow",
    age: 29,
    email: "anomadev@mail.com"
}

db.users.insertOne(user2)

/**
 * 
 * insertMany como su nombre lo indica nos permitira guardar multiples documentos
 * en una colección. este método recibe una lista de documentos
 */

db.users.insertMany([user3, user4])

/**
 *
 * realizar busquedas de documentos en nuestras colecciones con el
 * método find
 */

db.users.find()

db.users.find(
	{age: 25}, // criterios de busqueda --> where
	{name: true, email: true} // atributos a obtener --> select
).pretty()

db.users.find(
	{age: 25}, // criterios de busqueda --> where
	{name: false} // excluimos los valores para la consulta
).pretty() 

/**
 *
 * el operador equals $ne nos permitira nos permitira obtener documentos
 * cuyo valor sea diferente al valor con el que lo evaluamos todo lo 
 * contrario al operador $eq
 */
db.users.find({
	age: { $ne: 25 }
}).pretty()


db.users.find({
	age: { $eq: 29 }
}).pretty()

/**
 *
 * el método findOne nos permite obtener un documento a partir de un 
 * criterio de busqueda, el documento será el primero el cual cumpla
 * con las condiciones. El método findOne no posee el método pretty
 */

db.users.findOne({
	age: { $ne: 25 }
})

db.users.findOne() // retornaria el primer documento de la colección

/**
 *
 * Operadores relacionales:
 * $gt: operador (mayor que) "obtener todos los usuarios mayores a"
 * $gte: operador (mayor o igual que)
 * $lte: operador (menor o igual que)
 * $lt: operador (menor que)
 */

db.users.find({
	age: { $gt: 20 } // mayor que
})

db.users.find({
	age: { $gte: 26 } // mayor o igual
})

db.users.find({
	age: { $lte: 26 } // menor o igual
})

db.users.find({
	age: { $lt: 20 } // mayor que
})

/**
 *
 * Operadores logicos:
 * Obtener todos los usuarios cuya edad sea mayor a 20 y menor a 26
 */

db.users.find({
	$and: [
		{
			age: {$gt: 20}
		},
		{
			age: {$lt: 26}
		}
	]
}).pretty()

/**
 *
 * Operadores logicos:
 * Obtener todos los usuarios cuyo nombre sea Cristhofer o Anomadev
 */

db.users.find({
	$or: [
		{ name: "Crithofer" },
		{ name: "Anomadev" }
	]
}).pretty()

/**
 *
 * Operadore logicos:
 * Utilizando $and y $or en una sola consulta
 */

db.users.find({
	$or: [
		{ name: "Crithofer" },
		{ name: "Anomadev" },
		{
			$and: [
				{ age: {$gt: 20} },
				{ age: {$lt: 26} }
			]
		}
	]
})

/**
 *
 * Expresiones regulares en criterios de búsqueda:
 * 
 * a) insertamos varios documentos en la colección books
 * b) mongodb emula la clausura "like" utilizando expresiones regulares
 */

db.books.insertMany([
	{title: "El obstaculo es el camino", price: 143 },
	{title: "El estilo Virgin", price: 149 },
	{title: "Rebelión en la granja", price: 79 },
	{title: "Elon Musk", price: 229 }, 
	{title: "Nunca pares", price: 149 },
	{title: "El sutil arte de que te importe un carajo", price: 89 },
	{title: "Bab Blood", price: 55 },
	{title: "Clean Code", price: 773 },
	{title: "Refactoring", price: 845 },
	{title: "Clean Architecture", price: 976 },
	{title: "Craking the Coding Interview", price: 597 },
])

db.books.find({ title: /^El/ }) // obtener los libros que comiencen con "El"
db.books.find({ title: /s$/ }) // obtener los libros que terminen con "s"
db.books.find({ title: /la/ }) // obtener los libros que contengan "la"

/**
 *
 * El operador $in nos permite buscar valores dentro de una lista.
 * Esta función es más rapida que el operador $or en terminos de performance.
 * 
 * El operador $nin realiza la operación contraria y excluye los valores de los
 * parametros de busqueda.
 */

db.books.find({
	title: {
		$in: ['Clean Code', 'Clean Arquitecture', 'Clean Coder']
	}
})

/**
 *
 * Busqueda por atributos:
 * $exists nos permite obtener documentos a partir de un atributo
 * Obtener los usuarios que tengan el atributo last_name
 *
 * $type evalua el tipo de dato del atributo especificado 
 * Obtener todos los usuarios cuyo atributo createdAt sea tipo date
 */

var rick = {
	name: 'Rick Sanchez',
	email: 'rick@mail.com',
	support: true,
	createdAt: new Date()
}

db.users.insertOne(rick)

db.users.find({
	last_name: {
		$exists: true
	}
})

db.users.find({
	createdAt: {
		$type: 'date'
	}
})

/**
 *
 * Obtener y actualizar documentos
 * save: evalua que el objeto que intentamos guardar posea el atributo _id
 * en caso de tenerlo actualiza el objeto, de lo contrario crea uno nuevo.
 */

var userToUpdate = db.users.find({ name: 'Rick Sanchez' })
userToUpdate.support = false
userToUpdate.age = 50

db.users.save(userToUpdate)

/**
 *
 * La forma más recomendable para actualizar documentos es mediante
 * los métodos updateOne y updateMany.
 * $set establecer nuevos valores o nuevos atributos a los documentos. 
 *
 * a) agregar a todos los usuarios en atributo support en falso
 * b) actualizar el valor de support a verdadero para el usuario Rick Sanchez
 */

db.users.updateMany(
	{
		// criterios de busqueda
		support: { $exists: false }
	},
	{
		// establece los nuevos valores usando $set
		$set: { support: false }
	}
)

db.users.updateOne(
	{
		// criterios de busqueda
		support: { name: 'Rick Sanchez' }
	},
	{
		// establece los nuevos valores usando $set
		$set: { support: true }
	}
)

/**
 *
 * $unset nor permite elimiar attributos de nuestros documentos.
 * eliminar createdAt del usuario que posea el atributo
 */

db.users.updateOne(
	{
		// criterios de busqueda
		createdAt: { $exists: true }
	},
	{
		// remover atributo
		$unset: { createdAt: true }
	}
)

/**
 *
 * $inc: nos permite aunmenta el valor de los atributos de tipo entero
 * de igual forma podemos disminuir en valor pasando un valor negativo.
 * 
 * a) modificar la edad del usuario Rick Sanchez
 */

db.users.updateOne(
	{ name: "Rick Sanchez" },
	{
		// incrementamos el valor de age, para este caso 1
		$inc: { age: 1 }
	}
)

/**
 *
 * $upsert: indica a mongo actualizar el documento de una colección, sino
 * existe el documento entonces se procede a la creación.
 */

db.users.updateOne(
	// criterios de busqueda
	{ name: 'Rick Sanchez' },
	// modificación de los valores
	{
		$set: { age: 62 }
	},
	// indicamos que si no existe el documento entonces lo cree
	{ $upsert: true }
)

/**
 *
 * eliminar documentos mediante el método remove, enviando los
 * criterios de busqueda del documento.
 */

db.users.remove({
	name: 'Rick Sanchez'
})

db.users.remove({}) // elimina todos los documentos de la colección


/**
 *
 * dropDatabase() elimina una base de datos --> db.dropDatabase()
 * drop() elimina una coleccion --> db.books.drop()
 */

/**
 *
 * Cursores
 * el método find retorna como resultado un cursor, los cursores
 * tienen como limite 20 resultados podemos ir a los siguiente resultados 
 * con la instrucción it
 *
 * count(): devuelve cantidad de elemento que almacena la colección
 * limit(): limita la cantidad de documentos que retorna como resultado
 * skip(): permite saltar un numero de documentos que obtenemos como resultado
 * sort(): nos permite ordenar nuestros documentos obtenidos
 */


db.users.find({
	email: /mail.com$/
}).count()

db.users.find().limit(3) // obtenemos los 3 primeros documentos

db.users.skip(2).limit(1) // obtenemos el 3er documento de la colección

db.users.find(
	{},
	{ _id: false, name: true }
).sort({
	name: 1 // ordenamos por nombre de manera ascendente
})

/**
 *
 * Nos permite obtener un documento para posteriormente actualizarlo
 * obligatoriamente debe recibir un query y un update, retorna el documento
 * anterior a la actualización.
 *
 * Para obtener el objeto actualizado, debemos para el parametro new.
 */

db.users.findAndModify(
	{
		query: { name: 'Rick Sanchez' }
	},
	update: {
		$inc: { age: 1 }
	},
	new: true
)

/**
 *
 * Renombrar atributos de los objetos
 * renombrar el atributo last_name por lastName
 */

db.users.updateMany(
	{}, // aplicar a todos los documentos en la colección
	{
		$rename: { last_name: 'lastName' }
	}
)

/**
 *
 * El id de los documentos es un objeto de la clase objectId, un objectId
 * es unico para los documentos y colecciones incluso computadoras.
 *
 * ObjectId utiliza 12 bytes
 * 3 bytes son timestamps
 * 3 bytes identificador unico de la maquina donde se ejecuta mongo
 * 2 bytes generados del process id de la instancia de mongo
 * 3 bytes generados por un contador incremental
 */