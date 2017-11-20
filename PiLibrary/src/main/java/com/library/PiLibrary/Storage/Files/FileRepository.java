package com.library.PiLibrary.Storage.Files;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface FileRepository
                extends PagingAndSortingRepository<UploadedFile, Long>, FileRepositoryExtension
{
    List<UploadedFile> findByName( @Param( "name" ) String name );

    List<UploadedFile> findByNameContaining( @Param( "name" ) String name );

    List<UploadedFile> findByTagsContaining( @Param( "tag" ) String tag );
}
