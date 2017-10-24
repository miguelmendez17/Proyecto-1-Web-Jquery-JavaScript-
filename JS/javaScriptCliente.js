var listaDeseosGlobal = JSON.parse(localStorage.getItem("listaDeseos"));
var listaProductosGlobal = JSON.parse(localStorage.getItem("listaProductos"));
var idClienteActual = sessionStorage.getItem('id');


//esta función guarda el usuario actual del sistema, lo toma de sessionStorage.
function mostrarUsuarioActual(){
     document.write("<li id='pruebali'><a id='icon-usuarioActual'>Nombre usuario actual: " + sessionStorage.getItem('nombre')+"<span class='glyphicon glyphicon-user'</span></a></li>");
}

function obtenerUsuarioActual(){
    $('#icon-usuarioActual').text("Nombre usuario actual: " + sessionStorage.getItem('nombre'));
}

$( document ).ready(function() {
    $('#cart-shop-display').hide();
    $('#vista-modificarInformacionCliente').hide();
    cargarNumeroEnCarrito();
    readyDeseos();
    invocarDeseos();
});

//envía el parametro de la categoría seleccionada, y va a mostar solo los juegos relacionados
//a esa categoría..
function mostrarPorCategorias(categoria){
    $("#content").empty();
    for(var i=0; i < listaProductosGlobal.length ; i++){
        if(listaProductosGlobal[i].categoria ==categoria){
            $('#content').append( 
                "<div class='col-md-3'>" +
                    "<div class='productbox'>"+
                        "<img src='"+ listaProductosGlobal[i].imagen +"' class='productoTamano' alt='Product IMG'>"+
                        "<div class='producttitle'>"+listaProductosGlobal[i].nombre+"</div>"+
                            "<p class='text-justify'>Precio: "+listaProductosGlobal[i].precio+"</p>"+
                            "<p class='text-justify'>Categoria: "+listaProductosGlobal[i].categoria+"</p>"+
                            "<p class='text-justify'>Cantidad disponible: "+listaProductosGlobal[i].cantidad+"</p>"+
                            "<p class='text-justify'>Descripción: "+listaProductosGlobal[i].descripcion+"</p>"+
                        "<div class='productprice'>"+
                        "<div class='pull-right'>"+
                            "<a href='#' onclick='agregaCantidadEnDeseos(\""+listaProductosGlobal[i].id+"\")' class='btn btn-warning btm-sm' role='button'>Wish<span class='glyphicon glyphicon-heart'></span></a>"+
                        "</div>"+

                        "<div class='col-xs-5'"+
                            "<div>"+   
                                "<input id=\""+i+i+"\"  class='form-control' min='0' type='number'>"+
                            "</div>"+
                        "</div>"+
                     
                        "<div class='pricetext' >"+
                            "<a href='#' onclick='agregarCarritoDesdeButtonAdd(\""+i+i+"\""+","+"\""+listaProductosGlobal[i].id+"\")' class='btn btn-success btm-sm' role='button'>Add<span class='glyphicon glyphicon-shopping-cart'></span></a>"+ 
                        "</div>"+    
                        "</div>"+
                    "</div>"+
                "</div>");
            }
        }
}


//carga los deseos disponibles, de acuerdo a la lista deseos
function readyDeseos(){
    $('#cart-shop-display').hide();
    $("#content").empty();
    $('#numeroDeseos').text(getDeseosClienteActual());
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    for(var i=0; i < listaProductos.length ; i++){
        //inserta productos en el div COntent
        $('#content').append( 
            "<div class='col-md-3'>" +
                "<div class='productbox'>"+
                    "<img src='"+ listaProductos[i].imagen +"' class='productoTamano' alt='Product IMG'>"+
                    "<div class='producttitle'>"+listaProductos[i].nombre+"</div>"+
                        "<p class='text-justify'>Precio: "+listaProductos[i].precio+"</p>"+
                        "<p class='text-justify'>Categoria: "+listaProductos[i].categoria+"</p>"+
                        "<p class='text-justify'>Cantidad disponible: "+listaProductos[i].cantidad+"</p>"+
                        "<p class='text-justify'>Descripción: "+listaProductos[i].descripcion+"</p>"+
                    "<div class='productprice'>"+
                        "<div class='pull-right'>"+
                            "<a href='#' onclick='agregaCantidadEnDeseos(\""+listaProductos[i].id+"\")' class='btn btn-warning btm-sm' role='button'>Wish<span class='glyphicon glyphicon-heart'></span></a>"+
                        "</div>"+
                        "<div class='col-xs-5'"+
                            "<div>"+   
                                "<input id=\""+i+"\" class='form-control' min='0' size='1' type='number'>"+
                            "</div>"+
                        "</div>"+
                        "<div class='pricetext' >"+
                            "<a href='#' onclick='agregarCarritoDesdeButtonAdd(\""+i+"\""+","+"\""+listaProductosGlobal[i].id+"\")' class='btn btn-success btm-sm' role='button'>Add<span class='glyphicon glyphicon-shopping-cart'></span></a>"+ 
                        "</div>"+      

                    "</div>"+
                "</div>"+
            "</div>");
    }
}

