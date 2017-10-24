
//muestra usuario actual en la aplicación...
//lo carga en el menú durante toda la ejecución.. lo toma del sessionStorage
function mostrarUsuarioActual(){
    document.write("<li><a>Nombre usuario actual: " + sessionStorage.getItem('nombre') + "<span class='glyphicon glyphicon-user'</span></a></li>");
}

//este guarda un array de los ID de algunos div, de acuerdo al que se presiona click
//el resto se bloquean y se esconden y ese se pone en "block"..
//auxiliar de otros metodos que se utilizaron para hacer algo parecido..
function mostrar(divID)
{
    var variables=new Array("home","insertar","modificar","modificar2","eliminar","consultar");

    for (i=0;i<variables.length;i++){
        if(divID==i+1){
            document.getElementById(variables[i]).style.display = 'block';
        }
        else{
            document.getElementById(variables[i]).style.display = 'none';
        }
    }
}

//esta función busca en la lista de compras al usuario que más a comprado, 
//o sea, el que en la lista tiene mayor cantidad..
function muestraMayorCantidadProductos(){
    var listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var mayorCantidad = 0;
    var idCliente = 0;
    var nombreCliente = "";
    listaCompras.forEach(function(element,index){
        if(element.cantidadCompras>mayorCantidad){
            mayorCantidad = element.cantidadCompras;
            idCliente = element.idClienteCompras;
        }
    })

    listaClientes.forEach(function(element,index){
        if(idCliente==element.id){
            nombreCliente = element.nombre;
        }
    })

    alert("El cliente que más compra fue "+nombreCliente);
    muestraMenorCantidadProductos();
    muestraMayorTotalProductos();
    muestraMenorTotalProductos();
}

//esta es la consulta que muestra el usuario que menos ha comprado (en cantidades) productos.
function muestraMenorCantidadProductos(){
    var listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var mayorCantidad=0;
    var idCliente = 0;
    var nombreCliente = "";

    listaCompras.forEach(function(element,index){
        if(index==0){
            mayorCantidad =element.cantidadCompras;
        }
        else{
            if(mayorCantidad>element.cantidadCompras){
                mayorCantidad = element.cantidadCompras;
                idCliente = element.idClienteCompras;
            }
        }

    })

    listaClientes.forEach(function(element,index){
        if(idCliente==element.id){
            nombreCliente = element.nombre;
        }
    })
    alert("El cliente que menos compró fue "+nombreCliente);
}



//esta es la consulta que muestra cual es el mejor comprador de la pagina,
//quiere decir que es el que más ha invertido en la aplicación.
function muestraMayorTotalProductos(){
    var listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var mayorCantidad = 0;
    var idCliente = 0;
    var nombreCliente = "";
    listaCompras.forEach(function(element,index){
        if(element.totalCompras>mayorCantidad){
            mayorCantidad = element.totalCompras;
            idCliente = element.idClienteCompras;
        }
    })

    listaClientes.forEach(function(element,index){
        if(idCliente==element.id){
            nombreCliente = element.nombre;
        }
    })
    alert("El cliente que más invirtió fue "+nombreCliente);
}

//esta es la consulta que muestra el usuario que menos ha comprado (en dinero) productos.
function muestraMenorTotalProductos(){
    var listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var mayorCantidad = 0;
    var idCliente = 0;
    var nombreCliente = "";

    listaCompras.forEach(function(element,index){
        if(index==0){
            mayorCantidad =element.totalCompras;
        }
        else{
            if(mayorCantidad>element.totalCompras){
                mayorCantidad = element.totalCompras;
                idCliente = element.idClienteCompras;
            }
        }

    })
    listaClientes.forEach(function(element,index){
        if(idCliente==element.id){
            nombreCliente = element.nombre;
        }
    })
    alert("El cliente que menos INVIRTIÓ fue "+nombreCliente);
}


//carga las categorias disponibles que se pueden elegir,
//en esta aplicación solo se escogieron 4 categorias de juegos..
//las carga al inicio, asi que cuando se agrega un producto el cliente solo puede
//seleccionar alguno de los 4
function cargarCategorias(categoria){
	$(document).ready(function(){
		var categorias = new Array("Guerra","Aventura","Estrategia","Extremos");
		var categoriaID = $(categoria);
		$.each(categorias, function(index, value){
			categoriaID.append($("<option>", {text : value
			}));
		});
	});
}

