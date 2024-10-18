// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

// Clase CarritoDeCompras
class CarritoDeCompras {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.mostrarCarrito();
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.mostrarCarrito();
    }

    calcularSubtotal() {
        return this.productos.reduce((acc, prod) => acc + prod.precio, 0);
    }

    calcularDescuento(subtotal1) {
        return subtotal1 > 3000 ? subtotal1 * 0.1 : 0; // 10% si supera los 3000
    }

    calcularIGV(subtotal2) {
        return subtotal2 * 0.18; // 18% de IGV
    }

    mostrarCarrito() {
        const carritoDiv = document.getElementById("carritoProductos");
        carritoDiv.innerHTML = ''; // Limpiar contenido anterior

        if (this.productos.length === 0) {
            carritoDiv.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            this.productos.forEach((prod, index) => {
                carritoDiv.innerHTML += `<p>${prod.nombre}: $${prod.precio.toFixed(2)} <button onclick="carrito.eliminarProducto(${index})">Eliminar</button></p>`;
            });
        }
    }

    mostrarResumen() {
        const subtotal1 = this.calcularSubtotal();
        const descuento = this.calcularDescuento(subtotal1);
        const subtotal2 = subtotal1 - descuento;
        const igv = this.calcularIGV(subtotal2);
        const total = subtotal2 + igv;

        const resumenDiv = document.getElementById("resumenCompra");
        resumenDiv.innerHTML = `<h3>Resumen de Compra:</h3>
                                <p>Subtotal: $${subtotal1.toFixed(2)}</p>
                                <p>Descuento: $${descuento.toFixed(2)}</p>
                                <p>Nuevo subtotal: $${subtotal2.toFixed(2)}</p>
                                <p>IGV (18%): $${igv.toFixed(2)}</p>
                                <p>Total a Pagar: $${total.toFixed(2)}</p>`;
    }
}

const carrito = new CarritoDeCompras();

// Función para agregar productos al carrito
function agregarProducto(nombre, precio) {
    const producto = new Producto(nombre, precio);
    carrito.agregarProducto(producto);
}

// Mostrar el resumen cuando se presiona el botón
function mostrarResumen() {
    carrito.mostrarResumen();
}