var fs = require('fs');		// Acceso al sistema de archivos
var express = require('express');
var app = express();

var usuarios = require('./usuarios.json');
var aplicaciones = require('./aplicaciones.json');

app.get('/usuarios', function (req, res) {   
    res.contentType('application/json');
	var users = new Array();
	for (var i in usuarios) {
		users[i] = {usuario: usuarios[i].usuario};
	}
    res.send( { usuarios:  users } );
});

app.get('/usuario_aplicaciones/:user', function (req, res) {   
    res.contentType('application/json');
	var users = new Array();
	for (var i in usuarios) {
		if ( usuarios[i].usuario == req.params.user) 
			res.send( {aplicaciones: usuarios[i].aplicaciones} );
	}
});


app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');


/*
// Abrir el fichero de cabecera html
fs.readFile('usuarios.json', 'utf8', function(err,datos) {
	if (err) 
		console.log("\nError! No encontrado en el servidor el fichero de de usuarios");
	// Se toma el html de la cabecera
	console.log(datos);
	usuarios = JSON.parse(datos);
	//usuarios = datos;
	console.log(usuarios);
});
//console.log(usuarios[0].usuario);
*/
/*
// Crear servidor
http.createServer(function (req, res) { 
	// Prevenir la conexión que realiza el navegador para traer favicon para no contar su conexion
	if (req.url === '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
		res.end();
		return;
	}
	
	// Cabecera en formato html
    res.writeHead(200, {'Content-Type': 'text/html'}); 
	
	// Comprobar si falta en el servidor el fichero de cabecera o pie
	if (!chk_cabecera || !chk_pie) {
		var respuesta = "\nDebe copiar los ficheros ejercicio5_cabecera.html y ejercicio5_pie.html en el mismo directorio del servidor donde se encuentre el programa principal ejercicio5.js";
		res.end(respuesta);
	}
	else {
		var respuesta = "";  // String de respuesta a mostrar
		var seccion=req.url.split("/")[1]; 	// Seccion segun la url
		var ahora = new Date();		// Para tomar la fecha y hora de la conexion
		var fecha = ahora.getDate()+"/"+parseInt(ahora.getMonth()+1)+"/"+ahora.getFullYear();
		var hora = ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds();
		var contador = 0;	// Contador de accesos global
		
		// Si es la primera vez que se invoca la seccion, se crea un array para dicha seccion
		if (accesos_json[seccion] == null) accesos_json[seccion] = new Array();
		
		// Contar los accesos globales a todas las secciones
		for (var i in accesos_json)
			contador += accesos_json[i].length;
		
		// Componer el objeto json de la conexion entrante
		accesos_json[seccion][accesos_json[seccion].length] = "{seccion: '"+seccion+"', orden_seccion: "+accesos_json[seccion].length+", orden_total: "+contador+", ip_cliente: '"+req.connection.remoteAddress+"', fecha: '"+fecha+"', hora: '"+hora+"'},";
		contador++;
		
		// Seccion principal
		if (seccion == "") {
			respuesta = 'Esta es la sección <b>principal</b><br/>Número de accesos totales: <b>'+contador+'</b><br/>Número de accesos a la sección principal:<b> '+accesos_json[seccion].length+'</b>';
			respuesta += '<br/>Registro de accesos en todas las sección en formato JSON:<p><div id="resultadoJSON" class="salida">';
			// Recorrer todas las secciones y mostrar los objetos json
			for (var j in accesos_json) {
				for (var i in accesos_json[j]) 
					respuesta += "<br/>"+accesos_json[j][i];
			}
			respuesta = respuesta.substr(0, respuesta.length-1);
			respuesta += '<br/><br/></div>';
		}
		// Seccion determinada
		else {
			respuesta = 'Esta es la seccion <b>'+seccion+'</b><br/>Número de accesos totales: <b>'+contador+'</b><br>Número de accesos a esta sección: <b>'+accesos_json[seccion].length+'</b>'; 
			respuesta += '<br/>Registro de accesos a esta sección en formato JSON:<p><div id="resultadoJSON" class="salida">';
			// Recorrer los objetos json de la seccion
			for (var i in accesos_json[seccion])
				respuesta += "<br/>"+accesos_json[seccion][i];
			respuesta = respuesta.substr(0, respuesta.length-1);
			respuesta += '<br/><br/></div>';
		}
		// Escribir respuesta y cerrar
		res.write(cabecera_html+respuesta+pie_html); 
		res.end();
	}
}).listen('5000', '127.0.0.1'); 
console.log('Servidor ejecutandose en http://127.0.0.1:8080/');
*/