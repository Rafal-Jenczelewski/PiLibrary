package com.library.PiLibrary.Search;

import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.Files.UploadedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositorySearchesResource;
import org.springframework.hateoas.*;
import org.springframework.hateoas.mvc.BasicLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@RestController
public class SearchRestController
                implements ResourceProcessor<RepositorySearchesResource>,
                ResourceAssembler<UploadedFile, Resource<UploadedFile>>
{
    @Autowired
    FileRepository fileRepository;
    @Autowired
    private EntityLinks entityLinks;


    @Override
    public RepositorySearchesResource process( RepositorySearchesResource repositorySearchesResource )
    {
        LinkBuilder lb = entityLinks.linkFor( UploadedFile.class, "uploadedFiles" );
        repositorySearchesResource.add( new Link( lb + "/search/findWithTags/{searchString}",
                        "findWithTags" ) );
        return repositorySearchesResource;
    }


    @Override
    public Resource<UploadedFile> toResource( UploadedFile uploadedFile )
    {
        BasicLinkBuilder builder = BasicLinkBuilder.linkToCurrentMapping().slash( "uploadedFiles" )
                        .slash( uploadedFile.getId() );
        return new Resource<>( uploadedFile, builder.withSelfRel(), builder.withRel( "uploadedFiles" ) );
    }


    @ResponseBody
    @RequestMapping( value = "api/uploadedFiles/search/findWithTags/{searchString}",
                    produces = "application/hal+json" )
    public ResponseEntity<Set<Resource<UploadedFile>>> search( @PathVariable( "searchString" ) String searchString )
    {
        Set<Resource<UploadedFile>> entities = new HashSet<>();
        String[] tokens = searchString.split( "(?=#)" );


        for( String token : tokens )
        {
            List<UploadedFile> filesWithName = fileRepository.findByNameContaining( token.trim() );
            for( UploadedFile file : filesWithName )
            {
                entities.add( toResource( file ) );
            }
            List<UploadedFile> filesWithTag = fileRepository.findByTagsContaining( token.trim() );
            for( UploadedFile file : filesWithTag )
            {
                entities.add( toResource( file ) );
            }
        }

        return new ResponseEntity<>( entities, HttpStatus.OK );
    }
}
