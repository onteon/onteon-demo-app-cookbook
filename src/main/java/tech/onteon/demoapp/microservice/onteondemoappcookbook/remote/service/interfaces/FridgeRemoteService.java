/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.interfaces;

import lombok.NonNull;
import tech.onteon.demoapp.microservice.onteondemoappcookbook.remote.service.to.FridgeItemTO;

import java.util.List;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public interface FridgeRemoteService {
    List<FridgeItemTO> getFridgeItemsByUserId(@NonNull final Integer userId);
}
