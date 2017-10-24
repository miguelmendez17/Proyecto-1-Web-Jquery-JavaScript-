
//compobar que los datos estén vacíos, o si no para cargar la mini de base de datos
function comprobarCargarDatos(){

    var hayAdministradores = localStorage.getItem("listaAdministradores");
    var hayClientes = localStorage.getItem("listaClientes");
    var hayProductos = localStorage.getItem("listaProductos");

    if (hayAdministradores==null || hayClientes==null || hayProductos==null){
        cargarDatos();
    }
}

//aquí carga todos los datos que se van  a estar usando en toda la aplicación..
function cargarDatos(){
    var clientes = [{"id":"1","nombre":"juan","apellidos":"pedroo","edad":"18",
                "email":"hola@live.com","direccion":"frente al TEC","telefono":"66",
                "numeroTarjeta":"1234","codigoTarjeta":"123","fechaVencimiento":"12/19",
                "usuario":"juanito","contraseña":"juanito","estado":false,"tipo":"cliente"},

                {"id":"2","nombre":"pedro","apellidos":"pedrito","edad":"18",
                "email":"hola2@live.com","direccion":"frente al TEC dd","telefono":"6644",
                "numeroTarjeta":"1234","codigoTarjeta":"123","fechaVencimiento":"13/19",
                "usuario":"juancho","contraseña":"juancho","estado":true,"tipo":"cliente"}]; 

    var clientesToString = JSON.stringify(clientes);
    localStorage.setItem("listaClientes", clientesToString);

    var administradores = [{'nombre':'miguel','usuario': 'miguel', 'contraseña' : 'miguel'}, 
                        {'nombre':'kenneth','usuario' : 'kenneth','contraseña': 'kenneth'}, 
                        {'nombre':'pedro','usuario' : 'pedro','contraseña' : 'pedro'}];
    var administradoresToString = JSON.stringify(administradores);
    localStorage.setItem("listaAdministradores",administradoresToString);

    var productos = [
            {"id": 1, "nombre":"Twisted Metal 3","descripcion":"Nuevo",
            "imagen": "https://ugc.kn3.net/i/origin/http://images04.olx.com.ar/ui/11/72/51/1309316148_207267151_3-juegos-para-playstation-1-10-juegos-X-30-Villa-Lugano.jpg",
            "cantidad":12, "precio":10000,"categoria":"Guerra"},
            {"id": 2, "nombre":"Crash","descripcion":"Usado",
            "imagen": "https://upload.wikimedia.org/wikipedia/en/4/44/Crash_Bandicoot_Cover.png",
            "cantidad":80, "precio":15000,"categoria":"Aventura"},
            {"id": 3, "nombre":"Medievil","descripcion":"Usado",
            "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2g0Q7wv-hkVq5ez-6CykUy_mL1mIrLR8KRLsG094KXsqImVqh",
            "cantidad":30, "precio":14000,"categoria":"Estrategia"},
            {"id": 4, "nombre":"Bugs Bunny","descripcion":"Nuevo",
            "imagen": "https://k33.kn3.net/taringa/D/5/0/E/5/3/MarianoPalazzi/1D5.jpg",
            "cantidad":123, "precio":30000,"categoria":"Estrategia"},
            {"id": 5, "nombre":"Ruglats","descripcion":"Usado",
            "imagen": "http://images2.fanpop.com/images/photos/6700000/Nicktoons-nicktoons-video-games-6777892-256-258.jpg",
            "cantidad":34, "precio":5500,"categoria":"Aventura"},
            {"id": 6, "nombre":"Resident Evil 2","descripcion":"Nuevo",
            "imagen": "https://ugc.kn3.net/i/760x/http://i11d.3djuegos.com/juegos/6037/resident_evil_2/fotos/ficha/resident_evil_2-1720211.jpg",
            "cantidad":12, "precio":10000,"categoria":"Guerra"},
            {"id": 7, "nombre":"Simpsons","descripcion":"Usado",
            "imagen": "https://images-na.ssl-images-amazon.com/images/I/81GFMGkzFJL._SL1411_.jpg",
            "cantidad":100, "precio":5000,"categoria":"Extremos"}];

    var productosToString = JSON.stringify(productos);
    localStorage.setItem("listaProductos", productosToString);


    var deseos = [];
    var listaDeseos = JSON.stringify(deseos);
    localStorage.setItem("listaDeseos",listaDeseos);


    var carrito = JSON.stringify([]);
    localStorage.setItem("listaCarrito",carrito);

    var compra = JSON.stringify([]);
    localStorage.setItem("listaCompras",compra);
};


