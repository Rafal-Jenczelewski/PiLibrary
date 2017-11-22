package com.library.PiLibrary.Upload;

import com.library.PiLibrary.Storage.Comments.Comment;
import com.library.PiLibrary.Storage.Comments.CommentRepository;
import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.Files.UploadedFile;
import com.library.PiLibrary.Storage.StorageException;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;


@CrossOrigin( origins = "http://localhost:3000" )
@org.springframework.web.bind.annotation.RestController
public class UploadRestController
{

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private CommentRepository commentRepository;


    @RequestMapping( value = "api/uploadedFiles/upload",
                    method = RequestMethod.POST )
    @ResponseBody
    public String uploadFile( MultipartHttpServletRequest request, HttpServletResponse response )
    {
        try
        {
            saveAndUploadFile( request );
            return "OK";
        }
        catch( StorageException e )
        {
            response.setStatus( 415 );
            return e.getMessage();
        }
        catch( ServletException | IOException e )
        {
            response.setStatus( 416 );
            return "Somethings wrong with request";
        }
    }


    private void saveAndUploadFile( MultipartHttpServletRequest request )
                    throws IOException, ServletException, StorageException
    {
        Collection<Part> parts = request.getParts();
        MultipartFile multipartFile = request.getFile( request.getFileNames().next() );

        fileRepository.saveAndUpload( transformPartsToFile( parts ), multipartFile );
    }


    @RequestMapping( value = "api/comments/comment",
                    method = RequestMethod.POST )
    @ResponseBody
    public String comment( HttpServletRequest request, HttpServletResponse response )
    {
        try
        {
            saveComment( request );
            return "OK";
        }
        catch( Exception e )
        {
            response.setStatus( 416 );
            return "Something went wrong!";
        }
    }


    private void saveComment( HttpServletRequest request ) throws IOException, ServletException
    {
        String target = "";
        String content = "";
        Collection<Part> parts = request.getParts();
        for( Part part : parts )
        {
            String partName = part.getName();
            InputStream inputStream = part.getInputStream();
            if( partName.equals( "target" ) )
            {
                target = IOUtils.toString( inputStream );
            }
            else if( partName.equals( "content" ) )
            {
                content = IOUtils.toString( inputStream );
            }

            inputStream.close();
        }

        commentRepository.save( new Comment( target, content ) );
    }


    private UploadedFile transformPartsToFile( Collection<Part> parts ) throws IOException
    {
        String name = "";
        String notes = "";
        String tags = "";

        for( Part part : parts )
        {
            String partName = part.getName();
            InputStream inputStream = part.getInputStream();

            if( "name".equals( partName ) )
            {
                name = IOUtils.toString( inputStream );
            }
            else if( "notes".equals( partName ) )
            {
                notes = IOUtils.toString( inputStream );
            }
            else if( "tags".equals( partName ) )
            {
                tags = IOUtils.toString( inputStream );
            }
            inputStream.close();
        }

        return new UploadedFile( name, notes, tags );
    }
}
