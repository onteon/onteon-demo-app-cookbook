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
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.RecipeResponse;
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
public class RecipeConverter {

    public NewRecipeTO toNewRecipeTO(final AddRecipeRequest request, final MultipartFile image) {
        return Optional.ofNullable(request)
                .map(v -> new NewRecipeTO(
                        v.getTitle(),
                        v.getDescription(),
                        v.getIngredients(),
                        v.getDirections(),
                        image
                ))
                .orElse(null);
    }

    public RecipeTO toRecipeTO(final RecipeEntity recipeEntity) {
        return Optional.ofNullable(recipeEntity)
                .map(v -> new RecipeTO(
                        v.getId(),
                        v.getAuthor().getId(),
                        v.getTitle(),
                        v.getDescription(),
                        v.getIngredients().stream().map(IngredientEntity::getIngredient).collect(Collectors.toList()),
                        v.getDirections().stream().map(DirectionEntity::getDirection).collect(Collectors.toList()),
                        String.format("/images/%s", v.getImageFileName())
                ))
                .orElse(null);
    }

    public RecipeResponse toRecipeResponse(final RecipeTO recipeTO) {
        return Optional.ofNullable(recipeTO)
                .map(v -> new RecipeResponse(
                        v.getId(),
                        v.getAuthorId(),
                        v.getTitle(),
                        v.getDescription(),
                        v.getIngredients(),
                        v.getDirections(),
                        v.getImageUri()
                ))
                .orElse(null);
    }

    public UpdateRecipeTO toUpdateRecipeTO(final UpdateRecipeRequest request, final MultipartFile image) {
        return Optional.ofNullable(request)
                .map(v -> new UpdateRecipeTO(
                        v.getId(),
                        v.getTitle(),
                        v.getDescription(),
                        v.getIngredients(),
                        v.getDirections(),
                        image
                ))
                .orElse(null);
    }
}
