/*
 * Copyright (C) 2017 Nokia. All rights reserved.
 */

package com.library.PiLibrary.Storage.Comments;

import com.library.PiLibrary.Storage.Commentable;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Data
@Entity
public class Comment
        implements Commentable {
    @Setter(AccessLevel.NONE)
    @GeneratedValue
    @Id
    private Long id;
    private String target;
    private String content;


    public Comment() {
    }

    public Comment(String target, String content) {
        this.target = target;
        this.content = content;
    }

    @Override
    public String indetify() {
        return "com" + getId();
    }
}
