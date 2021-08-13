/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.converter;

import org.springframework.stereotype.Component;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request.AddUserRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.UserResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewUserTO;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.UserTO;

import javax.validation.constraints.NotNull;
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

    public UserTO toUserTO(final UserEntity userEntity) {
        return Optional.ofNullable(userEntity)
                .map(v -> new UserTO(
                        v.getId(),
                        v.getUsername(),
                        v.getPassword()
                ))
                .orElse(null);
    }

    public UserResponse toUserResponse(@NotNull final UserTO userTO) {
        return Optional.ofNullable(userTO)
                .map(v -> new UserResponse(
                        v.getId(),
                        v.getUsername()
                ))
                .orElse(null);
    }
}
