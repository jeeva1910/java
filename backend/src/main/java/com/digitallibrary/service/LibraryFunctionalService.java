package com.digitallibrary.service;

import com.digitallibrary.dto.BookView;
import com.digitallibrary.dto.JavaFeatureSummary;
import com.digitallibrary.model.Book;
import com.digitallibrary.model.Borrowing;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
public class LibraryFunctionalService implements AutoCloseable {

    private final ExecutorService executor = Executors.newFixedThreadPool(3);
    private final DateTimeFormatter displayFormatter = DateTimeFormatter.ofPattern("dd MMM yyyy");

    private final List<Book> books = List.of(
            book("b1", "Introduction to Algorithms", "Thomas H. Cormen", "Computer Science", 8, 5),
            book("b2", "Digital Signal Processing", "John G. Proakis", "Electronics", 5, 2),
            book("b3", "Engineering Mechanics", "R.C. Hibbeler", "Mechanical Engineering", 6, 6),
            book("b4", "Feynman Lectures on Physics", "Richard P. Feynman", "Physics", 4, 1),
            book("b5", "Calculus and Analytic Geometry", "George B. Thomas", "Mathematics", 10, 8),
            book("b6", "Clean Code", "Robert C. Martin", "Computer Science", 7, 3)
    );

    private final List<Borrowing> borrowings = List.of(
            borrowing("bor1", "b1", "Introduction to Algorithms", "u2", "Alex Johnson",
                    LocalDate.now().minusDays(20), LocalDate.now().minusDays(6), null, "OVERDUE", 1),
            borrowing("bor2", "b2", "Digital Signal Processing", "u2", "Alex Johnson",
                    LocalDate.now().minusDays(8), LocalDate.now().plusDays(6), null, "ACTIVE", 0),
            borrowing("bor3", "b5", "Calculus and Analytic Geometry", "u3", "Sam Lee",
                    LocalDate.now().minusDays(35), LocalDate.now().minusDays(21), LocalDate.now().minusDays(18), "RETURNED", 0)
    );

    public JavaFeatureSummary buildSummary() {
        // UNIT I — Lambda, Functional Interfaces, Method References, Stream basics.
        Predicate<Book> available = book -> book.getAvailableCopies() > 0; // Predicate + lambda
        Function<Book, String> titleExtractor = Book::getTitle;             // Function + method reference
        List<String> auditTrail = new ArrayList<>();
        Consumer<Book> auditConsumer = book -> auditTrail.add("Viewed: " + book.getTitle()); // Consumer + lambda
        Supplier<LocalDate> todaySupplier = LocalDate::now;                 // Supplier + method reference

        books.forEach(auditConsumer);
        LocalDate today = todaySupplier.get();
        int auditEntries = auditTrail.size();

        var availableBooks = books.stream()
                .filter(available)
                .sorted(Comparator.comparing(Book::getTitle))
                .toList();

        List<String> availableTitles = availableBooks.stream()
                .map(titleExtractor)
                .toList();

        // UNIT II — reduce, grouping, partitioning and collectors.
        int totalAvailable = books.stream()
                .map(Book::getAvailableCopies)
                .reduce(0, Integer::sum);

        Map<String, Long> booksByCategory = books.stream()
                .collect(Collectors.groupingBy(Book::getCategory, LinkedHashMap::new, Collectors.counting()));

        Map<String, Integer> copiesByCategory = books.stream()
                .collect(Collectors.groupingBy(
                        Book::getCategory,
                        LinkedHashMap::new,
                        Collectors.summingInt(Book::getAvailableCopies)));

        Map<Boolean, Long> overduePartition = borrowings.stream()
                .collect(Collectors.partitioningBy(
                        borrowing -> borrowing.getDueDate().isBefore(today),
                        Collectors.counting()));

        // Optional — safe result when a book is not found.
        Optional<Book> optionalBook = findBookById("b1");
        String optionalResult = optionalBook
                .map(Book::getTitle)
                .orElse("Book not found");

        // UNIT III — Java Date/Time API: LocalDate, parsing, formatting, Period, Duration.
        LocalDate parsedDate = parseDate("2026-11-05");
        String formattedDueDate = parsedDate.format(displayFormatter);
        Period standardBorrowPeriod = Period.between(today, today.plusDays(14));
        long daysUntilDue = ChronoUnit.DAYS.between(today, parsedDate);
        Duration processingDuration = Duration.between(LocalDateTime.now(), LocalDateTime.now().plusMinutes(5));

        // Keep variables meaningful for a classroom demo: these values can be inspected in a debugger.
        if (standardBorrowPeriod.isZero() || processingDuration.isNegative()) {
            throw new IllegalStateException("Unexpected time calculation");
        }

        // UNIT IV — CompletableFuture + ExecutorService + chaining.
        CompletableFuture<List<String>> notificationFuture = CompletableFuture
                .supplyAsync(this::generateDueDateNotifications, executor)
                .thenApplyAsync(messages -> messages.stream()
                        .map(String::trim)
                        .filter(message -> !message.isBlank())
                        .toList(), executor);

        List<String> asyncNotifications = notificationFuture.join();

        // UNIT IV — parallel stream demonstration.
        long parallelCount = books.parallelStream()
                .mapToLong(Book::getAvailableCopies)
                .sum();

        // UNIT V — switch expression and a small status message.
        String statusMessage = statusMessageFor(overduePartition.getOrDefault(true, 0L).intValue());

        return new JavaFeatureSummary(
                "Digital Library Management System",
                today,
                books.size(),
                totalAvailable,
                (int) borrowings.stream().filter(b -> "ACTIVE".equals(b.getStatus())).count(),
                (int) borrowings.stream().filter(b -> "OVERDUE".equals(b.getStatus())).count(),
                totalAvailable,
                availableTitles,
                booksByCategory,
                copiesByCategory,
                overduePartition,
                optionalResult,
                formattedDueDate,
                standardBorrowPeriod.toString(),
                daysUntilDue,
                processingDuration.toSeconds(),
                statusMessage,
                asyncNotifications,
                parallelCount,
                buildModernFeatureReport(totalAvailable, overduePartition.getOrDefault(true, 0L).intValue(), auditEntries),
                patternMatchingExample(optionalBook.orElse(null))
        );
    }

