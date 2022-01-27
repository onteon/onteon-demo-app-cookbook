/*
 *  Copyright (c) 2021, Onteon Tech and/or its affiliates.
 *  All rights reserved.
 *  Use is subject to license terms.
 */
package tech.onteon.demoapp.microservice.onteondemoappcookbook.logger;

import ch.qos.logback.contrib.jackson.JacksonJsonFormatter;

import java.io.IOException;
import java.util.Map;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public class JsonLoggerFormatter extends JacksonJsonFormatter {
    @Override
    public String toJsonString(Map map) throws IOException {
        map.put("@timestamp", map.get("timestamp"));
        map.remove("timestamp");

        map.put("logger_name", map.get("logger"));
        map.remove("logger");

        map.put("thread_name", map.get("thread"));
        map.remove("thread");
        return super.toJsonString(map);
    }
}
