package com.library.PiLibrary.Security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class MyBasicEntryPoint extends BasicAuthenticationEntryPoint
{

    @Override
    public void commence
            (HttpServletRequest request, HttpServletResponse response, AuthenticationException authEx)
            throws IOException, ServletException
    {
        response.addHeader("www-authenticate", "Basic realm=" +  String.format("\"%s\"", getRealmName()));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        PrintWriter writer = response.getWriter();
        writer.println("HTTP Status 401 - " + authEx.getMessage());
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        setRealmName("PiLibrary");
        super.afterPropertiesSet();
    }
}
