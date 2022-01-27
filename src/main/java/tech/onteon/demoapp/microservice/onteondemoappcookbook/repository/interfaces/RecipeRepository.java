/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.RecipeEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserEntity;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface RecipeRepository extends JpaRepository<RecipeEntity, Integer> {
    Page<RecipeEntity> findAllByAuthor(UserEntity author, Pageable pageable);
}
