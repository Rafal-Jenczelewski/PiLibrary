package com.library.PiLibrary.Storage;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Part;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.Map;


public interface StorageController
{
    boolean addFile( MultipartFile file, Collection<Part> parts ) throws IOException;

    InputStream getFile( String filename ) throws FileNotFoundException;

    List<String> search( String criterion );

    boolean deleteFile( String filename );

    List<String> getFileNames();

    Map<String, String> getFileDetails( String fileName ) throws StorageException;
}
