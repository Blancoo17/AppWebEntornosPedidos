package com.oriana.tienda.tiendawebapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comerciales")
public class ComercialController {

    @Autowired
    private ComercialRepository comercialRepository;

    // Obtener todos los comerciales
    @GetMapping
    public List<Comercial> getAllComerciales() {
        return comercialRepository.findAll();
    }

    // Obtener un comercial por ID
    @GetMapping("/{id}")
    public ResponseEntity<Comercial> getComercialById(@PathVariable Long id) {
        Optional<Comercial> comercial = comercialRepository.findById(id);
        return comercial.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo comercial
    @PostMapping
    public Comercial createComercial(@RequestBody Comercial comercial) {
        return comercialRepository.save(comercial);
    }

    // Actualizar un comercial existente
    @PutMapping("/{id}")
    public ResponseEntity<Comercial> updateComercial(@PathVariable Long id, @RequestBody Comercial comercialDetails) {
        Optional<Comercial> optionalComercial = comercialRepository.findById(id);
        if (optionalComercial.isPresent()) {
            Comercial comercial = optionalComercial.get();
            comercial.setNombre(comercialDetails.getNombre());
            comercial.setApellido1(comercialDetails.getApellido1());
            comercial.setApellido2(comercialDetails.getApellido2());
            comercial.setComision(comercialDetails.getComision());
            return ResponseEntity.ok(comercialRepository.save(comercial));
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar un comercial
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComercial(@PathVariable Long id) {
        if (comercialRepository.existsById(id)) {
            comercialRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
