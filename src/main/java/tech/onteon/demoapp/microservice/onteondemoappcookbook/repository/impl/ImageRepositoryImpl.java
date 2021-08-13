/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.ImageRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Service
public class ImageRepositoryImpl implements ImageRepository {
    private final Path imagesDir = Paths.get("images").toAbsolutePath();

    public ImageRepositoryImpl() {
        imagesDir.toFile().mkdirs();
    }

    @Override
    public String save(MultipartFile image) throws IOException {
        final String newImageFilename = UUID.randomUUID() + "-" + image.getOriginalFilename();
        Files.copy(image.getInputStream(), Paths.get("images", newImageFilename));

        return newImageFilename;
    }
}
