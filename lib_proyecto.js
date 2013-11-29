/*******************
* Ejercicio 2
* Julio Aguado Robles
* Alumno: al10788
********************/

var url = "http://127.0.0.1:8080";

function muestraUsuarios() {
	$.get('/usuarios', function(data) {
		var html = "<table width='60%' align='center' cellspacing=10 cellpadding=20><tr>";
		for (var i in data.usuarios)
			html += "<td class='celdaUsuario' cellpadding=100 cellspacing=100><div class='cuadroUsuario' id='divUsuario"+data.usuarios[i].usuario+"'><b>"+data.usuarios[i].usuario+"</b></div></td>";
// Hacerle toggle al pasar el raton
// Animar
			html += "</tr></table>";
		$('#wrapperLogin').html(html);
		
		$('.cuadroUsuario').each(function() {
			$(this).hover(
				function(e) {
					$(this).fadeTo("fast", 1);
				},
				function(e) {
					$(this).fadeTo("fast", 0.33);
				});
			$(this).click(function(e) {
					$(".txtPass").remove();
					$(this).animate({height:100},200);
					$(this).append("<p class='txtPass'><input type='password' size=3 ></p>");
				});
			});
	});
}











var turnos = ["rojo", "azul"];
var tablero;

/***************** CLASE TABLERO **************************/
// Clase Tablero
function Tablero(filas, columnas) {
	this.tablero = null;					// array con movimientos realizados
	this.filas = filas;						// Numero de filas
	this.columnas = columnas;				// Numero de columnas
	this.turno = turnos[0];					// Color Turno actual (siempre comienza rojo)
	this.jugadas = 0;						// Numero de jugadas totales
	this.dibujaTablero = dibujaTablero;		// Dibuja el tablero de juego
	this.chkGanador = chkGanador;			// Comprueba si hay ganador
	this.mostrarGanador = mostrarGanador;	// Muestra el ganador y desactiva mas movimientos
	
	// Inicializar el array de movimientos a vacios
	this.tablero = new Array(this.filas);
	for (var i=0; i<filas; i++) {
		this.tablero[i] = new Array(this.columnas);
		for (var j=0; j<columnas; j++)
			this.tablero[i][j] = "";
	}				
}

// Dibuja el tablero de juego en la clase tablero
function dibujaTablero() {
	// Crear la tabla con el tablero de juego
	var html = "<table id='tblTablero' cellpadding=0 cellspacing=0 align='center'><tr><td colspan='"+this.columnas+1+"' align='center'><div id='ganador'></div><div class='turno_rojo' id='turno_rojo'><b>TURNO ROJO</b></div><div class='turno_azul' id='turno_azul' style='opacity:0'><b>TURNO AZUL</b></div></td></tr><tr>";
	// Botones para colocar ficha
	for (var i=0; i<this.columnas; i++)
		html += "<td><input type='button' value='Ficha' id='btnCol_"+i+"'><script type=\"text/javascript\">$(\"#btnCol_"+i+"\").click(colocarFicha);</script></td>";
	html += "<td id='celda_blanco'><div>&nbsp;</div></td></tr>";
	// Crear cada celda del tablero con un div para usarlo según los colores del turno
	for (var i=0; i<this.filas; i++) {
		html += "<tr>";
		for (var j=0; j<this.columnas; j++)
			html+= "<td id='celda_"+i+"_"+j+"' class='casilla'><div id='div_"+i+"_"+j+"' >&nbsp;</div></td>";
		html += "<td id='celda_blanco'><div>&nbsp;</div></td><tr>";
	}
	html+= "</tr>";
	html+= "</table>";
	// Coloca el html generado
	$("#panelJuego").html(html);
	
}

