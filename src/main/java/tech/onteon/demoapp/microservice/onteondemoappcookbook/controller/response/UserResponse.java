/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response;

import lombok.Data;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Data
public class UserResponse {
    private final int id;
    private final String username;
}
