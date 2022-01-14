/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.aspect;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Arrays;
import java.util.Optional;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Log4j2
@Aspect
@Component
public class ControllerLoggingAspect {
    @Before("execution(public * tech.onteon.demoapp.microservice.onteondemoappcookbook.controller.*.*(..))")
    public void logControllerMethod(final JoinPoint joinPoint) {
        String principalName = getPrincipalFromArgs(joinPoint.getArgs()).map(Principal::getName).orElse(null);
        log.info("Incoming request - (user {}) {}", principalName, joinPoint.getSignature().toShortString());
    }

    private Optional<Principal> getPrincipalFromArgs(Object[] args) {
        return Arrays.stream(args)
                .filter(arg -> arg instanceof Principal)
                .map(arg -> (Principal) arg)
                .findAny();
    }
}
