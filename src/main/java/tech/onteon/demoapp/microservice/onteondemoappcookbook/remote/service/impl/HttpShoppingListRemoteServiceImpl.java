/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.interfaces.ShoppingListRemoteService;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.request.GenerateShoppingListRequest;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.ShoppingListFileTO;

import javax.validation.constraints.NotNull;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
@Service
public class HttpShoppingListRemoteServiceImpl implements ShoppingListRemoteService {
//    @Value("${service.shoppinglist.baseUrl:http://localhost:8021/_by_name/onteon-demo-app-fridge-docker}")
    @Value("${service.shoppinglist.baseUrl:http://localhost:8081}")
    private String shoppingListBaseUrl;
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public ShoppingListFileTO generateShoppingListFile(@NotNull final GenerateShoppingListRequest request) throws JsonProcessingException {
        final RestTemplate restTemplate = new RestTemplate();

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        final HttpEntity<String> requestEntity = new HttpEntity<>(objectMapper.writeValueAsString(request), headers);

        final ResponseEntity<byte[]> response = restTemplate
                .exchange(
                        String.format("%s/api/v1/shopping-list/generate/txt", shoppingListBaseUrl),
                        HttpMethod.POST,
                        requestEntity,
                        byte[].class
                );

        final byte[] body = response.getBody();
        final String filename = response.getHeaders().getContentDisposition().getFilename();
        return new ShoppingListFileTO(body, filename);
    }
}