//agrega al carrito desde el button add. En el div de cada producto generado de manera generica
function agregarCarritoDesdeButtonAdd(idInput,idProductoParam){
    var cantidadInputActual = $("#"+idInput).val();
    var listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));

    var existeEnCarrito = false;

    if(cantidadInputActual==""||cantidadInputActual==0){
        return;
    }

    for(var a=0; a<listaCarrito.length; a++){
        if(listaCarrito[a].idProducto == idProductoParam){
            if(listaCarrito[a].idCliente==idClienteActual){
                existeEnCarrito = true;
            }
        }
    }
    if(existeEnCarrito==false){
        var objetoCarrito = {'idCliente':idClienteActual,
                             'idProducto': idProductoParam,
                             'cantidadElegido':cantidadInputActual};
        listaCarrito.push(objetoCarrito)
        localStorage.setItem("listaCarrito",JSON.stringify(listaCarrito));
    }
    $("#"+idInput).val(0);
    cargarNumeroEnCarrito();

}

//esta función es auxiliar, y es para que se muestre a la par del icno del carrito
//cuantos hay en cada momento..
function cargarNumeroEnCarrito(){
    var listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    var cuentaCantidadEnCarrito = 0;
    for(var a=0; a<listaCarrito.length; a++){
        if(listaCarrito[a].idCliente == idClienteActual){
            cuentaCantidadEnCarrito+=1;
        }
    }
    $('#numeroCarrito').text(cuentaCantidadEnCarrito); 
}

//aquí carga los productos que están en la lista de carritos,
//para que así se puedan visualizar de mejor manera, de aquí puede eliminar el que quiere
//o su compra.. 
function loadCarrito() {
    var listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    totalCarritoGlobal = 0;
    for (var a=0;a<listaCarrito.length;a++){
        for(var i=0; i<listaProductos.length ; i++){
            if((listaProductos[i].id == listaCarrito[a].idProducto)&&(listaCarrito[a].idCliente==idClienteActual)){
                var cantidadApagar= listaCarrito[a].cantidadElegido*listaProductos[i].precio;
                totalCarritoGlobal+=cantidadApagar;
                $('#cart-shop').append(
                "<div class='col-md-2'>" +
                "<div class='productbox'>"+
                "<img src='"+ listaProductos[i].imagen +"' class='productoTamanoCarrito' alt='Product IMG'>"+
                "<div class='producttitle'>"+listaProductos[i].nombre+"</div>"+
                "<p class='text-justify'>Precio: "+listaProductos[i].precio+"</p>"+
                "<p class='text-justify'>Categoria: "+listaProductos[i].categoria+"</p>"+
                "<p class='text-justify'>Cantidad en carrito: "+listaCarrito[a].cantidadElegido+"</p>"+
                "<p class='text-justify'>Descripción: "+listaProductos[i].descripcion+"</p>"+
                "<p class='text-justify'>Cantidad total: "+cantidadApagar+"</p>"+
                "<div class='productprice'>"+
                "<div class='pull-right'>"+
                 "</div>"+
                "<div class='pricetext' >"+
                "<a  href='#' onclick='eliminarCarrito(\""+cantidadApagar+"\""+","+"\""+listaProductos[i].id+"\")' class='btn btn-warning btm-sm' role='button'>Delete<span class='glyphicon glyphicon-remove'></span></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>");
            }
        }
    }
    $('#cart-total').text("₡"+totalCarritoGlobal);
}

