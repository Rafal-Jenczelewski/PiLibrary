package com.library.PiLibrary.Storage.Files;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface FileRepository
                extends CrudRepository<UploadedFile, Long>, FileRepositoryExtension
{
    List<UploadedFile> findByName( @Param( "name" ) String name );

    List<UploadedFile> findByNameContainingIgnoreCase(@Param( "name" ) String name );

    List<UploadedFile> findByTagsContainingIgnoreCase(@Param( "tag" ) String tag );
}
