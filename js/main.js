/* Este proyecto es un módulo eCommerce para una pagina ya existente de una Ilustradora Gráfica. la idea es crear un catalogo de productos a vender, implementar un carrito de compras donde cargarlos, y añadir un modulo de pagos y encargos */

//Anabella Avena - Ilustradora Gráfica - módulo eCommerce.

const catalogoDeBusqueda = [];
const carritoDeCompras = [];
let nombre = "";
let apellido = "";
const iva = 1.21;


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
    añadir(cantidad) {
        if (this.stock > 0) {
            cantidad = parseInt(prompt("Cuanto/as " + this.nombre + " deseas añadir al carrito?\nStock disponible: " + this.stock));
            if (this.stock >= cantidad) {
                if (cantidad >= 1) {
                    this.stock = this.stock - cantidad;
                    carritoDeCompras.push({
                        id: this.id,
                        tipo: this.tipo,
                        cantidad: cantidad,
                        nombre: this.nombre,
                        subtotal: (cantidad * this.precio)
                    });
                    if (cantidad == 1) {
                        return alert(this.nombre + " ha sido añadido al carrito.");
                    } else {
                        return alert(cantidad + "x " + this.nombre + " han sido añadidos al carrito.");
                    }
                } else {
                    return alert("Atención: Debes escribir un numero entero mayor a 1.");
                }
            } else {
                return alert("Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + this.stock + " unidades o menos.");
            }
        } else {
            return alert("Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.");
        }
    }
}

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

//A partir de aquí comienza el menú...

//nombre = prompt("Ingrese su nombre de pila (su apellido se lo preguntaremos luego).");
//apellido = prompt("Ingrese su apellido.");

MENUPRINCIPAL();

function MENUPRINCIPAL() {

    var h4 = document.createElement("h4");
    h4.textContent += "---Menú principal---";
    document.getElementsByClassName("titulo-relativo")[0].appendChild(h4);
}

