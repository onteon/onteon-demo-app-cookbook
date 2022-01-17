/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.request.AddUserRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.UserResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.converter.UserConverter;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces.UserService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.NewUserTO;

import javax.validation.Valid;
import java.security.Principal;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserConverter userConverter;
    private final UserService userService;

    public UserController(
            @Autowired final UserConverter userConverter,
            @Autowired final UserService userService
    ) {
        this.userConverter = userConverter;
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@RequestBody @Valid final AddUserRequest request) {
        final NewUserTO newUserTO = userConverter.toNewUserTO(request);
        userService.saveUser(newUserTO);
    }

    @GetMapping("/me")
    public UserResponse getPrincipal(final Principal principal) {
        return userConverter.toUserResponse(userService.getPrincipal(principal));
    }
}
