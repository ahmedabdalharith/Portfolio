package com.ahmed.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * Serves React SPA — all non-API routes return index.html so React Router handles them.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
            .addResourceLocations("file:/app/static/", "classpath:/static/")
            .resourceChain(true)
            .addResolver(new PathResourceResolver() {
                @Override
                protected Resource getResource(String resourcePath, Resource location) throws IOException {
                    Resource resource = location.createRelative(resourcePath);
                    if (resource.exists() && resource.isReadable()) {
                        return resource;
                    }
                    // Fallback to index.html for SPA routing
                    Resource index = new ClassPathResource("/static/index.html");
                    return index.exists() ? index : null;
                }
            });
    }
}
