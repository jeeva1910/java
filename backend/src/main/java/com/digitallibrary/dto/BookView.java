package com.digitallibrary.dto;

/** Java 17 record for a small API response. */
public record BookView(String id, String title, String category, int availableCopies) {}
