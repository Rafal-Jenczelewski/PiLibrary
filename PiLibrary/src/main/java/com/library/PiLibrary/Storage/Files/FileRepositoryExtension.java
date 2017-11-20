/*
 * Copyright (C) 2017 Nokia. All rights reserved.
 */

package com.library.PiLibrary.Storage.Files;

import com.library.PiLibrary.Storage.StorageException;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.InputStream;


public interface FileRepositoryExtension
{
    void saveAndUpload( UploadedFile entity, MultipartFile file ) throws StorageException;

    InputStream download( String name ) throws FileNotFoundException;

    void deleteFile( String name ) throws StorageException;
}
