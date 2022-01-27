/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.request.GenerateShoppingListRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.ShoppingListFileTO;

import javax.validation.constraints.NotNull;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface ShoppingListRemoteService {
    ShoppingListFileTO generateShoppingListFile(@NotNull final GenerateShoppingListRequest request) throws JsonProcessingException;
}
