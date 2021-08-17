/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface ImageRepository {
    /**
     * @return Name of saved image file.
     */
    String save(@NotNull final MultipartFile image) throws IOException;

    void removeByFilename(@NotNull final String filename) throws IOException;
}
