/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to;

import lombok.Data;

import java.util.List;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Data
public class RecipeTO {
    private final int id;
    private final int authorId;
    private final String title;
    private final String description;
    private final List<String> ingredients;
    private final List<String> directions;
    private final String imageUri;
}
