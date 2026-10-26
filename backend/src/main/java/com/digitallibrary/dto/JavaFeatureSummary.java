package com.digitallibrary.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Java 17 record used as a compact immutable DTO.
 * This project intentionally uses a record so the syllabus topic is visible in the codebase.
 */
public record JavaFeatureSummary(
        String projectName,
        LocalDate reportDate,
        int totalBooks,
        int availableCopies,
        int activeBorrowings,
        int overdueBorrowings,
        int totalAvailableCopiesUsingReduce,
        List<String> availableBookTitles,
        Map<String, Long> booksByCategory,
        Map<String, Integer> availableCopiesByCategory,
        Map<Boolean, Long> borrowingsByOverdueFlag,
        String optionalBookResult,
        String formattedDueDate,
        String sampleBorrowingPeriod,
        long daysUntilFirstDueDate,
        long processingDurationSeconds,
        String statusMessage,
        List<String> asyncNotifications,
        long parallelAvailableCopyCount,
        String modernFeatureReport,
        String patternMatchingResult
) {}
