/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.converter.RecipeConverter;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.DirectionEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.IngredientEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.RecipeEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.ImageRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.RecipeRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.UserRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces.RecipeService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewRecipeTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.RecipeTO;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Service
public class RecipeServiceImpl implements RecipeService {
    private final ImageRepository imageRepository;
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final RecipeConverter recipeConverter;

    public RecipeServiceImpl(
            @Autowired final ImageRepository imageRepository,
            @Autowired final RecipeRepository recipeRepository,
            @Autowired final UserRepository userRepository,
            @Autowired final RecipeConverter recipeConverter
    ) {
        this.imageRepository = imageRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.recipeConverter = recipeConverter;
    }

    @Override
    public int addNewRecipe(
            @NotNull final NewRecipeTO newRecipeTO,
            @NotNull final Principal principal
    ) throws IOException {
        final UserEntity author = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        String.format("Not found user of username '%s'", principal.getName())
                ));

        final RecipeEntity recipeEntity = new RecipeEntity();

        final String fileName = imageRepository.save(newRecipeTO.getImage());
        final List<IngredientEntity> ingredients = newRecipeTO.getIngredients().stream()
                .map(ingredient -> {
                    final IngredientEntity ingredientEntity = new IngredientEntity();
                    ingredientEntity.setIngredient(ingredient);
                    return ingredientEntity;
                })
                .collect(Collectors.toList());

        final List<DirectionEntity> directions = newRecipeTO.getDirections().stream()
                .map(direction -> {
                    final DirectionEntity directionEntity = new DirectionEntity();
                    directionEntity.setDirection(direction);
                    return directionEntity;
                })
                .collect(Collectors.toList());

        recipeEntity.setTitle(newRecipeTO.getTitle());
        recipeEntity.setImageFileName(fileName);
        recipeEntity.setDescription(newRecipeTO.getDescription());
        recipeEntity.setIngredients(ingredients);
        recipeEntity.setDirections(directions);
        recipeEntity.setAuthor(author);

        final RecipeEntity savedRecipe = recipeRepository.save(recipeEntity);
        return savedRecipe.getId();
    }

    @Override
    public Page<RecipeTO> getPrincipalRecipes(@NotNull final Principal principal, int page, int pageSize) {
        final UserEntity author = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        String.format("Not found user of username '%s'", principal.getName())
                ));

        return recipeRepository.findAllByAuthor(author, PageRequest.of(page, pageSize))
                .map(recipeConverter::toRecipeTO);
    }

    @Override
    public RecipeTO getRecipeById(@NotNull final Principal principal, @NotNull final int recipeId) {
        final UserEntity principalEntity = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        String.format("Not found user of username '%s'", principal.getName())
                ));

        final RecipeEntity recipeEntity = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        String.format("Not found recipe by id '%d'", recipeId)
                ));

        if (recipeEntity.getAuthor().getId() != principalEntity.getId()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    String.format("Not a owner of recipe of id '%d'", recipeId)
            );
        }

        return recipeConverter.toRecipeTO(recipeEntity);
    }

    @Override
    public void deleteRecipeById(@NotNull final Principal principal, final int recipeId) {
        final UserEntity principalEntity = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        String.format("Not found user of username '%s'", principal.getName())
                ));

        final RecipeEntity recipeEntity = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        String.format("Not found recipe by id '%d'", recipeId)
                ));

        if (recipeEntity.getAuthor().getId() != principalEntity.getId()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    String.format("Not a owner of recipe of id '%d'", recipeId)
            );
        }

        recipeRepository.delete(recipeEntity);
    }
}