    public List<BookView> getAvailableBooks() {
        return books.stream()
                .filter(book -> book.getAvailableCopies() > 0)
                .sorted(Comparator.comparing(Book::getTitle))
                .map(book -> new BookView(book.getId(), book.getTitle(), book.getCategory(), book.getAvailableCopies()))
                .toList();
    }

    public List<Borrowing> getOverdueBorrowings() {
        LocalDate today = LocalDate.now();
        return borrowings.stream()
                .filter(borrowing -> borrowing.getDueDate().isBefore(today))
                .sorted(Comparator.comparing(Borrowing::getDueDate))
                .toList();
    }

    public Optional<Book> findBookById(String id) {
        return books.stream()
                .filter(book -> book.getId().equals(id))
                .findFirst();
    }

    public LocalDate parseDate(String value) {
        try {
            return LocalDate.parse(value);
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Date must use yyyy-MM-dd format", ex);
        }
    }

    private List<String> generateDueDateNotifications() {
        LocalDate today = LocalDate.now();
        return borrowings.stream()
                .filter(b -> "ACTIVE".equals(b.getStatus()))
                .map(b -> "Reminder: " + b.getBookTitle() + " is due on " + b.getDueDate().format(displayFormatter))
                .filter(message -> message.contains("due"))
                .toList();
    }

    private String statusMessageFor(int overdueCount) {
        return switch (overdueCount) {
            case 0 -> "All borrowed books are within their due period.";
            case 1 -> "There is 1 overdue borrowing. Fine calculation can be triggered.";
            default -> "There are " + overdueCount + " overdue borrowings. Review the circulation desk.";
        };
    }

    /** Java 15 text block example used for the project demonstration. */
    private String buildModernFeatureReport(int availableCopies, int overdueCount, int auditEntries) {
        return """
                DIGITAL LIBRARY JAVA FEATURES
                ------------------------------
                Available copies : %d
                Overdue records : %d
                Stream analytics: enabled
                Async processing: enabled
                Functional-interface audit entries: %d
                """.formatted(availableCopies, overdueCount, auditEntries);
    }

    /** Java 16 pattern matching for instanceof. */
    private String patternMatchingExample(Object value) {
        if (value instanceof Book book) {
            return "Pattern matching found book: " + book.getTitle();
        }
        return "No book found";
    }

    private static Book book(String id, String title, String author, String category, int total, int available) {
        Book book = new Book();
        book.setId(id);
        book.setTitle(title);
        book.setAuthor(author);
        book.setCategory(category);
        book.setIsbn("ISBN-" + id);
        book.setTotalCopies(total);
        book.setAvailableCopies(available);
        return book;
    }

    private static Borrowing borrowing(String id, String bookId, String title, String userId, String userName,
                                       LocalDate borrowDate, LocalDate dueDate, LocalDate returnDate,
                                       String status, int renewCount) {
        Borrowing borrowing = new Borrowing();
        borrowing.setId(id);
        borrowing.setBookId(bookId);
        borrowing.setBookTitle(title);
        borrowing.setUserId(userId);
        borrowing.setUserName(userName);
        borrowing.setBorrowDate(borrowDate);
        borrowing.setDueDate(dueDate);
        borrowing.setReturnDate(returnDate);
        borrowing.setStatus(status);
        borrowing.setRenewCount(renewCount);
        return borrowing;
    }

    @Override
    public void close() {
        executor.shutdown();
    }
}
