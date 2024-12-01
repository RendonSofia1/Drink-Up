import { Injectable, EventEmitter } from '@angular/core';

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  url: string;
  cantidad: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: ProductoCarrito[] = [];
  carritoChange: EventEmitter<ProductoCarrito[]> = new EventEmitter();

  constructor() {
    this.cargarCarrito();
  }

  // Cargar carrito desde el almacenamiento local
  cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
    this.emitirCambioCarrito();
  }

  agregarAlCarrito(producto: ProductoCarrito) {
    const existeProducto = this.carrito.find(p => p.id === producto.id);
    if (existeProducto) {
      existeProducto.cantidad += producto.cantidad;
      existeProducto.total = existeProducto.cantidad * existeProducto.precio;
    } else {
      this.carrito.push(producto);
    }
    this.actualizarCarrito();
  }

  // Actualizar carrito en el almacenamiento local
  actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.emitirCambioCarrito();
  }

  actualizarCantidad(id: number, cantidad: number) {
    const producto = this.carrito.find(p => p.id === id);
    if (producto) {
      producto.cantidad = cantidad;
      producto.total = producto.cantidad * producto.precio;
      this.actualizarCarrito();
    }
  }

  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.actualizarCarrito();
  }

  vaciarCarrito() {
    localStorage.removeItem('carrito');
    this.carrito = [];
    this.emitirCambioCarrito();
  }

  emitirCambioCarrito() {
    this.carritoChange.emit(this.carrito);
  }

  calcularTotal() {
    return this.carrito.reduce((total, producto) => total + producto.total, 0);
  }
}
