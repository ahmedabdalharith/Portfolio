package com.ahmed.portfolio.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    private String category;

    @Column(columnDefinition = "TEXT")
    @NotBlank
    private String description;

    @Column(name = "tech_stack", columnDefinition = "TEXT")
    private String techStack;

    private String rating;

    private String downloads;

    @Column(name = "play_store_url")
    private String playStoreUrl;

    @Column(name = "sort_order")
    private int sortOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Project() {
    }

    public Project(String title, String category, String description, String techStack, String rating, String downloads, String playStoreUrl, int sortOrder) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.techStack = techStack;
        this.rating = rating;
        this.downloads = downloads;
        this.playStoreUrl = playStoreUrl;
        this.sortOrder = sortOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }
    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }
    public String getDownloads() { return downloads; }
    public void setDownloads(String downloads) { this.downloads = downloads; }
    public String getPlayStoreUrl() { return playStoreUrl; }
    public void setPlayStoreUrl(String playStoreUrl) { this.playStoreUrl = playStoreUrl; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

