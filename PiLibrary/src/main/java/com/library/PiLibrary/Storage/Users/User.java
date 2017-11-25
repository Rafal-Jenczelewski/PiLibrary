package com.library.PiLibrary.Storage.Users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@ToString(exclude = "password")
public class User
{
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private @Id
    @GeneratedValue
    Long id;
    private String name;
    private @JsonIgnore
    @Setter(AccessLevel.NONE)
    String password;

    public void setPassword(String password)
    {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    protected User()
    {
    }

    public User(String name, String password)
    {
        this.name = name;
        setPassword(password);
    }
}