/*    
    let menuOpcion = parseInt(prompt("--- Simulador eCommerce --- \n--- Anabella Avena - Ilustradora Freelance ---\nBienvenido/a al simulador de tienda, aquí podrás ver mi catálogo de items en venta.\nPor favor elige una opción:\n1-Buscar Item\n2-Libretas\n3-Stickers\n4-Posters\n5-Ir al carrito de compras\n6-Salir "));
    if (menuOpcion >= 1 && menuOpcion <= 6) {
        switch (menuOpcion) {
            case 1:
                MENUBUSQUEDA();
                break;
            case 2:
                alert("Ha entrado en el menú libretas...");
                MENU("Libreta", "libretas");
                break;
            case 3:
                alert("Ha entrado en el menú Stikers");
                MENU("Sticker", "stickers");
                break;
            case 4:
                alert("Ha entrado en el menú Posters");
                MENU("Poster", "posters");
                break;
            case 5:
                alert("Accediendo al Carrito de Compras");
                MENUCARRITO();
                break;
            case 6:
                EXITPROGRAM();
                break;
        }
    } else {
        alert("Por favor elija una opción del 1 al 5 \n \n volvamos a intentarlo.");
        MENUPRINCIPAL();
    }
}

function MENUBUSQUEDA() {
    let busqueda = prompt("---Buscador de Productos---\nEscriba el tipo o el nombre del ítem que esté buscando.\nPista: puede ser un tipo como 'Sticker' o 'Poster', o alguna palabra clave.\nEscriba '0' para volver al menú principal.");
    if (busqueda === "0") {
        MENUPRINCIPAL();
    } else {
        const encontrado = catalogoDeBusqueda.filter(producto => producto.tipo.toLowerCase().includes(busqueda.toLowerCase()) || producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));
        if (encontrado.length == 0) {
            alert("Lo sentimos," + " '" + busqueda + "' " + "no ha arrojado ninún resultado, lo intentamos de nuevo?")
            MENUBUSQUEDA();
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
            let menuOpcion = parseInt(prompt("Hemos encontrado:\n" + conteo.join("\n") + "\nSeleccione el ítem que desee agregar al carrito: \n0- Volver al menú de Busqueda."));
            if (menuOpcion > 0 && menuOpcion <= conteo.length) {
                if (catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock > 0) {
                    let cantidades = parseInt(prompt("Cuantos/as " + encontrado[(menuOpcion - 1)].nombre + " desea agregar al carrito?"));
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
                                alert(catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].nombre + " ha sido añadido al carrito.");
                                MENUBUSQUEDA();
                            } else {
                                alert(cantidades + "x " + catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].nombre + " han sido añadidos al carrito.");
                                MENUBUSQUEDA();
                            }
                        } else {
                            alert("Atención: Debes escribir un numero entero mayor a 1.");
                            MENUBUSQUEDA();
                        }
                    } else {
                        alert("Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + catalogoDeBusqueda[encontrado[(menuOpcion - 1)].id].stock + " unidades o menos.");
                        MENUBUSQUEDA();
                    }
                } else {
                    alert("Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.");
                    MENUBUSQUEDA();
                }
            } else if (menuOpcion == 0) {
                MENUBUSQUEDA();
            } else {
                alert("Entrada incorrecta, Volviendo al menú anterior...")
                MENUBUSQUEDA();
            }
        }
    }
}

function MENU(tipo, tipoPlural) {
    const conteo = [];
    const lista = catalogoDeBusqueda.filter(producto => producto.tipo == tipo);
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
    let menuOpcion = parseInt(prompt("---Anabella Avena - Ilustradora Freelance---\n---Menú de " + tipoPlural + "---\nPor favor elija una opción para agregar al carrito:\n" + conteo.join("\n") + "\n0- Volver al menú anterior.\n \nNota: Los precios no incluyen i.v.a."));
    if (menuOpcion > 0 && menuOpcion <= conteo.length) {
        if (catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock > 0) {
            let cantidades = parseInt(prompt("Cuantos/as " + lista[(menuOpcion - 1)].nombre + " desea agregar al carrito?"));
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
                        alert(catalogoDeBusqueda[lista[(menuOpcion - 1)].id].nombre + " ha sido añadido al carrito.");
                        MENU(tipo, tipoPlural);
                    } else {
                        alert(cantidades + "x " + catalogoDeBusqueda[lista[(menuOpcion - 1)].id].nombre + " han sido añadidos al carrito.");
                        MENU(tipo, tipoPlural);
                    }
                } else {
                    alert("Atención: Debes escribir un numero entero mayor a 1.");
                    MENU(tipo, tipoPlural);
                }
            } else {
                alert("Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + catalogoDeBusqueda[lista[(menuOpcion - 1)].id].stock + " unidades o menos.");
                MENU(tipo, tipoPlural);
            }
        } else {
            alert("Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.");
            MENU(tipo, tipoPlural);
        }
    } else if (menuOpcion == 0) {
        MENUPRINCIPAL();
    } else {
        alert("Entrada incorrecta, Volviendo al menú anterior...")
        MENU(tipo, tipoPlural);
    }
}

function MENUCARRITO() {
    let pago;
    pago = parseFloat(pago);
    let menuOpcion = 0;
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    const cantidadProductos = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.cantidad;
    }, 0);
    const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "\nSubtotal: $" + carritoDeCompras.subtotal + "\n");
    menuOpcion = prompt("---Anabella Avena - Ilustradora Freelance---\n---Carrito de Compras---\nRepasemos lo que has cargado en el carrito antes de confirmar...\nLa cantidad de Items son: " + cantidadProductos + "\nUn resumen de los Items que pediste:\n" + listadoCarrito + "\nEl costo total (Incluyendo IVA) es de: $" + (precioConIva.toFixed(2) + "-.") + "\nElige una opción:\n1-Pagar monto.\n2-Quitar elementos del carrito.\n3-Volver atrás.\n4-Cancelar compra.");
    menuOpcion = parseInt(menuOpcion);
    if (menuOpcion >= 1 && menuOpcion <= 4) {
        switch (menuOpcion) {
            case 1:
                if (cantidadProductos > 0) {
                    pago = prompt("---Carrito de Compras---\nLa suma Total a pagar es de: $ " + precioConIva.toFixed(2) + "\nPor favor ingrese el monto especificado arriba para acreditar pago...");
                    if (pago == precioConIva.toFixed(2)) {
                        alert("---Carrito de Compras---\nEl pago de: $" + precioConIva.toFixed(2) + " se ha acreditado correctamente.")
                        CIERREDECOMPRA();
                    } else if (pago > precioConIva) {
                        let vuelto = pago - precioConIva.toFixed(2);
                        alert("---Carrito de Compras---\nAl parecer nos has enviado mas dinero del que era necesario, por ello te reenviamos $" + vuelto.toFixed(2) + " como vuelto por tu compra.")
                        CIERREDECOMPRA();
                    } else if (pago < precioConIva && pago > 0) {
                        let pagoInsuficiente = precioConIva.toFixed(2) - pago;
                        alert("---Carrito de Compras---\nVaya!, al parecer has pagado $" + pago + ". Lamentablemente te faltan $" + pagoInsuficiente.toFixed(2) + " para completar los $" + precioConIva.toFixed(2) + " que se necesitan.\nTe devolvemos el dinero, Volvamos a completar la transacción.");
                        MENUCARRITO();
                    } else if (pago <= 0) {
                        alert("---Carrito de Compras---\nAtención, no puedes pagar ingresando números negativos\nIntentemos nuevamente.");
                        MENUCARRITO();
                    }
                } else {
                    alert("Lo sentimos. no puedes continuar si no has cargado ningun ítem en el carrito, te enviaremos de vuelta al menú de compras.");
                    MENUPRINCIPAL();
                }
                break;
            case 2:
                QUITARELEMENTOS();
                break;
            case 3:
                VOLVERALMENU();
                break;
            case 4:
                carritoDeCompras = [];
                EXITPROGRAM();
                break;
        }
    } else {
        alert("Por favor ingrese un número del 1 al 4.");
        MENUCARRITO();
    }
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
    let menuOpcion = parseInt(prompt("Los Ítems cargados en el carrito de compras:\n" + conteo.join("\n") + "\nElija el Ítem que desea eliminar\n0- para volver al menú anterior."));
    if (menuOpcion > 0 && menuOpcion <= conteo.length) {
        catalogoDeBusqueda[carritoDeCompras[(menuOpcion - 1)].id].stock = catalogoDeBusqueda[carritoDeCompras[(menuOpcion - 1)].id].stock + carritoDeCompras[(menuOpcion - 1)].cantidad;
        let borrado = carritoDeCompras.splice(menuOpcion - 1, 1);
        let itemEliminado = conteo.splice(menuOpcion - 1, 1);
        const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "\n");
        let menuOpcion1 = parseInt(prompt(itemEliminado + " ha sido eliminado del carrito de compras." + "\nLos Ítems que quedan son:\n" + listadoCarrito + "Desea seguir quitando elementos del carrito de compras?\n1- Si.\n2-No."));
        if (menuOpcion1 == 1) {
            QUITARELEMENTOS();
        } else if (menuOpcion1 == 2) {
            MENUCARRITO();
        } else if (menuOpcion1) {
            alert("Entrada incorrecta, Volviendo al menú anterior...")
            QUITARELEMENTOS();
        }
    } else if (menuOpcion == 0) {
        MENUCARRITO();
    } else {
        alert("Entrada incorrecta, Volviendo al menú anterior...")
        QUITARELEMENTOS();
    }
}

function VOLVERALMENU() {
    alert("Volviendo al menú principal...");
    MENUPRINCIPAL();
}

function CIERREDECOMPRA() {
    const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "\nSubtotal: $" + carritoDeCompras.subtotal + "\n");
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    prompt("---Carrito de Compras---\nPor favor introduzca a continuación un correo electrónico para poder enviarte los productos.");
    alert("---Carrito de Compras---\nMuchas gracias por su compra, " + nombre + ", su envío se está procesando.");
    const fechaDeCompra = new Date();
    const dia = fechaDeCompra.toLocaleDateString();
    const hora = fechaDeCompra.toLocaleTimeString();
    alert("Su boleta de compra:\nFactura tipo C consumidor final\nAnabella Avena n°0001-000001\nFecha de compra: " + dia + "\nhora: " + hora + "\nNombre: " + nombre + "\nApellido: " + apellido + "\nItems comprados:\n" + listadoCarrito + "\nTotal monto: $" + (precioConIva.toFixed(2) + "-.\nMuchas gracias por su compra!"));
    carritoDeCompras = [];
    EXITPROGRAM();
}

function EXITPROGRAM() {
    if (carritoDeCompras.length > 0) {
        let menuOpcion = parseInt(prompt("Al parecer ha dejado cargado el carrito de compras.\nDesea revisarlo antes de salir?\n1- Si.\n2- No."));
        if (menuOpcion == 1) {
            MENUCARRITO();
        } else if (menuOpcion) {
            return alert("Está saliendo de la tienda, esperamos volver a verlo pronto.");
        } else {
            Alert("Entrada inválida, debe ingresar una opción valida.\nVolvamos a intentarlo.");
            EXITPROGRAM();
        }
    } else {
        return alert("Está saliendo de la tienda, esperamos volver a verlo pronto.");
    }
}
*/