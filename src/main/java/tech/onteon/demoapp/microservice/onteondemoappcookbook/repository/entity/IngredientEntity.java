/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Entity
@Data
public class IngredientEntity {
    @Id
    @GeneratedValue
    private int id;

    private String ingredient;
}
