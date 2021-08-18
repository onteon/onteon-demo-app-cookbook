/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Data
public class AddUserRequest {
    @NotBlank
    private final String username;

    @NotBlank
    private final String password;

    @NotBlank
    private final String confirmedPassword;
}
