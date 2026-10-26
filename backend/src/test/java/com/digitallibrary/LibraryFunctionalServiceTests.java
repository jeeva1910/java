package com.digitallibrary;

import com.digitallibrary.dto.JavaFeatureSummary;
import com.digitallibrary.service.LibraryFunctionalService;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class LibraryFunctionalServiceTests {

    private final LibraryFunctionalService service = new LibraryFunctionalService();

    @Test
    void streamAndCollectorCalculationsWork() {
        JavaFeatureSummary summary = service.buildSummary();

        assertEquals(6, summary.totalBooks());
        assertEquals(25, summary.totalAvailableCopiesUsingReduce());
        assertEquals(25, summary.parallelAvailableCopyCount());
        assertTrue(summary.booksByCategory().containsKey("Computer Science"));
        assertFalse(summary.availableBookTitles().isEmpty());
    }

    @Test
    void dateParsingUsesJavaTimeApi() {
        assertEquals(LocalDate.of(2026, 11, 5), service.parseDate("2026-11-05"));
        assertThrows(IllegalArgumentException.class, () -> service.parseDate("05/11/2026"));
    }

    @Test
    void optionalAndOverdueQueriesWork() {
        assertTrue(service.findBookById("b1").isPresent());
        assertTrue(service.findBookById("unknown").isEmpty());
        assertEquals(1, service.getOverdueBorrowings().size());
    }
}
