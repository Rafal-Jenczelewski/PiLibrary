package com.library.PiLibrary.Storage.Files;

import com.library.PiLibrary.Storage.Commentable;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Data
@Entity
public class UploadedFile implements Commentable
{
    @Setter( AccessLevel.NONE )
    @GeneratedValue
    @Id
    private Long id;
    private String name;
    private String notes;
    private String tags;


    private UploadedFile()
    {
    }


    public UploadedFile( String name, String notes, String tags )
    {
        this.name = name;
        this.notes = notes;
        this.tags = tags;
    }


    @Override
    public String indetify()
    {
        return this.name;
    }
}
