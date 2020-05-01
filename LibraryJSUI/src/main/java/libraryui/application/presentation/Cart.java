package libraryui.application.presentation;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Cart {

    @GetMapping("/cart")
    public String getCart(){
        return "cart";
    }
}
