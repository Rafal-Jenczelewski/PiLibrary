package com.library.PiLibrary.Home;

import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.StorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;

@Service
public class HomeService
{
    @Autowired
    FileRepository fileRepository;

    public String delete(String fullName, HttpServletResponse response)
    {
        try
        {
            fileRepository.deleteFile( fullName );
            return "OK";
        }
        catch( StorageException e )
        {
            response.setStatus( 415 );
            return e.getMessage();
        }
    }
}
