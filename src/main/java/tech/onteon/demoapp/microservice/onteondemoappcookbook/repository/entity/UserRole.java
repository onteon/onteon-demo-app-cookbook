package tech.onteon.demoapp.microservice.onteondemoappcookbook.repository.entity;

/**
 * @author Patryk Borchowiec
 * @since 0.0.0
 */
public enum UserRole {
    ROLE_USER, ROLE_ADMIN;

    public String getRoleName() {
        return name().substring(5);
    }
}
