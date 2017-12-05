package com.library.PiLibrary.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.HttpPutFormContentFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{
    @Autowired
    private MyBasicEntryPoint entryPoint;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.inMemoryAuthentication().withUser("user").password("pass").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests().antMatchers("/built/**", "*.css", "*login").permitAll()
                .antMatchers(HttpMethod.POST).authenticated()
                .antMatchers(HttpMethod.DELETE).authenticated()
                .antMatchers(HttpMethod.PUT).authenticated()
                .anyRequest().permitAll()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic().authenticationEntryPoint(entryPoint)
                .and()
                .csrf().disable();

        http.addFilterAfter(new CustomFilter(), BasicAuthenticationFilter.class);
        http.addFilterAfter(new HttpPutFormContentFilter(), CustomFilter.class);
    }
}
