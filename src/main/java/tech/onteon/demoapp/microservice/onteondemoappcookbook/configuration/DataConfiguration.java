/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.configuration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.*;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.ImageRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.RecipeRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.UserRepository;

import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.util.Spliterator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Log4j2
@Configuration
public class DataConfiguration {
    @Value("${dummydata.users.min}")
    private int usersMin;

    @Value("${dummydata.users.max}")
    private int usersMax;

    @Value("${dummydata.users.recipesperuser.min}")
    private int recipesPerUserMin;

    @Value("${dummydata.users.recipesperuser.max}")
    private int recipesPerUserMax;

    @Value("${dummydata.users.password}")
    private String password;

    @Value("classpath:dummy/data/usernames.json")
    private Resource usernamesResource;

    @Value("classpath:dummy/data/recipes.json")
    private Resource recipesResource;

    private final ResourceLoader resourceLoader;

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

    private final RecipeRepository recipeRepository;

    private final PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper;

    private final Random random;

    public DataConfiguration(
            @Autowired final UserRepository userRepository,
            @Autowired final ImageRepository imageRepository,
            @Autowired final RecipeRepository recipeRepository,
            @Autowired final PasswordEncoder passwordEncoder
    ) {
        this.resourceLoader = new DefaultResourceLoader();
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.recipeRepository = recipeRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = new ObjectMapper();
        random = new Random();
    }

    @PostConstruct
    private void putDummyData() throws IOException {
        final List<UserEntity> users = putUsers(usersMin, usersMax);

        final Spliterator<JsonNode> recipesJsonSpliterator = objectMapper.readTree(recipesResource.getInputStream())
                .spliterator();
        final List<JsonNode> recipes = StreamSupport.stream(recipesJsonSpliterator, false)
                .collect(Collectors.toList());

        for (UserEntity user : users) {
            addRecipes(user, recipesPerUserMin, recipesPerUserMax, new LinkedList<>(recipes));
        }

        log.info("Created users");
        users.forEach(user -> log.info(
                "Username: {}  Password: {}  Role: {}", user.getUsername(), password, user.getRole().name())
        );
    }

    private List<UserEntity> putUsers(final int min, final int max) throws IOException {
        final Spliterator<JsonNode> usernamesJsonSpliterator = objectMapper
                .readTree(usernamesResource.getInputStream())
                .spliterator();
        final List<String> usernames = StreamSupport.stream(usernamesJsonSpliterator, false)
                .map(usernameNode -> usernameNode.get("username").asText())
                .collect(Collectors.toList());
        final int numberOfUsers = random.nextInt(max - min) + min;
        final String encodedPassword = passwordEncoder.encode(password);

        for (int i = 0; i < numberOfUsers; i++) {
            addUser(usernames.remove(random.nextInt(usernames.size())), encodedPassword, UserRole.ROLE_USER);
        }
        addUser("admin", encodedPassword, UserRole.ROLE_ADMIN);

        return userRepository.findAll();
    }

    private void addUser(
            @NotNull final String username,
            @NotNull final String encodedPassword,
            @NotNull final UserRole role
    ) {
        final UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(encodedPassword);
        userEntity.setRole(role);

        userRepository.save(userEntity);
    }

    private void addRecipes(
            @NotNull final UserEntity author,
            final int min,
            final int max,
            @NotNull final List<JsonNode> jsonRecipes
    ) throws IOException {
        final int numberOfRecipes = random.nextInt(max - min) + min;

        for (int i = 0; i < numberOfRecipes; i++) {
            final JsonNode recipeJson = jsonRecipes.remove(random.nextInt(jsonRecipes.size()));

            final String imageFileName = recipeJson.get("imageName").asText();
            final Resource imageResource = resourceLoader
                    .getResource(String.format("classpath:dummy/images/%s", imageFileName));

            final String newImageFileName = imageRepository.save(getDummyMultipartFile(imageResource));

            final RecipeEntity recipeEntity = new RecipeEntity();
            recipeEntity.setTitle(recipeJson.get("title").asText());

            final Spliterator<JsonNode> ingredientsSpliterator = recipeJson.get("ingredients").spliterator();
            List<IngredientEntity> ingredients = StreamSupport.stream(ingredientsSpliterator, false)
                    .map(ingredientJson -> {
                        final IngredientEntity ingredientEntity = new IngredientEntity();
                        ingredientEntity.setIngredient(ingredientJson.asText());
                        return ingredientEntity;
                    })
                    .collect(Collectors.toList());
            recipeEntity.setIngredients(ingredients);

            final Spliterator<JsonNode> directionsSpliterator = recipeJson.get("directions").spliterator();
            List<DirectionEntity> directions = StreamSupport.stream(directionsSpliterator, false)
                    .map(directionJson -> {
                        final DirectionEntity ingredientEntity = new DirectionEntity();
                        ingredientEntity.setDirection(directionJson.asText());
                        return ingredientEntity;
                    })
                    .collect(Collectors.toList());
            recipeEntity.setDirections(directions);

            recipeEntity.setAuthor(author);
            recipeEntity.setDescription(recipeJson.get("description").asText());
            recipeEntity.setImageFileName(newImageFileName);

            recipeRepository.save(recipeEntity);
        }
    }

    private MultipartFile getDummyMultipartFile(@NotNull final Resource resource) {
        return new MultipartFile() {
            @Override
            public String getName() {
                return resource.getFilename();
            }

            @Override
            public String getOriginalFilename() {
                return resource.getFilename();
            }

            @Override
            public String getContentType() {
                return null;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public long getSize() {
                return 0;
            }

            @Override
            public byte[] getBytes() throws IOException {
                return new byte[0];
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return resource.getInputStream();
            }

            @Override
            public void transferTo(File file) throws IOException, IllegalStateException {

            }
        };
    }
}
