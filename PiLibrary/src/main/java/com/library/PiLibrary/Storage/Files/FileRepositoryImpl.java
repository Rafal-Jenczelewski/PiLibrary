/*
 * Copyright (C) 2017 Nokia. All rights reserved.
 */

package com.library.PiLibrary.Storage.Files;

import com.library.PiLibrary.Storage.StorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;


public class FileRepositoryImpl
                implements FileRepositoryExtension
{
    @Autowired
    FileRepository fileRepository;

    static String resourcePath = "D:/PiLibrary/files/";


    @Override
    public void saveAndUpload( UploadedFile entity, MultipartFile file ) throws StorageException
    {
        String name = entity.getName();
        try
        {
            if( fileRepository.findByName( name ).isEmpty() )
            {
                saveFile( file, name );
            }
            else
            {
                throw new StorageException( "File with given name already exists" );
            }
        }
        catch( IOException e )
        {
            throw new StorageException( "Problem occurred when saving file" );
        }
        fileRepository.save( entity );
    }


    @Override
    public InputStream download( String name ) throws FileNotFoundException
    {
        File file = new File( resourcePath + name );

        return new FileInputStream( file );
    }


    @Override
    public void deleteFile( String name ) throws StorageException
    {
        File file = new File( resourcePath + name );

        List<UploadedFile> foundFiles = fileRepository.findByName( name );
        if( foundFiles.isEmpty() )
        {
            throw new StorageException( "No such file in database" );
        }

        fileRepository.delete( foundFiles.get( 0 ) );
        if( !file.delete() )
        {
            throw new StorageException( "File could not be deleted" );
        }
    }


    private void saveFile( MultipartFile multipartFile, String name ) throws IOException
    {
        String fullPath = resourcePath + name;

        byte[] bytes = multipartFile.getBytes();
        File file = new File( fullPath );
        BufferedOutputStream stream = new BufferedOutputStream( new FileOutputStream( file ) );
        stream.write( bytes );
        stream.close();
    }
}
