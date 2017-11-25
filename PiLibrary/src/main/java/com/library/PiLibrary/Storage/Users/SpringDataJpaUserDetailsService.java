package com.library.PiLibrary.Storage.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException
    {
        User user = userRepository.findByName(name);
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), AuthorityUtils.NO_AUTHORITIES);
    }
}
