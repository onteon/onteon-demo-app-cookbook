/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces;

import lombok.NonNull;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewUserTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.UserTO;

import java.security.Principal;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface UserService {
    void saveUser(@NonNull final NewUserTO newUserTO);

    UserTO getPrincipal(final Principal principal);
}
