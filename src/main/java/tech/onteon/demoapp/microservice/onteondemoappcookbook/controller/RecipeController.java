/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request.AddRecipeRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request.UpdateRecipeRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.AddRecipeResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.RecipeResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.converter.RecipeConverter;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.ShoppingListFileTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces.RecipeService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewRecipeTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.UpdateRecipeTO;

import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
    private final RecipeService recipeService;
    private final RecipeConverter recipeConverter;

    public RecipeController(
            @Autowired final RecipeService recipeService,
            @Autowired final RecipeConverter recipeConverter
    ) {
        this.recipeService = recipeService;
        this.recipeConverter = recipeConverter;
    }

    @PostMapping
    public AddRecipeResponse addRecipe(
            @RequestPart("image") final MultipartFile image,
            @RequestPart("data") @Valid final AddRecipeRequest request,
            final Principal principal
    ) throws IOException {
        final NewRecipeTO newRecipeTO = recipeConverter.toNewRecipeTO(request, image);
        final int newRecipeId = recipeService.addNewRecipe(newRecipeTO, principal);

        return new AddRecipeResponse(newRecipeId);
    }

    @PutMapping
    public void updateRecipe(
            @RequestPart(value = "image", required = false) final MultipartFile image,
            @RequestPart("data") @Valid final UpdateRecipeRequest request,
            final Principal principal
    ) throws IOException {
        final UpdateRecipeTO updateRecipeTO = recipeConverter.toUpdateRecipeTO(request, image);
        recipeService.updateRecipe(updateRecipeTO, principal);
    }

    @GetMapping("/user/me")
    public Page<RecipeResponse> getPrincipalRecipes(
            final Principal principal,
            @RequestParam(defaultValue = "0") final int page,
            @RequestParam(defaultValue = "5") final int pageSize
    ) {
        return recipeService.getPrincipalRecipes(principal, page, pageSize)
                .map(recipeConverter::toRecipeResponse);
    }

    @GetMapping("/{recipeId}")
    public RecipeResponse getRecipeById(final Principal principal, @PathVariable final int recipeId) {
        return recipeConverter.toRecipeResponse(recipeService.getRecipeById(principal, recipeId));
    }

    @GetMapping("/{recipeId}/shopping-list")
    public ResponseEntity<byte[]> getRecipeShoppingList(
            final Principal principal,
            @PathVariable final int recipeId
    ) throws JsonProcessingException {
        final ShoppingListFileTO shoppingListFile = recipeService.getShoppingListFile(principal, recipeId);

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData(shoppingListFile.getFilename(), shoppingListFile.getFilename());
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(shoppingListFile.getContent(), headers, HttpStatus.OK);
    }

    @DeleteMapping("/{recipeId}")
    public void deleteRecipeById(final Principal principal, @PathVariable final int recipeId) {
        recipeService.deleteRecipeById(principal, recipeId);
    }
}
