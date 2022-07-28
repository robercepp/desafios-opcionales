/* Este proyecto es un módulo eCommerce para una pagina ya existente de una Ilustradora Gráfica. la idea es crear un catalogo de productos a vender, implementar un carrito de compras donde cargarlos, y añadir un modulo de pagos y encargos */

//Anabella Avena - Ilustradora Gráfica - módulo eCommerce.

//Constructor de Productos.
class Producto {
    constructor(id, tipo, nombre, precio, stockDisponible) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = stockDisponible;
        this.stockDisponible = parseInt(stockDisponible);
    }
}
//esto debe ir aquí arriba sino no anda nada... :(
const catalogoDeBusqueda = [];
const carritoDeCompras = [];

// Creando Productos
//Libretas
const libretaChicasGamer = new Producto(0, "Libreta", "Libreta de Chicas Gamer", 12.5, 10);
const libretaSixFanarts = new Producto(1, "Libreta", "Libreta de Six Fanarts", 10.5, 15);
const libretaLuluMartins = new Producto(2, "Libreta", "Libreta de Lulu Martins", 11.0, 6);
const libretaChristineHug = new Producto(3, "Libreta", "Libreta de Christine Hug", 12.0, 8);

//Stickers
const stickerSirenas = new Producto(4, "Sticker", "Stickers de Sirenas", 3.50, 6);
const stickerChicas = new Producto(5, "Sticker", "Stickers de Chicas", 3.0, 7);
const stickerHalloween = new Producto(6, "Sticker", "Stickers de Halloween", 2.75, 10);
const stickerAnimales = new Producto(7, "Sticker", "Stickers de Animales", 3.5, 10);

//Posters
const posterNocheVerano = new Producto(8, "Poster", "Poster de una Noche de Verano", 5.75, 6);
const posterAmantesMariposa = new Producto(9, "Poster", "Poster de Amantes Mariposa", 6.0, 8);
const posterDeSanValentin = new Producto(10, "Poster", "Poster de San Valentín espacial", 5.0, 10);
const posterDeGatos = new Producto(11, "Poster", "Poster de Gatos", 5.50, 7);

//Se crea el catálogo de búsqueda
catalogoDeBusqueda.push(libretaChicasGamer, libretaSixFanarts, libretaLuluMartins, libretaChristineHug, stickerSirenas, stickerChicas, stickerHalloween, stickerAnimales, posterNocheVerano, posterAmantesMariposa, posterDeSanValentin, posterDeGatos);

//variables y constantes generales
let nombre = "";
let apellido = "";
const iva = 1.21;

let titulo = document.createElement("h4");
document.getElementsByClassName("titulo-relativo")[0].appendChild(titulo);
let contenido = document.createElement("p");
document.getElementsByClassName("contenido")[0].appendChild(contenido);
let alerta = document.createElement("p");
document.getElementsByClassName("alertas")[0].append(alerta);


const tituloMenuPrincipal = "---Menu Principal---";
const tituloMenuBusqueda = "---Menu de Busqueda---";
const tituloMenuLibretas = "---Menú de Libretas---";
const tituloMenuStickers = "---Menú de Stickers---";
const tituloMenuPosters = "---Menú de Posters---";
const tituloMenuCarrito = "---Carrito de compras---";
const tituloQuitarElementos = "---Quitar Elementos del Carrito---";
const introMenuPrincipal = "Bienvenido/a al simulador de tienda, aquí podrás ver mi catálogo de items en venta.<br />Por favor elige una opción:<br />1-Buscar Item<br />2-Libretas<br />3-Stickers<br />4-Posters<br />5-Ir al carrito de compras<br />6-Salir";
const introMenuBusqueda = "---Buscador de Productos---<br />Escriba el tipo o el nombre del ítem que esté buscando.<br />Pista: puede ser un tipo como 'Sticker' o 'Poster', o alguna palabra clave.<br />Escriba '0' para volver al menú principal.";

const introMenu = (clase) => {
    return "Por favor elija una opción para agregar al carrito: <br/><br/>" + CONTEO(clase) + "<br/>0- Volver al menú anterior.<br/> <br/>Nota: Los precios no incluyen i.v.a."
}

const introCarrito = () => {
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    const cantidadProductos = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.cantidad;
    }, 0);
    const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "<br />Subtotal: $" + carritoDeCompras.subtotal + "<br />");
    return "Repasemos lo que has cargado en el carrito antes de confirmar...<br/><br/>La cantidad de Items son: " + cantidadProductos + "<br/>Un resumen de los Items que pediste:<br/>" + listadoCarrito + "<br/>El costo total (Incluyendo IVA) es de: $" + (precioConIva.toFixed(2) + "-.") + "<br/>Elige una opción:<br/>1-Pagar monto.<br/>2-Quitar elementos del carrito.<br/>3-Volver atrás.<br/>4-Cancelar compra."
}

