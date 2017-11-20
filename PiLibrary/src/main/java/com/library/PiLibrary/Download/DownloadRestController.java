package com.library.PiLibrary.Download;

import com.library.PiLibrary.Storage.Files.FileRepository;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;


@CrossOrigin( origins = "http://localhost:3000" )
@RestController
public class DownloadRestController
{
    @Autowired
    private FileRepository fileRepository;


    //TODO: hack!!!
    @RequestMapping( "api/uploadedFiles/download/{fileName}.{extension}" )
    @ResponseBody
    public String download(
                    @PathVariable( "fileName" ) String fileName,
                    @PathVariable( "extension" ) String extension,
                    HttpServletResponse response )
    {
        try
        {
            InputStream fileStream = fileRepository.download( fileName + "." + extension );
            IOUtils.copy( fileStream, response.getOutputStream() );
            fileStream.close();
            response.flushBuffer();
            return "OK";
        }
        catch( FileNotFoundException e )
        {
            response.setStatus( 415 );
            return "File not found";
        }
        catch( IOException e )
        {
            response.setStatus( 416 );
            return "Somethings wrong with the request";
        }
    }
}
