/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.UserRepository;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserEntity;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.security.UserDetailsImpl;

import javax.validation.constraints.NotNull;
import java.util.Collections;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(
            @Autowired final UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NotNull final String username) throws UsernameNotFoundException {
        final UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Bad credentials"));

        return new UserDetailsImpl(
                user.getUsername(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()))
        );
    }
}
