/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to;

import lombok.Data;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Data
public class ShoppingListFileTO {
    private final byte[] content;
    private final String filename;
}
