package com.digitallibrary.controller;

import com.digitallibrary.dto.BookView;
import com.digitallibrary.dto.JavaFeatureSummary;
import com.digitallibrary.model.Borrowing;
import com.digitallibrary.service.LibraryFunctionalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/java")
public class JavaFeatureController {

    private final LibraryFunctionalService service;

    public JavaFeatureController(LibraryFunctionalService service) {
        this.service = service;
    }

    @GetMapping("/overview")
    public JavaFeatureSummary overview() {
        return service.buildSummary();
    }

    @GetMapping("/books/available")
    public List<BookView> availableBooks() {
        return service.getAvailableBooks();
    }

    @GetMapping("/borrowings/overdue")
    public List<Borrowing> overdueBorrowings() {
        return service.getOverdueBorrowings();
    }
}
