/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Data
public class AddRecipeRequest {
    @NotBlank
    private final String title;

    @NotBlank
    private final String description;

    @NotNull
    private final List<String> ingredients;

    @NotNull
    private final List<String> directions;
}
