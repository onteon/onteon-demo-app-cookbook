/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.service.impl;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserRole;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.interfaces.UserRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces.UserService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewUserTO;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            @Autowired final UserRepository userRepository,
            @Autowired final PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void saveUser(@NonNull final NewUserTO newUserTO) {
        if (!newUserTO.getPassword().equals(newUserTO.getConfirmedPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords are not matching.");
        }

        if (userRepository.existsByUsername(newUserTO.getUsername())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("Username '%s' already taken.", newUserTO.getUsername())
            );
        }

        final String encodedPassword = passwordEncoder.encode(newUserTO.getPassword());
        final UserEntity userEntity = new UserEntity();
        userEntity.setUsername(newUserTO.getUsername());
        userEntity.setPassword(encodedPassword);
        userEntity.setRole(UserRole.ROLE_USER);

        userRepository.save(userEntity);
    }
}
