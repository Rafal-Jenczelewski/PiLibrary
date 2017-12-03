package com.library.PiLibrary;

import com.library.PiLibrary.Storage.Comments.Comment;
import com.library.PiLibrary.Storage.Files.UploadedFile;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;


@Configuration
public class RepositoryConfig
                extends RepositoryRestConfigurerAdapter
{
    @Override
    public void configureRepositoryRestConfiguration( RepositoryRestConfiguration configuration )
    {
        configuration.exposeIdsFor( Comment.class );
        configuration.exposeIdsFor(UploadedFile.class);
    }
}
