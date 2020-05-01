package libraryui.application.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Book {

    @GetMapping("/books")
    public String getBooks(){
        return "books";
    }
    @GetMapping("/adm/add-book")
    public String addBook(){
        return "add-book";
    }
}
