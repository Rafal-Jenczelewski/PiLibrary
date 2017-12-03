package com.library.PiLibrary.Home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;


@Controller
public class HomeRestController
{
    @Autowired
    HomeService service;

    @RequestMapping( value = "api/uploadedFiles/delete/{name}.{extension}",
                    method = RequestMethod.DELETE )
    @ResponseBody
    public String deleteFile(
                    @PathVariable( "name" ) String name,
                    @PathVariable( "extension" ) String extension,
                    HttpServletResponse response )
    {
        String fullName = name + "." + extension;

        return service.delete(fullName, response);
    }

    @RequestMapping( "/" )
    public String index()
    {
        return "index";
    }
}