const introCierreCompra = "Por favor introduzca a continuación un correo electrónico para poder enviarte los productos.";



//Esta función con argumento funciona para filtrar varios elementos del catalogo sin tener que repetir el mismo código en cada menú. 
function CONTEO(clase) {
    const conteo = [];
    const lista = catalogoDeBusqueda.filter(producto => producto.tipo == clase);
    let numeracion = 0;
    const enumerador = (funcion, lista) => {
        for (const item of lista) {
            numeracion = numeracion + 1;
            funcion(item);
        }
    }
    enumerador((lista) => {
        conteo.push(numeracion + "- " + lista.nombre + ",\n Precio: $" + lista.precio + ", Stock: " + lista.stock + ".");
    }, lista);
    return conteo.join("<br/>");
}


//A partir de aquí comienza el menú...
nombre = prompt("Ingrese su nombre de pila (su apellido se lo preguntaremos luego).");
apellido = prompt("Ingrese su apellido.");

let bienvenido = document.createElement("p");
bienvenido.innerHTML = "bienvenido " + nombre;
document.getElementsByClassName("bienvenido")[0].appendChild(bienvenido);

MENUPRINCIPAL();

function MENUPRINCIPAL() {
    titulo.innerHTML = tituloMenuPrincipal;
    contenido.innerHTML = introMenuPrincipal;
    window.setTimeout(OPCIONES, 0);

    function OPCIONES() {
        let menuOpcion = parseInt(prompt("Ingrese una opción"));
        if (menuOpcion >= 1 && menuOpcion <= 6) {
            switch (menuOpcion) {
                case 1:
                    titulo.innerHTML = tituloMenuBusqueda;
                    contenido.innerHTML = introMenuBusqueda;
                    alerta.replaceChildren();
                    window.setTimeout(MENUBUSQUEDA, 0);
                    break;
                case 2:
                    titulo.innerHTML = tituloMenuLibretas;
                    contenido.innerHTML = introMenu("Libreta");
                    alerta.replaceChildren();
                    window.setTimeout(MENU("Libreta"), 0);
                    break;
                case 3:
                    titulo.innerHTML = tituloMenuStickers;
                    contenido.innerHTML = introMenu("Sticker");
                    alerta.replaceChildren();
                    window.setTimeout(MENU("Sticker"), 0);
                    break;
                case 4:
                    titulo.innerHTML = tituloMenuPosters;
                    contenido.innerHTML = introMenu("Poster");
                    alerta.replaceChildren();
                    window.setTimeout(MENU("Poster"), 0);
                    break;
                case 5:
                    titulo.innerHTML = tituloMenuCarrito;
                    contenido.innerHTML = introCarrito();
                    alerta.replaceChildren();
                    window.setTimeout(MENUCARRITO, 0);
                    break;
                case 6:
                    window.setTimeout(EXITPROGRAM(), 0);
                    break;
            }
        } else {
            window.setTimeout(ALERTA, 0);

            function ALERTA() {
                alerta.innerHTML = "Por favor elija una opción del 1 al 6. volvamos a intentarlo.";
                window.setTimeout(MENUPRINCIPAL, 0);
            }
        }
    }
}