//función para eliminar un producto del carrito de compras, a nivel de vista y lógica..
var totalCarritoGlobal = 0;
function eliminarCarrito(cantidadPagar, id) {
    var listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    var index = 0;
    listaCarrito.forEach(function(element) {
        if((element.idCliente == idClienteActual)&&(element.idProducto==id)){
            totalCarritoGlobal -= cantidadPagar;
            $('#cart-total').text("₡"+totalCarritoGlobal);
            $('#cart-shop').empty();
            listaCarrito.splice(index,1);  
            localStorage.setItem("listaCarrito",JSON.stringify(listaCarrito));
            cargarNumeroEnCarrito();
            loadCarrito();
            return;
        }
        index+=1;
    });
}

//para validar que no se cargue en lista carritos cada vez que aprete el icono del carrito
var yaSeMostraron = false;
$(document).on('click', '#btn-car-shop', function () {
    if(yaSeMostraron==false){
        loadCarrito();
        $('#wrapper').hide();
        $('#cart-shop-display').show();
        yaSeMostraron = true;
    }

});


//este es el click del boton aceptar, esto es cuando quiere aceptar una compra. Cuando está seguro
$(document).on('click', '#botonAceptarComprar', function () {
    var numTarjeta = $('#numeroTarjetaModal').val();
    var codSeguridad = $('#codigoSeguridadModal').val();
    var fechVencimiento = $('#fechaVencimientoModal').val();
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var esCliente = false;

    if(numTarjeta==""||codSeguridad==""||fechVencimiento==""){
        return;
    }

    listaClientes.forEach(function(element,index) {
        if(element.numeroTarjeta==numTarjeta&&element.codigoTarjeta==
            codSeguridad&&element.fechaVencimiento==fechVencimiento&&
            element.id==idClienteActual){
            esCliente = true;
        }
    })

    if(esCliente==true){
        compra();
    }
    else{
        swal('Ops','Invalid information','info')
    }
    document.getElementById('comprarModal').style.display = 'none';
});

//función principal, es para comprar un desde lista de carrito. A´quí se va disminuyendo la cantidad disponible
//de cada producto. Se agrega a lista de compras, etc. Es la función principal de la app
function compra(){
    var listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
    var listaCarritoAux = JSON.parse(localStorage.getItem("listaCarrito"));
    var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    var listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
    var cantidadTotal = 0;
    var problem = false;
    listaCarrito.forEach(function(element,index) {
        for(var i=0;i<listaProductos.length;i++){
            if((listaProductos[i].id==element.idProducto)&&(element.idCliente==idClienteActual)){
                if(listaProductos[i].cantidad>=element.cantidadElegido){
                    cantidadTotal+=parseInt(element.cantidadElegido);
                    listaProductos[i].cantidad-=element.cantidadElegido;
                    localStorage.setItem("listaProductos",JSON.stringify(listaProductos));
                }
                else{
                    problem = true;
                    swal('Ops',"Problem with: ("+listaProductos[i].nombre+"), We do not have that quantity of products available" ,'info')
                }
               
            }
        }
    })
    if(problem==false){
        listaCarrito.forEach(function(element,index){
            for(var i=0;i<listaCarritoAux.length;i++){
                if(listaCarritoAux[i].idCliente==idClienteActual){
                    listaCarritoAux.splice(i,1);
                }
            }
        })
    }
  

    localStorage.setItem("listaCarrito",JSON.stringify(listaCarritoAux));

    var entra = false;
    if(problem==false){
        listaCompras.forEach(function(element,index){
        if(element.idClienteCompras==idClienteActual){
            element.cantidadCompras+=cantidadTotal;
            element.totalCompras+=totalCarritoGlobal;
            localStorage.setItem("listaCompras",JSON.stringify(listaCompras));
            entra = true;    
            muestraMensajeOk();
            cargarNumeroEnCarrito();
            $('#wrapper2').hide();
            totalCarritoGlobal=0;
            $('#cart-total').text("₡"+totalCarritoGlobal);        
        }
        })
    }

    if(entra==false&&problem==false){
        var producto = {'idClienteCompras':idClienteActual,'cantidadCompras':cantidadTotal,
                    'totalCompras':totalCarritoGlobal};
        listaCompras.push(producto);
        localStorage.setItem("listaCompras",JSON.stringify(listaCompras));            
        muestraMensajeOk();
        cargarNumeroEnCarrito();
        $('#wrapper2').hide();
        totalCarritoGlobal=0;
        $('#cart-total').text("₡"+totalCarritoGlobal);
    }
}

