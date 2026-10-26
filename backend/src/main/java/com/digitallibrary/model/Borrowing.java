package com.digitallibrary.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "borrowings")
public class Borrowing {
    @Id
    private String id;
    private String bookId;
    private String bookTitle;
    private String userId;
    private String userName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate borrowDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate;

    private String status; // ACTIVE, RETURNED, OVERDUE
    private int renewCount;

    public Borrowing() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }
    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public LocalDate getBorrowDate() { return borrowDate; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowDate = borrowDate; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getRenewCount() { return renewCount; }
    public void setRenewCount(int renewCount) { this.renewCount = renewCount; }
}
