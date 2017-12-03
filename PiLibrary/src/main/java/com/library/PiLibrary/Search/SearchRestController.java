package com.library.PiLibrary.Search;

import com.library.PiLibrary.Storage.Files.UploadedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositorySearchesResource;
import org.springframework.hateoas.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;


@RestController
public class SearchRestController
                implements ResourceProcessor<RepositorySearchesResource>

{

    @Autowired
    private EntityLinks entityLinks;
    @Autowired
    private SearchService service;

    @Override
    public RepositorySearchesResource process( RepositorySearchesResource repositorySearchesResource )
    {
        LinkBuilder lb = entityLinks.linkFor( UploadedFile.class, "uploadedFiles" );
        repositorySearchesResource.add( new Link( lb + "/search/findContaining/{searchString}",
                        "findContaining" ) );
        repositorySearchesResource.add(new Link(lb + "search/findByTags/{tags}", "findByTags"));
        return repositorySearchesResource;
    }

    @ResponseBody
    @RequestMapping( value = "api/uploadedFiles/search/findContaining/{searchString}",
                    produces = "application/hal+json" )
    public ResponseEntity<Set<Resource<UploadedFile>>> search( @PathVariable( "searchString" ) String searchString )
    {
        return new ResponseEntity<>( service.searchContaining(searchString), HttpStatus.OK );
    }

    @ResponseBody
    @RequestMapping( value = "api/uploadedFiles/search/findByTags/{tags}",
            produces = "application/hal+json" )
    public ResponseEntity<Set<Resource<UploadedFile>>> searchByTags( @PathVariable( "tags" ) String tags )
    {

        return new ResponseEntity<>( service.searchByTags(tags), HttpStatus.OK );
    }
}
