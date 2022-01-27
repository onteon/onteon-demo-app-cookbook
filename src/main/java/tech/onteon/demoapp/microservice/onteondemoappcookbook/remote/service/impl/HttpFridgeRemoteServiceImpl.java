/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.impl;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.interfaces.FridgeRemoteService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.FridgeItemTO;

import java.util.List;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Service
public class HttpFridgeRemoteServiceImpl implements FridgeRemoteService {
    @Value("${service.fridge.baseUrl:http://localhost:8021/_by_name/onteon-demo-app-fridge-docker}")
    private String fridgeBaseUrl;

    @Override
    public List<FridgeItemTO> getFridgeItemsByUserId(@NonNull final Integer userId) {
        final RestTemplate restTemplate = new RestTemplate();
        return restTemplate
                .exchange(
                        String.format("%s/api/v1/fridge/%d", fridgeBaseUrl, userId),
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<FridgeItemTO>>() {
                        }
                )
                .getBody();
    }
}
