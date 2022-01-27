/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.request;

import lombok.Data;

import java.util.List;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Data
public class GenerateShoppingListRequest {
    private final String title;
    private final List<String> ingredients;
}
