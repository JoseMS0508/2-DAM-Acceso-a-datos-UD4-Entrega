package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import com.example.demo.models.Producto;
import jakarta.persistence.criteria.Predicate;
import com.example.demo.repository.ProductoRepository;

@Service
public class ProductoService {

	@Autowired
	ProductoRepository inventarioRepository;

//getting all books record by using the method findaAll() of CrudRepository
	public List<Producto> getAllProductsById() {
		List<Producto> productos = new ArrayList<Producto>();
		inventarioRepository.findAll().forEach(producto -> productos.add(producto));
		return productos;
	}

//getting a specific record by using the method findById() of CrudRepository
	public Producto getProductsById(int id) {
		return inventarioRepository.findById(id).get();
	}

	public List<Producto> getFilteredProducts(String id, String nombre, String precio, String cantidad,
			String categoria) {
		return inventarioRepository.findAll((Specification<Producto>) (root, query, criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();

			if (id != null && !id.isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("id"), Integer.parseInt(id)));
			}
			if (nombre != null && !nombre.isEmpty()) {
				predicates.add(criteriaBuilder.like(root.get("nombre"), "%" + nombre + "%"));
			}
			if (precio != null && !precio.isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("precio"), Double.parseDouble(precio)));
			}
			if (cantidad != null && !cantidad.isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("cantidad"), Integer.parseInt(cantidad)));
			}
			if (categoria != null && !categoria.isEmpty()) {
				predicates.add(criteriaBuilder.like(root.get("categoria"), "%" + categoria + "%"));
			}

			return query.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])))
					.getRestriction();
		});
	}

	//saving a specific record by using the method save() of CrudRepository
	public void saveProduct(Producto producto) {
		inventarioRepository.save(producto);
	}

	//deleting a specific record by using the method deleteById() of CrudRepository
	public void deleteProduct(int id) {
		inventarioRepository.deleteById(id);
	}

	//updating a record
	public void updateProduct(Producto producto) {
		inventarioRepository.save(producto);
	}
}