function MENUBUSQUEDA() {
    let busqueda = prompt("Ingrese algún dato.");
    if (busqueda === "0") {
        titulo.innerHTML = tituloMenuBusqueda;
        contenido.innerHTML = introMenuBusqueda;
        alerta.replaceChildren();
        window.setTimeout(MENUPRINCIPAL, 0);
    } else {
        const encontrado = catalogoDeBusqueda.filter(producto => producto.tipo.toLowerCase().includes(busqueda.toLowerCase()) || producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));
        if (encontrado.length == 0) {
            alerta.innerHTML = "Lo sentimos," + " '" + busqueda + "' " + "no ha arrojado ninún resultado, lo intentamos de nuevo?";
            window.setTimeout(MENUBUSQUEDA, 0);
        } else {
            const conteo = [];
            let numeracion = 0;
            const listaDeBusqueda = (funcion, encontrado) => {
                for (const item of encontrado) {
                    numeracion = numeracion + 1;
                    funcion(item);
                }
            }
            listaDeBusqueda((encontrado) => {
                conteo.push(numeracion + "- Tipo: " + encontrado.tipo + ", Nombre: " + encontrado.nombre + ", Precio: $" + encontrado.precio + " Stock: " + encontrado.stock + ".");
            }, encontrado);
            contenido.innerHTML = "Hemos encontrado:<br />" + conteo.join("<br />") + "<br />Seleccione el ítem que desee agregar al carrito: <br />0- Volver al menú de Busqueda.";
            alerta.replaceChildren();
            window.setTimeout(OPCIONBUSQUEDA, 0);

            function OPCIONBUSQUEDA() {
                let menuOpcion = parseInt(prompt("Ingrese una Opción"));
                if (menuOpcion > 0 && menuOpcion <= conteo.length) {
                    if (catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock > 0) {
                        alerta.innerHTML = "Cuantos/as " + encontrado[(menuOpcion - 1)].nombre + " desea agregar al carrito?";
                        window.setTimeout(OPCIONCANTIDAD, 0);

                        function OPCIONCANTIDAD() {
                            let cantidades = parseInt(prompt("Ingrese cantidad"));
                            if (catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock >= cantidades) {
                                if (cantidades >= 1) {
                                    catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock = catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock - cantidades;
                                    carritoDeCompras.push({
                                        id: catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].id,
                                        tipo: catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].tipo,
                                        cantidad: cantidades,
                                        nombre: catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].nombre,
                                        subtotal: (cantidades * catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].precio)
                                    });
                                    if (cantidades == 1) {
                                        alerta.innerHTML = catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].nombre + " ha sido añadido al carrito.";
                                        contenido.innerHTML = introMenuBusqueda;
                                        window.setTimeout(MENUBUSQUEDA, 0);
                                    } else {
                                        alerta.innerHTML = cantidades + "x " + catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].nombre + " han sido añadidos al carrito.";
                                        contenido.innerHTML = introMenuBusqueda;
                                        window.setTimeout(MENUBUSQUEDA, 0);
                                    }
                                } else {
                                    alerta.innerHTML = "Atención: Debes escribir un numero entero mayor a 1.";
                                    contenido.innerHTML = introMenuBusqueda;
                                    window.setTimeout(MENUBUSQUEDA, 0);
                                }
                            } else {
                                alerta.innerHTML = "Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock + " unidades o menos.";
                                contenido.innerHTML = introMenuBusqueda;
                                window.setTimeout(MENUBUSQUEDA, 0);
                            }
                        }
                    } else {
                        alerta.innerHTML = "Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.";
                        contenido.innerHTML = introMenuBusqueda;
                        window.setTimeout(MENUBUSQUEDA, 0);
                    }
                } else if (menuOpcion == 0) {
                    window.setTimeout(MENUPRINCIPAL, 0);
                } else {
                    alerta.innerHTML = "Entrada incorrecta, Volviendo al menú anterior...";
                    window.setTimeout(MENUBUSQUEDA, 0);
                }
            }
        }
    }
}

function MENU(clase) {
    const lista = catalogoDeBusqueda.filter(producto => producto.tipo == clase);
    contenido.innerHTML = "Por favor elija una opción para agregar al carrito: <br/><br/>" + CONTEO(clase) + "<br/>0- Volver al menú anterior.<br/> <br/>Nota: Los precios no incluyen i.v.a."

    window.setTimeout(OPCION, 0);

    function OPCION() {
        let menuOpcion = parseInt(prompt("Ingrese una Opción."));
        if (menuOpcion > 0 && menuOpcion <= CONTEO(clase).length) {
            if (catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock > 0) {
                alerta.innerHTML = "Cuantos/as " + lista[(menuOpcion - 1)].nombre + " desea agregar al carrito?";
                window.setTimeout(OPCIONCANTIDAD, 0);

                function OPCIONCANTIDAD() {
                    let cantidades = parseInt(prompt("Ingrese cantidad"));
                    if (catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock >= cantidades) {
                        if (cantidades >= 1) {
                            catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock = catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock - cantidades;
                            carritoDeCompras.push({
                                id: catalogoDeBusqueda[lista[(menuOpcion - 1)].id].id,
                                tipo: catalogoDeBusqueda[lista[(menuOpcion - 1)].id].tipo,
                                cantidad: cantidades,
                                nombre: catalogoDeBusqueda[lista[(menuOpcion - 1)].id].nombre,
                                subtotal: (cantidades * catalogoDeBusqueda[lista[(menuOpcion - 1)].id].precio)
                            });
                            if (cantidades == 1) {
                                alerta.innerHTML = catalogoDeBusqueda[lista[(menuOpcion - 1)].id].nombre + " ha sido añadido al carrito.";
                                window.setTimeout(MENU(clase), 0);
                            } else {
                                alerta.innerHTML = cantidades + "x " + catalogoDeBusqueda[lista[(menuOpcion - 1)].id].nombre + " han sido añadidos al carrito.";
                                window.setTimeout(MENU(clase), 0);
                            }
                        } else {
                            alerta.innerHTML = "Atención: Debes escribir un numero entero mayor a 1.";
                            window.setTimeout(MENU(clase), 0);
                        }
                    } else {
                        alerta.innerHTML = "Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock + " unidades o menos.";
                        window.setTimeout(MENU(clase), 0);
                    }
                }
            } else {
                alerta.innerHTML = "Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.";
                window.setTimeout(MENU(clase), 0);
            }
        } else if (menuOpcion == 0) {
            window.setTimeout(MENUPRINCIPAL(), 0);
        } else {
            alerta.innerHTML = "Entrada incorrecta, Volviendo al menú anterior...";
            window.setTimeout(MENU(clase), 0);
        }
    }
}

