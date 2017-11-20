package com.library.PiLibrary.Home;

import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.StorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


@CrossOrigin( origins = "http://localhost:3000" )
@RestController
public class HomeRestController
{
    @Autowired
    FileRepository fileRepository;


    @RequestMapping( value = "api/uploadedFiles/delete/{name}.{extension}",
                    method = RequestMethod.DELETE )
    @ResponseBody
    public String deleteFile(
                    @PathVariable( "name" ) String name,
                    @PathVariable( "extension" ) String extension,
                    HttpServletResponse response )
    {
        String fullName = name + "." + extension;

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
