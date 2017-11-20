package com.library.PiLibrary;

import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.Files.UploadedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DatabaseLoader
                implements CommandLineRunner
{
    private final FileRepository repository;


    @Autowired
    public DatabaseLoader( FileRepository repository )
    {
        this.repository = repository;
    }


    @Override
    public void run( String... strings ) throws Exception
    {
        repository.save( new UploadedFile( "test1.png", "Najlepiej", "#seksi" ) );
    }
}
