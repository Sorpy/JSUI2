package libraryui.application.presentation;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Error implements ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        //do something like logging
        return "redirect:/login";
    }

    @Override
    public String getErrorPath() {
        return "/login";
    }
}