//aquí es para el de registrar, checkea que no exista un cliente con ese id
//que seleccione
function check() {
    var userName = document.getElementById('userName').value;
    var userPw = document.getElementById('fieldPassword').value;

    if(userName == "" && userPw ==""){
        return;
    }

    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
    var listaAdministradores = JSON.parse(localStorage.getItem("listaAdministradores"));

    for (var i=0; i<listaClientes.length; i++)
    {

        if((listaClientes[i].usuario == userName)&&(listaClientes[i].contraseña==userPw)){
            if((listaClientes[i].estado== false) && (listaClientes[i].tipo=="cliente")){
                swal('Ops','You are not active','info')
                var evento = document.getElementById('activarModal').style.display='block';
                verificaEstado(evento);
                return;
            }
            else{
                location.href="cliente.html";
                guardarSesion(listaClientes[i].nombre,userPw,listaClientes[i].id);
                return;
            }
        }
    }

    for (var i=0; i<listaAdministradores.length; i++)
    {
        if((listaAdministradores[i].usuario == userName)&&(listaAdministradores[i].contraseña==userPw)){
            location.href = "administrador.html";
            guardarSesion(listaAdministradores[i].nombre,userPw);
            return;
        }
    }

    swal(
      'Oops...',
      'Invalid user or password',
      'error'
    )
    
}     

//al inicio, en sessionStorage guarda dtos del cliente
function guardarSesion(nombre,contraseña,id){
    sessionStorage.setItem('nombre',nombre);
    sessionStorage.setItem('contraseña',contraseña);
    sessionStorage.setItem('id',id);

}

//funcion para registrar, aquí se abre un modal donde pondrá dtodos los datos de cliente
function registrar()
{
    var id = document.getElementById('idRegistro').value;
    var nombre = document.getElementById('nombreRegistro').value;
    var apellido = document.getElementById('apellidoRegistro').value;
    var edad = document.getElementById('edadRegistro').value;
    var email = document.getElementById('emailRegistro').value;
    var direccion = document.getElementById('direccionRegistro').value;
    var telefono = document.getElementById('telefonoRegistro').value;
    var numeroTarjeta = document.getElementById('numeroTarjetaRegistro').value;
    var codigoTarjeta = document.getElementById('codigoSeguridadRegistro').value;
    var fechaVencimiento = document.getElementById('vencimientoTarjetaRegistro').value;
    var usuario = document.getElementById('usernameRegistro').value;
    var contraseña = document.getElementById('passwordRegistro').value;

    var lista = JSON.parse(localStorage.getItem("listaClientes"));
    for (var i=0; i<lista.length; i++)
    {
        if(lista[i].id == id){
            swal('Ops','This ID already exist','info')
            return;
        }
    }

    var usuario = { 'id': id, 'nombre': nombre, 'apellidos': apellido,
                    'edad': edad, 'email': email, 'direccion':direccion,
                    'telefono':telefono,'numeroTarjeta':numeroTarjeta,'codigoTarjeta':codigoTarjeta,
                    'fechaVencimiento': fechaVencimiento, 'usuario': usuario, 'contraseña': contraseña};

    lista.push(usuario);
    localStorage.setItem("listaClientes", JSON.stringify(lista));
}  


//verificar si el usuario está activo o inactivo
function verificaEstado(event){
    var activar=document.getElementById('activarModal');
    if(event.target ==activar){
        activar.style.display="none";
    }
}

//entrar a la pagina ya sea de cliente o como administrador..
function entrar(){
    var inputNombre = document.getElementById('nombreActivar').value;
    var inputPassw = document.getElementById('passwordActivar').value;

    var listaClientes = JSON.parse(localStorage.getItem("listaClientes"));

    for (var i=0;i<listaClientes.length;i++){
        if((listaClientes[i].usuario == inputNombre)&&(listaClientes[i].contraseña==inputPassw)){
            if(listaClientes[i].estado==false){
                listaClientes[i].estado=true;
                localStorage.setItem("listaClientes", JSON.stringify(listaClientes)); 
                location.href="cliente.html";
                guardarSesion(listaClientes[i].nombre,inputPassw,listaClientes[i].id);
                return;
            }
        }
    }    

    swal(
      'Oops...',
      'Invalid user or password',
      'error'
    )

}