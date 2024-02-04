package com.example.demo;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ProductoService;
import com.example.demo.models.Producto;

@RestController
public class ControladorProducto {
	
	@Autowired
	ProductoService productoService;
	
	@GetMapping()
	public String index() {
		return "Conectado";
	}
	
	@GetMapping("productos")
	public List<Producto> getProductos() {
		return productoService.getAllProductsById();
	}
	
	@GetMapping("productosBuscados")
	public List<Producto> getProductos(@RequestParam(required = false) String id,
	                                   @RequestParam(required = false) String nombre,
	                                   @RequestParam(required = false) String precio,
	                                   @RequestParam(required = false) String cantidad,
	                                   @RequestParam(required = false) String categoria) {
	    return productoService.getFilteredProducts(id, nombre, precio, cantidad, categoria);
	}

	
	@PostMapping("guardarProducto")
	public ResponseEntity<?> save(@RequestBody Producto producto) {
		productoService.saveProduct(producto);
		return ResponseEntity.ok(Map.of("mensaje", "Producto guardado"));
	}
	
	@PutMapping("editarProducto/{id}") 
	public ResponseEntity<?> update(@PathVariable int id, @RequestBody Producto producto) {
		productoService.updateProduct(producto);
		return ResponseEntity.ok(Map.of("mensaje", "Editado correctamente"));
	}
	
	@DeleteMapping("borrarProducto/{id}")
	public ResponseEntity<?> borrar(@PathVariable int id) {
		productoService.deleteProduct(id);
		return ResponseEntity.ok(Map.of("mensaje", "Producto borrado"));
	}
}
