package libraryui.application.data.entity;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class CustomUsernamePasswordAuthentication extends UsernamePasswordAuthenticationToken {

    private String authToken;
    private Long id;

    public CustomUsernamePasswordAuthentication(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public CustomUsernamePasswordAuthentication(Object principal, Object credentials, String authToken) {
        super(principal, credentials);
        this.authToken = authToken;
    }

    public CustomUsernamePasswordAuthentication(Object principal, Object credentials, String authToken, Long id) {
        super(principal, credentials);
        this.authToken = authToken;
        this.id = id;
    }

    public CustomUsernamePasswordAuthentication(String username, String password, String authToken,
                                                Collection<? extends GrantedAuthority> userAuthorities) {
        super(username, password, userAuthorities);
        this.authToken = authToken;
    }

    public CustomUsernamePasswordAuthentication(String username, String password, String authToken, Long id,
                                                Collection<? extends GrantedAuthority> userAuthorities) {
        super(username, password, userAuthorities);
        this.authToken = authToken;
        this.id = id;
    }

    public CustomUsernamePasswordAuthentication(String username, String password,
                                                Collection<? extends GrantedAuthority> userAuthorities) {
        super(username, password, userAuthorities);
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}