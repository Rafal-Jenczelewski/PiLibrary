/*
 * Copyright (C) 2017 Nokia. All rights reserved.
 */

package com.library.PiLibrary.Storage.Comments;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CommentRepository
                extends CrudRepository<Comment, Long>
{
    List<Comment> findByTarget( @Param( "target" ) String target );
}
