/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

import static tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserRole.ROLE_ADMIN;
import static tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity.UserRole.ROLE_USER;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .csrf().disable().cors().and()
                .authorizeRequests()
                    .antMatchers(HttpMethod.GET, "/", "/sign", "/static/**", "/api/user/me")
                    .permitAll()
                    .antMatchers(HttpMethod.POST, "/api/user")
                    .permitAll()
                    .antMatchers("/h2-console/**")
                    .hasRole(ROLE_ADMIN.getRoleName())
                    .antMatchers("/api/recipe", "/api/recipe/user/me", "/images/**")
                    .hasAnyRole(ROLE_USER.getRoleName(), ROLE_ADMIN.getRoleName())
                    .antMatchers(HttpMethod.GET, "/recipes", "/recipe/*")
                    .hasAnyRole(ROLE_USER.getRoleName(), ROLE_ADMIN.getRoleName())
                    .antMatchers(HttpMethod.DELETE, "/recipe/*")
                    .hasAnyRole(ROLE_USER.getRoleName(), ROLE_ADMIN.getRoleName())
                .anyRequest()
                    .authenticated()
                .and()
                    .formLogin()
                    .loginProcessingUrl("/api/login")
                    .loginPage("/sign#in")
                    .defaultSuccessUrl("/recipes")
                    .usernameParameter("username")
                    .passwordParameter("password")
                    .permitAll();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Cookie", "Access-Control-Allow-Origin"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
