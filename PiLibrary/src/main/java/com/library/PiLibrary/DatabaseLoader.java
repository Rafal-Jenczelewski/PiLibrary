package com.library.PiLibrary;

import com.library.PiLibrary.Storage.Comments.Comment;
import com.library.PiLibrary.Storage.Comments.CommentRepository;
import com.library.PiLibrary.Storage.Files.FileRepository;
import com.library.PiLibrary.Storage.Files.UploadedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class DatabaseLoader
                implements CommandLineRunner
{
    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public void run( String... strings ) throws Exception
    {
        List<UploadedFile> files = new ArrayList<>(  );
        files.add( new UploadedFile( "test1.png", "Najlepiej", "#before2" ) );
        files.add( new UploadedFile( "test2.png", "Najlepiej", "#before2" ) );
        files.add( new UploadedFile( "test3.png", "Najlepiej", "#after2" ) );
        files.add( new UploadedFile( "test4.png", "Najlepiej", "#after2" ) );
        files.add( new UploadedFile( "after2.png", "Najlepiej", "#after2" ) );
        fileRepository.save( files );

        List<Comment> comments = new ArrayList<>(  );
        comments.add( new Comment(files.get( 0 ), "Najlepsze") );
        commentRepository.save( comments );
    }
}
