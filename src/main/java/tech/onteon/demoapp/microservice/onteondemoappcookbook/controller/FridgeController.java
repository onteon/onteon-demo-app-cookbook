/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.response.FridgeItemResponse;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.converter.FridgeConverter;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.interfaces.FridgeRemoteService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.interfaces.UserService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.service.to.UserTO;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@RestController
@RequestMapping("/api/fridge")
public class FridgeController {
    private final FridgeRemoteService fridgeRemoteService;
    private final FridgeConverter fridgeConverter;
    private final UserService userService;

    public FridgeController(
            @Autowired final FridgeRemoteService fridgeRemoteService,
            @Autowired final FridgeConverter fridgeConverter,
            @Autowired final UserService userService
    ) {
        this.fridgeRemoteService = fridgeRemoteService;
        this.fridgeConverter = fridgeConverter;
        this.userService = userService;
    }

    @GetMapping("/user/me")
    public List<FridgeItemResponse> getPrincipalRecipes(
            final Principal principal
    ) {
        final UserTO userPrincipal = userService.getPrincipal(principal);
        return fridgeRemoteService.getFridgeItemsByUserId(userPrincipal.getId()).stream()
                .map(fridgeConverter::toFridgeItemResponse)
                .collect(Collectors.toList());
    }
}
