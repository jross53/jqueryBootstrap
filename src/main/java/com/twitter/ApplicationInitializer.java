package com.twitter;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jordan.ross on 12/4/2015.
 */
public class ApplicationInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
        Map<String, Object> map = new HashMap<>();
        map.put("spring.jmx.enabled", false);
        return application.sources(Application.class).properties(map);
    }
}
