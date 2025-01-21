package com.oriana.tienda.tiendawebapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComercialRepository extends JpaRepository<Comercial, Long> {}