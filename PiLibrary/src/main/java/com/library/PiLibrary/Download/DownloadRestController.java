package com.library.PiLibrary.Download;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;


@RestController
public class DownloadRestController
{

    @Autowired
    private DownloadService service;

    @RequestMapping("api/uploadedFiles/download/{fileName}.{extension}")
    @ResponseBody
    public String download(
            @PathVariable("fileName") String fileName,
            @PathVariable("extension") String extension,
            HttpServletResponse response)
    {
        String fullName = fileName + "." + extension;
        return service.download(fullName, response);
    }
}
