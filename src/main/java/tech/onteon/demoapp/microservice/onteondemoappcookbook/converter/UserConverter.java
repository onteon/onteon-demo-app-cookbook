/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.converter;

import org.springframework.stereotype.Component;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.pojo.AddUserRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewUserTO;

import java.util.Optional;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Component
public class UserConverter {
    public NewUserTO toNewUserTO(final AddUserRequest addUserRequest) {
        return Optional.ofNullable(addUserRequest)
                .map(v -> new NewUserTO(
                        v.getUsername(),
                        v.getPassword(),
                        v.getConfirmedPassword()
                ))
                .orElse(null);
    }
}
