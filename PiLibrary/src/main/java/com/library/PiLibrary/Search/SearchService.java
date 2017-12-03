package com.library.PiLibrary.Search;

import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.Files.UploadedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.BasicLinkBuilder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SearchService implements ResourceAssembler<UploadedFile, Resource<UploadedFile>>
{
    @Autowired
    FileRepository fileRepository;

    @Override
    public Resource<UploadedFile> toResource( UploadedFile uploadedFile )
    {
        BasicLinkBuilder builder = BasicLinkBuilder.linkToCurrentMapping().slash( "uploadedFiles" )
                .slash( uploadedFile.getId() );
        return new Resource<>(
                uploadedFile, builder.withSelfRel(), builder.withRel( "uploadedFiles" ) );
    }

    public Set<Resource<UploadedFile>> searchContaining(String searchString)
    {
        Set<Resource<UploadedFile>> entities = new HashSet<>();
        String[] tokens = searchString.split( " " );

        for( String token : tokens )
        {
            List<UploadedFile> filesWithName = fileRepository.findByNameContainingIgnoreCase( token.trim() );
            for( UploadedFile file : filesWithName )
            {
                entities.add( toResource( file ) );
            }
            List<UploadedFile> filesWithTag = fileRepository.findByTagsContainingIgnoreCase( token.trim() );
            for( UploadedFile file : filesWithTag )
            {
                entities.add( toResource( file ) );
            }
        }

        return entities;
    }

    public Set<Resource<UploadedFile>> searchByTags(String tags)
    {
        Set<Resource<UploadedFile>> entities = new HashSet<>();
        tags = tags.replace('+', '#');
        String[] tokens = tags.split( "(?=#)" );

        for( String token : tokens )
        {
            List<UploadedFile> filesWithTag = fileRepository.findByTagsContainingIgnoreCase( token.trim() );
            for( UploadedFile file : filesWithTag )
            {
                entities.add( toResource( file ) );
            }
        }

        return entities;
    }
}
