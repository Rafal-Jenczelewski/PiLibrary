package com.library.PiLibrary.Upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@CrossOrigin(origins = "http://localhost:3000")
@org.springframework.web.bind.annotation.RestController
public class UploadRestController
{

    @Autowired
    private UploadService service;

    @RequestMapping(value = "api/uploadedFiles/upload",
            method = RequestMethod.POST)
    @ResponseBody
    public String uploadFile(MultipartHttpServletRequest request, HttpServletResponse response)
    {
        return service.uploadFile(request, response);
    }


    @RequestMapping(value = "api/comments/comment",
            method = RequestMethod.POST)
    @ResponseBody
    public String comment(HttpServletRequest request, HttpServletResponse response)
    {
        return service.uploadComment(request, response);
    }


}
