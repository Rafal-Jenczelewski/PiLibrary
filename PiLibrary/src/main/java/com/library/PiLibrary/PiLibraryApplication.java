package com.library.PiLibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


@SpringBootApplication
public class PiLibraryApplication
{

    public static void main( String[] args )
    {
        ApplicationContext context = new ClassPathXmlApplicationContext( "beans.xml" );
        SpringApplication.run( PiLibraryApplication.class, args );
    }
}
