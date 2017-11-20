package com.library.PiLibrary.Storage.Files;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface FileRepository
                extends PagingAndSortingRepository<UploadedFile, Long>, FileRepositoryExtension
{
    List<UploadedFile> findByName( String name );
}