//función auxiliar, se creó porque daba error algunas veces si se hacía de otra forma..
function muestraMensajeOk(){
    swal('Ok',"Excellent" ,'success')
}

//confirmación para comprar, aquí es donde levanta el modal para que digite los datos de la tarjeta
$(document).on('click', '#btn-confirmarCompra', function () {
    document.getElementById('comprarModal').style.display = 'block';
});

//cuando se le da click al boton de editar información, aquí le da el valor por defecto que tiene
//cada cliente, mediante el id del usuario actual
$(document).on('click', '#btn-editarInformacionCliente', function () {
    $('#wrapper').hide();
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    listaClientes.forEach(function(element) {
        if(element.id==idClienteActual){
            $('#nombreModificarCliente').val(element.nombre); 
            $('#apellidoModificarCliente').val(element.apellidos); 
            $('#edadModificarCliente').val(element.edad); 
            $('#emailModificarCliente').val(element.email); 
            $('#direccionModificarCliente').val(element.direccion);
            $('#telefonoModificarCliente').val(element.telefono);
            $('#numeroTarjetaModificarCliente').val(element.numeroTarjeta); 
            $('#codigoTarjetaModificarCliente').val(element.codigoTarjeta); 
            $('#vencimientoTarjetaModificarCliente').val(element.fechaVencimiento); 
            $('#contraseñaModificarCliente').val(element.contraseña); 
            $('#usuarioModificarCliente').val(element.usuario); 
        }    
    })
    $("#vista-modificarInformacionCliente").show();
});

//aquí es donde se toman los datos del cliente, para que cuando le dé click y acepte, se guarde autimaticamente y 
//se modifique en la lista de clientes. 
$(document).on('click', '#btn-modificarCliente', function () {
    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    listaClientes.forEach(function(element,index) {
        if(element.id==idClienteActual){
            nombre = $('#nombreModificarCliente').val();
            apellidos = $('#apellidoModificarCliente').val(); 
            edad= $('#edadModificarCliente').val(); 
            email=$('#emailModificarCliente').val(); 
            direccion=$('#direccionModificarCliente').val();
            telefono = $('#telefonoModificarCliente').val();
            numeroTarjeta = $('#numeroTarjetaModificarCliente').val(); 
            codigoTarjeta = $('#codigoTarjetaModificarCliente').val(); 
            fechaVencimiento=$('#vencimientoTarjetaModificarCliente').val(); 
            contraseña=$('#contraseñaModificarCliente').val(); 
            usuario =$('#usuarioModificarCliente').val(); 

            var cliente = {'id':idClienteActual,'nombre':nombre,'apellidos':apellidos,'edad':edad,'email':email,
                            'direccion':direccion,'telefono':telefono,'numeroTarjeta':numeroTarjeta,
                            'codigoTarjeta':codigoTarjeta,'fechaVencimiento':fechaVencimiento,
                            'contraseña':contraseña,'usuario':usuario,'estado':true};
            listaClientes[index] = cliente;

            sessionStorage.setItem('nombre',nombre);
            sessionStorage.setItem('contraseña',contraseña);
            sessionStorage.setItem('id',element.id);

            localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
            swal('Good job!','Successful modification','success')
            obtenerUsuarioActual();
        }    
    })
});



//invocar los deseos, lo hace conforme a los que hay en la lista de deseos. 
function invocarDeseos(){
    $('#invocaDeseos').empty();
    $('#invocaDeseos').append(
    "<div id='carritoClickk' class='container' style='display:none; overflow: auto;height:500px;'>"+
        "<div class='shopping-cart'>"+
            "<div class='shopping-cart-header'>"+
                "<div class='shopping-cart-total'>"+
                "</div>"+
            "</div>"+   
            "<ul  class='shopping-cart-items'>"+
                cargarItemsGustados()+
            "</ul>"+
            "<a style='text-decoration:none' href='#' id='pasarDeseoAcarritoID' class='button'>Add To Cart</a>"+
            "<a style='text-decoration:none' href='#' id='removerTodo' class='buttonRemove'>Remove all wishes</a>"+
        "</div>"+
    "</div>");
}

//en onclick de remover todo, remueve todos los deseos asociados al id de usuario actual
$(document).on('click', '#removerTodo', function () {
    eliminarDeDeseos();
    invocarDeseos();

});

