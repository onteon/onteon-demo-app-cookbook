/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserEntity;

import java.util.Optional;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    boolean existsByUsername(String username);
    Optional<UserEntity> findByUsername(String username);
}
