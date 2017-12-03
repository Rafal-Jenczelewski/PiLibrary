package com.library.PiLibrary.Download;

import com.library.PiLibrary.Storage.Files.FileRepository;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Service
public class DownloadService
{
    @Autowired
    private FileRepository fileRepository;

    public String download(String fullName, HttpServletResponse response)
    {
        try
        {
            InputStream fileStream = fileRepository.download(fullName);
            IOUtils.copy(fileStream, response.getOutputStream());
            fileStream.close();
            response.flushBuffer();
            return "OK";
        } catch (FileNotFoundException e)
        {
            response.setStatus(415);
            return "File not found";
        } catch (IOException e)
        {
            response.setStatus(416);
            return "Somethings wrong with the request";
        }
    }
}
