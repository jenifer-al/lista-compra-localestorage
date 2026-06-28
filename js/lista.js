
const LISTA = document.getElementById("lista-compras");
const PRODUCTOS = document.getElementById("num-prod");
const MENSAJE = document.getElementById("mensaje");
const INPUT = document.getElementById("producto-input");

const actualizarVista = () => {
    LISTA.innerHTML = "";
    carrito.forEach((item) => {
        LISTA.insertAdjacentHTML("beforeend", `<li>${item.nombre} - Cant: ${item.cantidad} - Precio: ${item.precio}€</li>`);
    });
    PRODUCTOS.innerText = carrito.length;
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(carrito));
};

const agregar = () => {
    const nombre = INPUT.value.toUpperCase().trim();
    if (!nombre) return;

    if (carrito.some(p => p.nombre === nombre)) {
        MENSAJE.innerText = "¡El producto ya existe!";
        return;
    }

    const cantidad = parseInt(prompt("Cantidad:", 1)) || 1;
    const precio = parseFloat(prompt("Precio:", 0)) || 0;

    const nuevoProducto = new Producto(nombre, cantidad, precio);
    carrito.push(nuevoProducto);
    
    actualizarVista();
    MENSAJE.innerText = "Producto agregado.";
    INPUT.value = "";
};

const calcularTotal = () => {
    const total = carrito.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
    alert("El total estimado a gastar es: " + total.toFixed(2) + "€");
};

const vaciar = () => {
    if (confirm("¿Vaciar toda la lista y borrar los datos guardados?")) {
        carrito.length = 0;
        localStorage.removeItem(CLAVE_STORAGE);
        actualizarVista();
        MENSAJE.innerText = "Carrito vaciado.";
    }
};

// Escuchadores de eventos (ID corregido a "calcular")
document.getElementById("agregar").addEventListener("click", agregar);
document.getElementById("calcular").addEventListener("click", calcularTotal);
document.getElementById("vaciar").addEventListener("click", vaciar);

// Inicialización
actualizarVista();