function MENUCARRITO() {
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    const cantidadProductos = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.cantidad;
    }, 0);
    let pago;
    pago = parseFloat(pago);
    let menuOpcion = 0;
    window.setTimeout(OPCION, 0);

    function OPCION() {
        menuOpcion = parseInt(prompt("Ingrese una Opción"));
        if (menuOpcion >= 1 && menuOpcion <= 4) {
            switch (menuOpcion) {
                case 1:
                    if (cantidadProductos > 0) {
                        alerta.innerHTML = "La suma Total a pagar es de: $ " + precioConIva.toFixed(2) + "<br />Por favor ingrese el monto especificado arriba para acreditar pago...";
                        window.setTimeout(CASO1, 0);

                        function CASO1() {
                            pago = prompt("Ingrese un monto ($)");
                            if (pago == precioConIva.toFixed(2)) {
                                alerta.innerHTML = "El pago de: $" + precioConIva.toFixed(2) + " se ha acreditado correctamente.";
                                contenido.innerHTML = introCierreCompra;
                                window.setTimeout(CIERREDECOMPRA(), 0);
                            } else if (pago > precioConIva) {
                                let vuelto = pago - precioConIva.toFixed(2);
                                alerta.innerHTML = "Al parecer nos has enviado mas dinero del que era necesario, por ello te reenviamos $" + vuelto.toFixed(2) + " como vuelto por tu compra.";
                                contenido.innerHTML = introCierreCompra;
                                window.setTimeout(CIERREDECOMPRA(), 0);
                            } else if (pago < precioConIva && pago > 0) {
                                let pagoInsuficiente = precioConIva.toFixed(2) - pago;
                                alerta.innerHTML = "Vaya!, al parecer has pagado $" + pago + ". Lamentablemente te faltan $" + pagoInsuficiente.toFixed(2) + " para completar los $" + precioConIva.toFixed(2) + " que se necesitan.\nTe devolvemos el dinero, Volvamos a completar la transacción.";
                                window.setTimeout(MENUCARRITO(), 0);
                            } else if (pago <= 0) {
                                alerta.innerHTML = "Atención, no puedes pagar ingresando números negativos<br />Intentemos nuevamente.";
                                window.setTimeout(MENUCARRITO(), 0);
                            }
                        }
                    } else {
                        alerta.innerHTML = "Lo sentimos. no puedes continuar si no has cargado ningun ítem en el carrito, te enviaremos de vuelta al menú de compras.";
                        window.setTimeout(MENUPRINCIPAL(), 0);
                    }
                    break;
                case 2:
                    titulo.innerHTML = tituloQuitarElementos;
                    contenido.innerHTML = introQuitar();
                    window.setTimeout(QUITARELEMENTOS(), 0);
                    break;
                case 3:
                    window.setTimeout(MENUPRINCIPAL(), 0);
                    break;
                case 4:
                    window.setTimeout(EXITPROGRAM(), 0);
                    break;
            }
        } else {
            alerta.innerHTML = "Por favor ingrese un número del 1 al 4.";
            window.setTimeout(MENUCARRITO(), 0);
        }
    }
}

const introQuitar = () => {
    const conteo = [];
    let numeracion = 0;
    const listaItemsBorrar = (funcion, carritoDeCompras) => {
        for (const item of carritoDeCompras) {
            numeracion = numeracion + 1;
            funcion(item);
        }
    }
    listaItemsBorrar((carritoDeCompras) => {
        conteo.push(numeracion + "- " + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + ".");
    }, carritoDeCompras);
    return "Los Ítems cargados en el carrito de compras:<br />" + conteo.join("<br />") + "<br />Elija el Ítem que desea eliminar<br />0- para volver al menú anterior."
}