// Comprueba si el ultimo movimiento es ganador
function chkGanador(posicion_fila, posicion_columna, color) {
	var contador, pos_col, pos_fil;

	// Comprueba hacia la derecha
	contador = 0;
	pos_col = posicion_columna;
	while (pos_col < this.columnas && this.tablero[posicion_fila][pos_col] == color ) {
		contador++;
		pos_col++;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 0, 1);

	// Comprueba hacia la izquierda
	contador = 0;
	pos_col = posicion_columna;
	while (pos_col >= 0 && this.tablero[posicion_fila][pos_col] == color ) {
		contador++;
		pos_col--;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 0, -1);

	// Comprueba hacia abajo
	contador = 0;
	pos_fil = posicion_fila
	while (pos_fil < this.filas && this.tablero[pos_fil][posicion_columna] == color ) {
		contador++;
		pos_fil++;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 1, 0);
		
	// Comprueba hacia abajo-derecha
	contador = 0;
	pos_fil = posicion_fila
	pos_col = posicion_columna
	while (pos_fil < this.filas && pos_col < this.columnas && this.tablero[pos_fil][pos_col] == color ) {
		contador++;
		pos_fil++;
		pos_col++;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 1, 1);

	// Comprueba hacia abajo-izquierda
	contador = 0;
	pos_fil = posicion_fila
	pos_col = posicion_columna
	while (pos_fil < this.filas && pos_col >= 0 && this.tablero[pos_fil][pos_col] == color ) {
		contador++;
		pos_fil++;
		pos_col--;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 1, -1);	

	// Comprueba hacia arriba-izquierda
	contador = 0;
	pos_fil = posicion_fila
	pos_col = posicion_columna
	while (pos_fil >= 0 && pos_col >= 0 && this.tablero[pos_fil][pos_col] == color ) {
		contador++;
		pos_fil--;
		pos_col--;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, -1, -1);			
}


// Muestra el ganador
function mostrarGanador(posicion_fila, posicion_columna, color, direccion_fila, direccion_columna) {
	var indice_fila = posicion_fila;
	var indice_columna = posicion_columna;
	// Señala con 'X' las posiciones ganadoras
	for (var i=0; i<4; i++) {
		$("#div_"+indice_fila+"_"+indice_columna).append('<b>X</b>');
		indice_fila += direccion_fila;
		indice_columna += direccion_columna;
	}
	// Desactivar los botones para evitar mas movimientos
	for (var i=0; i<this.columnas; i++)
		$("#btnCol_"+i).attr('disabled','disabled');
	$("#turno_"+tablero.turno).hide();
	$("#turno_"+turnos[(tablero.jugadas)%turnos.length]).hide();
	$("#ganador").append("<b>Gana jugador <span class='"+color+"'>"+color+"</span> en "+this.jugadas+" movimientos</b>");
	$("#ganador").show();
}
/***************** FIN CLASE TABLERO **************************/


// Evento que se dispara al pulsar el boton de colocar ficha
function colocarFicha() {
	var velocidad = 200;    // Velocidad en la animacion
	var columna = this.id.split('_')[1];   // Columna segun boton pulsado
	// Desplazamiento de arriba a abajo de la ficha
	var i = 0;
	while (i<(tablero.filas) && tablero.tablero[i][columna] == "") {
		// Se esconde el div
		$("#div_"+i+"_"+columna).hide();	
		// Eliminar clases rojo y azul
		$("#div_"+i+"_"+columna).removeClass(turnos[0]);		
		$("#div_"+i+"_"+columna).removeClass(turnos[1]);		
		// Se añade la clase del color del turno
		$("#div_"+i+"_"+columna).addClass(tablero.turno);		
		// Si puede seguir hacia abajo la ficha: animacion de mostrar y ocultar
		if (i<(tablero.filas-1) && tablero.tablero[i+1][columna] == "") {
			$("#div_"+i+"_"+columna).delay(velocidad*i).fadeIn(velocidad).fadeOut(0);
		} 
		// Si ya llega al final posible: animacion solo de mostrar
		else
			$("#div_"+i+"_"+columna).delay(velocidad*i).fadeIn(velocidad);
		i++;
	}
	// Si se ha podido colocar la ficha (no estaba ya la columna completa
	if (i > 0) {
		tablero.tablero[i-1][columna] = tablero.turno;	// Se actualiza el array con el color del turno
		tablero.jugadas++;	// Aumenta numero de jugadas
		// Comprueba si hay ganador
		tablero.chkGanador(i-1, parseInt(columna), tablero.turno);	
		// Se oculta el div del turno actual y se muestra el del turno siguiente
		$("#turno_"+tablero.turno).animate({opacity:0}, function(){ $("#turno_"+turnos[(tablero.jugadas)%turnos.length]).animate({opacity:1})});
		// Se actualiza el color del turno siguiente
		tablero.turno = turnos[tablero.jugadas%turnos.length];
	}
} 


// Inicializa el tablero de juego creando la clase
function iniciaJuego() {
	// Comprobar que filas y columnas es numerico
	if ($.isNumeric($("#fldFilas").val()) && $.isNumeric($("#fldColumnas").val())) {
		// Crear y dibujar el tablero
		tablero = new Tablero($("#fldFilas").val(),$("#fldColumnas").val());
		tablero.dibujaTablero();
	}
	else
		alert('Debe introducir valores numéricos para filas y columnas');
}


