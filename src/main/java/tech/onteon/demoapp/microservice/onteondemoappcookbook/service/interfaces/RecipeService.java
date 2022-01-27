/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Page;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.ShoppingListFileTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewRecipeTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.RecipeTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.UpdateRecipeTO;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.security.Principal;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface RecipeService {
    /**
     * @return Id of new recipe.
     */
    int addNewRecipe(@NotNull final NewRecipeTO newRecipeTO, @NotNull final Principal principal) throws IOException;

    void updateRecipe(@NotNull final UpdateRecipeTO updateRecipeTO, @NotNull final Principal principal) throws IOException;

    Page<RecipeTO> getPrincipalRecipes(@NotNull final Principal principal, final int page, final int pageSize);

    RecipeTO getRecipeById(@NotNull final Principal principal, final int recipeId);

    void deleteRecipeById(@NotNull final Principal principal, final int recipeId);

    ShoppingListFileTO getShoppingListFile(@NotNull final Principal principal, final int recipeId) throws JsonProcessingException;
}