function QUITARELEMENTOS() {
    const conteo = [];
    let numeracion = 0;
    const listaItemsBorrar = (funcion, carritoDeCompras) => {
        for (const item of carritoDeCompras) {
            numeracion = numeracion + 1;
            funcion(item);
        }
    }
    listaItemsBorrar((carritoDeCompras) => {
        conteo.push(numeracion + "- " + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + ".");
    }, carritoDeCompras);
    window.setTimeout(OPCION, 0);

    function OPCION() {
        let menuOpcion = parseInt(prompt("Ingrese una Opción."));
        if (menuOpcion > 0 && menuOpcion <= conteo.length) {
            catalogoDeBusqueda[carritoDeCompras[(menuOpcion - 1)].id].stock = catalogoDeBusqueda[carritoDeCompras[(menuOpcion - 1)].id].stock + carritoDeCompras[(menuOpcion - 1)].cantidad;
            let borrado = carritoDeCompras.splice(menuOpcion - 1, 1);
            let itemEliminado = conteo.splice(menuOpcion - 1, 1);
            const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "<br />");
            contenido.innerHTML = itemEliminado + " ha sido eliminado del carrito de compras." + "<br />Los Ítems que quedan son:<br />" + listadoCarrito + "Desea seguir quitando elementos del carrito de compras?<br />1- Si.<br />2-No.";
            window.setTimeout(OPCION1, 0);

            function OPCION1() {
                let menuOpcion1 = parseInt(prompt("Ingrese una Opción."));
                if (menuOpcion1 == 1) {
                    contenido.innerHTML = introQuitar();
                    window.setTimeout(QUITARELEMENTOS, 0);
                } else if (menuOpcion1 == 2) {
                    contenido.innerHTML = introCarrito();
                    window.setTimeout(MENUCARRITO, 0);
                } else if (menuOpcion1) {
                    alerta.innerHTML = "Entrada incorrecta, Volviendo al menú anterior...";
                    contenido.innerHTML = introQuitar();
                    window.setTimeout(QUITARELEMENTOS, 0);
                }
            }
        } else if (menuOpcion == 0) {
            contenido.innerHTML = introCarrito();
            window.setTimeout(MENUCARRITO, 0);
        } else {
            alerta.innerHTML = "Entrada incorrecta, Volviendo al menú anterior...";
            contenido.innerHTML = introQuitar();
            window.setTimeout(QUITARELEMENTOS, 0);
        }
    }
}

function CIERREDECOMPRA() {
    const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "<br />Subtotal: $" + carritoDeCompras.subtotal + "<br />");
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    window.setTimeout(ENTREGABOLETA, 0);

    function ENTREGABOLETA() {
        prompt("Ingrese e-Mail");
    }
    const fechaDeCompra = new Date();
    const dia = fechaDeCompra.toLocaleDateString();
    const hora = fechaDeCompra.toLocaleTimeString();
    contenido.innerHTML = "Su boleta de compra:<br />Factura tipo C consumidor final<br />Anabella Avena n°0001-000001<br />Fecha de compra: " + dia + "<br />hora: " + hora + "<br />Nombre: " + nombre + "<br />Apellido: " + apellido + "<br />Items comprados:<br />" + listadoCarrito + "<br />Total monto: $" + precioConIva.toFixed(2) + "-.<br />Muchas gracias por su compra!";
    carritoDeCompras.splice(0, carritoDeCompras.length);
    window.setTimeout(EXITPROGRAM, 0);
}

function EXITPROGRAM() {
    if (carritoDeCompras.length > 0) {
        alerta.innerHTML = "Al parecer ha dejado cargado el carrito de compras.<br />Desea revisarlo antes de salir?<br />1- Si.<br />2- No.";
        window.setTimeout(OPCION, 0);

        function OPCION() {
            let menuOpcion = parseInt(prompt("Ingrese una Opción."));
            if (menuOpcion == 1) {
                titulo.innerHTML = tituloMenuCarrito;
                contenido.innerHTML = introCarrito();
                alerta.replaceChildren();
                window.setTimeout(MENUCARRITO, 0);
            } else if (menuOpcion) {
                alerta.innerHTML = "Está saliendo de la tienda, esperamos volver a verlo pronto.";
            } else {
                alerta.innerHTML = "Entrada inválida, debe ingresar una opción valida.<br />Volvamos a intentarlo.";
                window.setTimeout(EXITPROGRAM, 0);
            }
        }
    } else {
        alerta.innerHTML = "Ha saliendo de la tienda, esperamos volver a verlo pronto.";
    }
}