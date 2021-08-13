/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.configuration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.List;
import java.util.Random;
import java.util.Spliterator;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
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

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

    private final RecipeRepository recipeRepository;

    private final PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper;

    private final Random random;

    private final List<String> imagesNames = List.of(
            "dumplings.jpg", "hamburger.jpg", "pizza2.jpg", "pizza.jpg", "waffles.jpg"
    );

    public DataConfiguration(
            @Autowired final UserRepository userRepository,
            @Autowired final ImageRepository imageRepository,
            @Autowired final RecipeRepository recipeRepository,
            @Autowired final PasswordEncoder passwordEncoder
    ) {
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
        for (UserEntity user : users) {
            addRecipes(user, recipesPerUserMin, recipesPerUserMax);
        }

        System.out.println("Created users");
        users.forEach(user -> System.out.printf(
                "Username: %s\t Password: %s\t Role: %s\n", user.getUsername(), password, user.getRole().name())
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

    private void addRecipes(@NotNull final UserEntity author, final int min, final int max) throws IOException {
        final int numberOfRecipes = random.nextInt(max - min) + min;
        final ResourceLoader resourceLoader = new DefaultResourceLoader();

        for (int i = 0; i < numberOfRecipes; i++) {
            final String imageName = imagesNames.get(random.nextInt(imagesNames.size()));
            final Resource resource = resourceLoader.getResource(String.format("classpath:dummy/images/%s", imageName));

            final String imageFileName = imageRepository.save(getDummyMultipartFile(resource));

            final RecipeEntity recipeEntity = new RecipeEntity();
            recipeEntity.setTitle("Title " + i);
            recipeEntity.setIngredients(
                    List.of("ingredient 1", "ingredient 2", "ingredient 3").stream()
                            .map(ingredient -> {
                                final IngredientEntity ingredientEntity = new IngredientEntity();
                                ingredientEntity.setIngredient(ingredient);
                                return ingredientEntity;
                            })
                            .collect(Collectors.toList())
            );
            recipeEntity.setDirections(
                    List.of("First of all, do this", "and then this", "and this", "I guess you can eat now").stream()
                            .map(direction -> {
                                final DirectionEntity directionEntity = new DirectionEntity();
                                directionEntity.setDirection(direction);
                                return directionEntity;
                            })
                            .collect(Collectors.toList())
            );
            recipeEntity.setAuthor(author);
            recipeEntity.setDescription("rem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis risus purus. In fringilla lectus quis lectus vehicula fringilla. Proin ultricies facilisis leo vel lobortis. Phasellus a bibendum tellus. Donec fermentum condimentum pellentesque. Vestibulum tristique mauris nisi, vel tempus enim venenatis ut.");
            recipeEntity.setImageFileName(imageFileName);

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
