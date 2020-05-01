package libraryui.application.authentication;


import libraryui.application.data.entity.ApiSession;
import libraryui.application.data.entity.CustomUsernamePasswordAuthentication;
import libraryui.application.data.entity.UserGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        if (authentication instanceof CustomUsernamePasswordAuthentication) {

            CustomUsernamePasswordAuthentication authToken = (CustomUsernamePasswordAuthentication) authentication;

            if (authToken != null) {
                if (authToken.getAuthToken() != null) {

                    String urlBasic = "https://localhost:8081/ApiSession/getSession?token=";
                    String url = urlBasic + authToken.getAuthToken();

                    HttpHeaders headers = new HttpHeaders();
                    headers.set("Authorization", authToken.getAuthToken());
                    HttpEntity<String> request = new HttpEntity<String>(headers);

                    ResponseEntity<ApiSession> response = restTemplate.exchange(url, HttpMethod.GET, request, ApiSession.class);
                    if (response.getStatusCodeValue() == 200) {
                        ApiSession apiSession = response.getBody();


                        assert apiSession != null;
                        CustomUsernamePasswordAuthentication auth = new CustomUsernamePasswordAuthentication("", "",
                                authToken.getAuthToken(), apiSession.getUserId(), getAuthorities(apiSession.getUserGroups()));

                        SecurityContextHolder.getContext().setAuthentication(auth);
                        return auth;
                    }
                }
            }
        }
        return null;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(ArrayList<UserGroup> roleList) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        roleList.forEach(role -> {
            GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getAuthority());
            authorities.add(authority);
        });
        return authorities;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}