//modificar un producto, mediante el id. Se elige un id a modificar
//en los campos se llenan automaticamente con el cliente correspondiente,
//y luego se puede modificar
function modificarProducto(){
    var idsInputs=new Array("idModificar","nombreModificar","precioModificar",
                            "cantidadModificar","descripcionModificar","imagenModificar","categoriaModificar");
       
    if(comprobarVacio(idsInputs)==true){
        swal('Ops','You should complete all fields','info')
        return;
    }

    var id = document.getElementById('idModificar').value;
    var nombre = document.getElementById('nombreModificar').value;
    var precio = document.getElementById('precioModificar').value;
    var cantidad = document.getElementById('cantidadModificar').value;
    var descripcion = document.getElementById('descripcionModificar').value;
    var imagen = document.getElementById('imagenModificar').value;
    var categoria = document.getElementById('categoriaModificar').value;

    var lista = JSON.parse(localStorage.getItem("listaProductos"));

    var producto = { 'id': id, 'nombre': nombre, 'descripcion':descripcion,
                 'imagen': imagen,'cantidad': cantidad, 'precio': precio,'categoria':categoria};

    for(var i=0;i<lista.length;i++){
        if(lista[i].id==id){
            lista[i] = producto;
        }
    }
    localStorage.setItem("listaProductos", JSON.stringify(lista));
    swal('Good job!','Successful modification','success')
    vaciarInputs(idsInputs); //vaciar los inputs..
    mostrar(1);  //mostrar el menu principal de administrador.. */

}


//comrobar que no hayan espacios vacios
function comprobarVacio(lista){
    for(var i=0; i<lista.length; i++){
        if(document.getElementById(lista[i]).value==""){
            return true;
        }
    }
    return false;
}

//insertar un producto a la aplicación
//no se puede escoger un id repetido,
//como mejora, se pudo haber hecho un serial en el id. Pero se implementó así por comodidad.
function insertarProducto(){ 
    var idsInputs=new Array("idInput","nombreInput","precioInput",
                            "cantidadInput","descripcionInput","imagenInput","categoriaInput");
    if(comprobarVacio(idsInputs)==true){
        swal('Ops','You should complete all fields','info')
        return;
    }
    var existeID = false;
    var id = document.getElementById('idInput').value;
    var nombre = document.getElementById('nombreInput').value;
    var precio = document.getElementById('precioInput').value;
    var cantidad = document.getElementById('cantidadInput').value;
    var descripcion = document.getElementById('descripcionInput').value;
    var imagen = document.getElementById('imagenInput').value;
    var categoria = document.getElementById('categoriaInput').value;

    var lista = JSON.parse(localStorage.getItem("listaProductos"));

    for(var i=0; i<lista.length; i++){
        if(lista[i].id == id){
            swal('Sorry :/','That product with that ID already exists','info')
            existeID = true;
        }
    }

    if(existeID==false){
        var producto = { 'id': id, 'nombre': nombre, 'descripcion':descripcion,
                     'imagen': imagen,'cantidad': cantidad, 'precio': precio,'categoria':categoria};

        lista.push(producto);
        localStorage.setItem("listaProductos", JSON.stringify(lista));
        swal('Good job!','Inserted successfully','success')
        vaciarInputs(idsInputs); //vaciar los inputs..
        mostrar(1);  //mostrar el menu principal de administrador.. 
    }
}

//vacia todos los campos de los inputs dipsponibles, es una funcion auxiliar.
function vaciarInputs(listaIDS){
    for (i=0;i<listaIDS.length;i++){
        document.getElementById(listaIDS[i]).value="";
    }
}

//formulario de modificar
function cargarFormularioModificar(){
    var id = document.getElementById('idMod').value;
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    for(var i=0;i<listaProductos.length;i++){
        if(listaProductos[i].id == id){
            document.getElementById("idModificar").value = id;
            document.getElementById("nombreModificar").value= listaProductos[i].nombre;
            document.getElementById("descripcionModificar").value = listaProductos[i].descripcion;
            document.getElementById("imagenModificar").value= listaProductos[i].imagen;
            document.getElementById("cantidadModificar").value= listaProductos[i].cantidad;
            document.getElementById("precioModificar").value= listaProductos[i].precio;
            cargarCategorias(categoriaModificar);
        }
    }
}

//carga los id en el menu de modificar,
//los carga de acuerdo a los ids existentes. se hizo así por mayor comodidad.
function cargarIDSmodificar(){
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    var arrayIDS = [];

    for (var i=0; i<listaProductos.length; i++)
    {
        arrayIDS.push(listaProductos[i].id);
    }

    $('#idMod')[0].options.length = 0;
    var select = $("#idMod");
    $.each(arrayIDS, function(index, value){
        select.append($("<option>", {text : value}));
    });
}

//se cargan los id que se quieren eliminar..
function cargarIDSeliminar(){
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    var arrayIDS = [];
    for (var i=0; i<listaProductos.length; i++)
    {
        arrayIDS.push(listaProductos[i].id);
    }

    $('#idEliminar')[0].options.length = 0;
    var select = $("#idEliminar");
    $.each(arrayIDS, function(index, value){
        select.append($("<option>", {text : value}));
    });
}


//eliminar algun producto, mediante el id que selecciona
function eliminarProoducto() {
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    var idProducto = document.getElementById('idEliminar').value;

    if (idProducto==""){
        return;
    }

    for (var i=0; i<listaProductos.length; i++)
    {
        if(listaProductos[i].id == idProducto){
            listaProductos.splice(i, 1);
            localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
            swal(
                'Good job!',
                'successfully deleted',
                'success')
        }
    }
}     