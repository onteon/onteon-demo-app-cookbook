/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.converter;

import org.springframework.stereotype.Component;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.FridgeItemResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.FridgeItemTO;

import java.util.Optional;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Component
public class FridgeConverter {
    public FridgeItemResponse toFridgeItemResponse(final FridgeItemTO fridgeItemTO) {
        return Optional.ofNullable(fridgeItemTO)
                .map(v -> new FridgeItemResponse(
                        fridgeItemTO.getName(),
                        fridgeItemTO.getCategory(),
                        fridgeItemTO.getAmount(),
                        fridgeItemTO.getUnit()
                ))
                .orElse(null);
    }
}