//en onclick de remover todo, remueve todos los deseos asociados al id de usuario actual
function eliminarDeDeseos(){
    var listaDeseos = JSON.parse(localStorage.getItem("listaDeseos"));
    var listaDeseos2 = JSON.parse(localStorage.getItem("listaDeseos"));
    listaDeseos.forEach(function(element) {
        for(var a=0;a<listaDeseos.length;a++){
            if(listaDeseos[a].idcliente==idClienteActual){
                listaDeseos2.splice(a,1);
            }
        }   
    });
    localStorage.setItem("listaDeseos", JSON.stringify(listaDeseos2));
    $('#numeroDeseos').text(getDeseosClienteActual()); 
}


//este no se pudo implementar.. Retorna ya que no hace nada..
$(document).on('click', '#pasarDeseoAcarritoID', function () {
    return;
});

//aquí muestra los productos que están en la lista de deseos.
function cargarItemsGustados(){ 
    var listaDeseos = JSON.parse(localStorage.getItem("listaDeseos"));
    var stringItemsDeseados="";
    var banderaVacia = false;
    for(var a=0; a<listaDeseos.length; a++){
        for(var i=0; i<listaProductosGlobal.length;i++){
            if((listaDeseos[a].idproducto == listaProductosGlobal[i].id)&&(listaDeseos[a].idcliente==idClienteActual)){
                banderaVacia =true;
                stringItemsDeseados+="<li class='clearfix'>"
                stringItemsDeseados+="<img src='"+ listaProductosGlobal[i].imagen +"' class='productoEnDeseos' alt='item'/>";
                stringItemsDeseados+="<span class='item-name'>Nombre: "+listaProductosGlobal[i].nombre+"</span>";
                stringItemsDeseados+="<span class='item-price'>Precio: "+listaProductosGlobal[i].precio+"</span>";
                stringItemsDeseados+="</li>";
            }
        }
    }
    if(banderaVacia==true){
         return stringItemsDeseados;  
    }
    else{
        stringItemsDeseados = "<span class='item-name'>Lista deseos vacío</span>";
        return stringItemsDeseados;
    }
}

//función auxiliar, y es para retornar los deseos del cliente actual..
function getDeseosClienteActual(){
    var listaDeseos = JSON.parse(localStorage.getItem("listaDeseos"));
    var deseosClienteActual = 0;
    for(var i=0;i<listaDeseos.length;i++){
        if(listaDeseos[i].idcliente==idClienteActual){
            deseosClienteActual+=1;
        }
    }
    return deseosClienteActual;
}

//aquí se va modificar el icono que está a la par de la lista deseos, para ir
//visualizando cuantos hay
function agregaCantidadEnDeseos(id){
    var listaDeseos = JSON.parse(localStorage.getItem("listaDeseos"));
    var yaEstaEnDeseos = false;

    for(var i=0; i<listaDeseos.length;i++){
        if((listaDeseos[i].idproducto ==id)&&(listaDeseos[i].idcliente==idClienteActual)){
            yaEstaEnDeseos=true;
        }
    }
    if((yaEstaEnDeseos==false)||(listaDeseos.length==0)){
        var deseos = {'idproducto':id,'idcliente':idClienteActual};
        listaDeseos.push(deseos);
        localStorage.setItem("listaDeseos",JSON.stringify(listaDeseos)); 
        $('#numeroDeseos').text(getDeseosClienteActual()); 
    }
    invocarDeseos();
}

//función auxiliar, se tuvo que implementar de esta forma porque de otra daba error..
function ok(){
    var prueba = document.getElementById('carritoClickk').style.display;

    if(prueba=='block'){
        document.getElementById('carritoClickk').style.display = 'none';
    }
    else{
        document.getElementById('carritoClickk').style.display = 'block';
    }
}

//volver al menu principal, refresca la pagina para guardar los cambios..
$(document).on('click','#btn-volverPrincipal', function () {
    location.reload();
});


//aquí es para darse de baja, cuando le da click aparece un mensaje de confirmación.
//si le da cancelar, se la cancela la operación. Sino, se pone inactivo y vuelve al login para 
//se vuelva a activar en el sistema..
$(document).on('click','#btn-darseBaja', function () {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText: 'Yes, drop out!'
    }).then(function () {
        var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
          listaClientes.forEach(function(element) {
            if(element.id==idClienteActual){
                element.estado = false;
                localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
                location.href= "principal.html";
            }
        })

    })
});





