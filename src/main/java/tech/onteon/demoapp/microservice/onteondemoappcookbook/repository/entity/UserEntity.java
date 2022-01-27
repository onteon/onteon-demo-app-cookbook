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
@Entity(name = "users")
@Data
public class UserEntity {
    @Id
    @GeneratedValue
    private int id;

    private String username;

    private String password;

    private UserRole role;
}
