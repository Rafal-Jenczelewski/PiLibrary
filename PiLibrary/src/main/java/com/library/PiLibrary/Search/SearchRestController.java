package com.library.PiLibrary.Search;

import com.library.PiLibrary.Storage.Files.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
public class SearchRestController
{
    @Autowired
    FileRepository fileRepository;

//    @RequestMapping( value = "api/uploadedFiles/search",
//                    method = RequestMethod.POST)
//    public String search(HttpServletRequest request)
//    {
//        fileRepository.findAll().forEach( System.out::println );
//        return "OK";
//    }
}
