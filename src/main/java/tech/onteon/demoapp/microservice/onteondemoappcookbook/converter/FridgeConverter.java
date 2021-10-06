/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.converter;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request.AddRecipeRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request.UpdateRecipeRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.FridgeItemResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.RecipeResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.FridgeItemTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.DirectionEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.IngredientEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.RecipeEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewRecipeTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.RecipeTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.UpdateRecipeTO;

import java.util.Optional;
import java.util.stream.Collectors;

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
