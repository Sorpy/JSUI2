package libraryui.application.authentication;


import libraryui.application.data.entity.CustomUsernamePasswordAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private Credentials credentials;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        Authentication auth = credentials.getAuthentication();

        CustomUsernamePasswordAuthentication authentication = (CustomUsernamePasswordAuthentication) auth;

        if (request.getParameter("token") != null) {
            if (authentication == null) {
                authentication = tokenAuthentication(request);
            }
        } else {
            System.out.println(request.getRequestURI());
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);


    }

    private CustomUsernamePasswordAuthentication tokenAuthentication(HttpServletRequest httpRequest) {
        if (httpRequest.getParameter("token") != null) {
            return new CustomUsernamePasswordAuthentication("", "",
                    httpRequest.getParameter("token"));
        }
        return null;
    }
}