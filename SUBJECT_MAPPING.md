# Digital Library Management System — Java Subject Mapping

This version of the project is intentionally adapted to the **Functional Programming with Java 8** syllabus and the Java 9+ features listed in the supplied syllabus.

## Unit I — Functional Programming with Java 8

- Lambda expressions: `LibraryFunctionalService` uses lambdas with `Predicate`, `Consumer`, `Supplier` and stream operations.
- Functional interfaces: `Predicate<Book>`, `Function<Book, String>`, `Consumer<Book>`, `Supplier<LocalDate>`.
- Method references: `Book::getTitle`, `Book::getCategory`, `LocalDate::now`, `String::trim`.
- Stream API: filtering and mapping available books.

## Unit II — Advanced Stream Operations

- Intermediate operations: `filter`, `map`, `sorted`.
- Terminal operations: `toList`, `count`, `sum`, `reduce`.
- Grouping: `Collectors.groupingBy` groups books by category.
- Aggregation: `Collectors.summingInt`, `Collectors.counting`, and `reduce` calculate library statistics.
- Optional: `findBookById()` returns `Optional<Book>`.

## Unit III — Date and Time API

- `LocalDate` is used for borrow, due and return dates.
- `LocalDateTime` is used in asynchronous processing timing.
- Date parsing: `LocalDate.parse()`.
- Date formatting: `DateTimeFormatter`.
- `Period`: represents the standard 14-day borrowing period.
- `Duration`: demonstrates time-based processing duration.
- `ChronoUnit.DAYS`: calculates days until a due date.

## Unit IV — Concurrency and CompletableFuture

- `CompletableFuture.supplyAsync()` performs notification generation asynchronously.
- `thenApplyAsync()` demonstrates future chaining.
- `ExecutorService` with a fixed thread pool manages asynchronous tasks.
- `parallelStream()` calculates available copies in parallel.

## Unit V — Features Beyond Java 8

- Java 10+: local variable type inference can be introduced with `var` where appropriate during lab demonstration.
- Java 12+: switch expression is used in `statusMessageFor()`.
- Java 14+: record types are used for API DTOs (`JavaFeatureSummary`, `BookView`).
- Java 15+: text blocks can be used when extending notification/report templates.
- Java 16+: modern pattern matching can be demonstrated when validating API input.
- Java 9+: the backend can be modularized later with `module-info.java` if the faculty requires a JPMS demonstration.

## Frontend Demonstration

The **Java 8+ Concepts** page calls the Spring Boot endpoint and displays the calculations, making the syllabus concepts visible during a project demonstration.
