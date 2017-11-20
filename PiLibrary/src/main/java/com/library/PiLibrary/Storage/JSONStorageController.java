package com.library.PiLibrary.Storage;

import com.google.gson.*;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Part;
import java.io.*;
import java.nio.file.Files;
import java.util.*;


public class JSONStorageController
                implements StorageController
{

    private final String resourcesPathname = "G:/PiLibrary/resources/";
    private final String jsonPathname = "G:/PiLibrary/files.json";


    @Override
    public boolean addFile( MultipartFile multipartFile, Collection<Part> parts ) throws IOException
    {
        String name = "";
        Map<String, String> details = new HashMap<>();

        for( Part part : parts )
        {
            if( !part.getName().equals( "file" ) )
            {
                String partValue = IOUtils.toString( part.getInputStream() );
                details.put( part.getName(), (partValue) );
                if( part.getName().equals( "name" ) )
                {
                    name = partValue;
                }
            }
        }

        JsonArray files = getAllFileNames();
        files.add( new Gson().toJsonTree( details ) );

        try( Writer writer = new FileWriter( jsonPathname ) )
        {
            new Gson().toJson( files, writer );
        }

        saveFile( multipartFile, name );
        return true;
    }


    private void saveFile( MultipartFile multipartFile, String name ) throws IOException
    {
        byte[] bytes = multipartFile.getBytes();
        File file = new File( resourcesPathname + name );
        BufferedOutputStream stream = new BufferedOutputStream( new FileOutputStream( file ) );
        stream.write( bytes );
        stream.close();
    }


    @Override
    public InputStream getFile( String fileName ) throws FileNotFoundException
    {
        File dir = new File( resourcesPathname );
        File[] files = dir.listFiles();
        InputStream inputStream = null;

        for( File f : files )
        {
            String name = f.getName();
            if( name.equals( fileName ) )
            {
                inputStream = new FileInputStream( f );
                break;
            }
        }

        return inputStream;
    }


    @Override
    public List<String> search( String criterion )
    {
        return new ArrayList<>();
    }


    @Override
    public boolean deleteFile( String fileName )
    {
        File file = new File( resourcesPathname + fileName );
        try
        {
            System.out.println( file.toPath() );
            Files.deleteIfExists( file.toPath() );
        }
        catch( IOException e )
        {
            return false;
        }

        JsonArray files = getAllFileNames();
        JsonElement elementToRemove = null;
        for( JsonElement element : files )
        {
            if( element.getAsJsonObject().get( "name" ).getAsString().equals( fileName ) )
            {
                elementToRemove = element;
            }
        }
        files.remove( elementToRemove );

        try( Writer writer = new FileWriter( jsonPathname ) )
        {
            new Gson().toJson( files, writer );
        }
        catch( IOException e )
        {
            return false;
        }

        return true;
    }


    @Override
    public List<String> getFileNames()
    {
        JsonArray files = getAllFileNames();
        List<String> names = new ArrayList<>();

        if( files == null )
        {
            return names;
        }

        for( JsonElement element : files )
        {
            names.add( element.getAsJsonObject().get( "name" ).getAsString() );
        }

        return names;
    }


    @Override
    public Map<String, String> getFileDetails( String fileName ) throws StorageException
    {
        JsonArray files = getAllFileNames();
        Map<String, String> details = new HashMap<>();

        if( files == null )
        {
            return details;
        }

        for( JsonElement element : files )
        {
            JsonObject jsonObj = element.getAsJsonObject();
            if( jsonObj.get( "name" ).getAsString().equals( fileName ) )
            {
                details.put( "tags", jsonObj.get( "tags" ).getAsString() );
                details.put( "notes", jsonObj.get( "notes" ).getAsString() );
                break;
            }
        }
        if( details.isEmpty() )
        {
            throw new StorageException( "Given name not found" );
        }

        return details;
    }


    private JsonArray getAllFileNames()
    {
        JsonArray files;
        try( FileReader reader = new FileReader( jsonPathname ) )
        {
            files = new JsonParser().parse( reader ).getAsJsonArray();
        }
        catch( Exception ex )
        {
            files = new JsonArray();
        }

        return files;

    }
}
