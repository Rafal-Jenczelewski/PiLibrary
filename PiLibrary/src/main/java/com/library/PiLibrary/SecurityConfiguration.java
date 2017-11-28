package com.library.PiLibrary;

import com.library.PiLibrary.Storage.Users.SpringDataJpaUserDetailsService;
import com.library.PiLibrary.Storage.Users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.Http401AuthenticationEntryPoint;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{
    @Autowired
    private SpringDataJpaUserDetailsService userDetailsService;

    @Autowired
    private MySavedRequestAwareAuthenticationSuccessHandler successHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        //auth.userDetailsService(this.userDetailsService).passwordEncoder(User.PASSWORD_ENCODER);
        auth.inMemoryAuthentication().withUser("user").password("pass").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests().antMatchers("/built/**", "*.css", "*login").permitAll()
                //.antMatchers(HttpMethod.POST).authenticated()
                .antMatchers(HttpMethod.DELETE).authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin().successHandler(successHandler).failureHandler(new SimpleUrlAuthenticationFailureHandler())
                .and()
                .httpBasic()
                .and()
                .csrf().disable()
                .logout();

        http.exceptionHandling().authenticationEntryPoint(new Http401AuthenticationEntryPoint("You don't have rights to access this part of system."));
    }
}
