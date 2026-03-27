package com.ahmed.portfolio.service;

import com.ahmed.portfolio.model.Project;
import com.ahmed.portfolio.repository.ProjectRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final PlayStoreScraperService scraperService;

    public ProjectService(ProjectRepository projectRepository, PlayStoreScraperService scraperService) {
        this.projectRepository = projectRepository;
        this.scraperService = scraperService;
    }

    @PostConstruct
    public void seedDefaultProjects() {
        if (projectRepository.count() == 0) {
            projectRepository.saveAll(List.of(
                new Project(
                    "BNB Dafatery — Personal Finance & Debt Management",
                    "Fintech · Personal Finance",
                    "Built debt tracking system, installment scheduling, daily expense logging, PDF report export, and AI-powered financial insights. Egypt's highest-rated personal finance app.",
                    "Kotlin, Jetpack Compose, MVVM, Room, Firebase, Retrofit",
                    "4.9",
                    "5,000+",
                    "https://play.google.com/store/apps/details?id=com.bnb.dafatery",
                    1,
                    null,
                    "com.bnb.dafatery"
                ),
                new Project(
                    "TAS Travel — Umrah & Travel Booking",
                    "Cross-Platform · KMP",
                    "Delivered cross-platform booking app live on both Google Play and the Apple App Store with 60%+ shared Kotlin codebase.",
                    "Kotlin, Compose Multiplatform, KMP, MVVM, Ktor, REST APIs",
                    null,
                    null,
                    null,
                    2,
                    null,
                    null
                ),
                new Project(
                    "SheDrive — Women-Only Ride-Hailing",
                    "Ride-Hailing · Real-Time",
                    "Real-time GPS tracking, ride matching, fare calculation, and in-app communication across two role-specific apps (Passenger + Captain).",
                    "Kotlin, Jetpack Compose, MVVM, Google Maps SDK, Pusher, Firebase",
                    null,
                    null,
                    null,
                    3,
                    null,
                    null
                ),
                new Project(
                    "Kora Live — Live Football Streaming",
                    "Live Streaming · Real-Time",
                    "Adaptive bitrate video streaming with SignalR-powered group chat at under 200ms latency. Supports 100+ concurrent users.",
                    "Kotlin, Jetpack Compose, ExoPlayer, SignalR, MVVM",
                    null,
                    null,
                    null,
                    4,
                    null,
                    null
                ),
                new Project(
                    "Yalla Style Provider — On-Demand Salon Booking",
                    "On-Demand Services",
                    "Real-time booking management, geolocation-based service area display, and order history for 100+ providers.",
                    "Kotlin, Jetpack Compose, MVVM, Clean Architecture, Retrofit, Google Maps SDK",
                    null,
                    null,
                    null,
                    5,
                    null,
                    null
                ),
                new Project(
                    "PremierShare — Real Estate Marketplace",
                    "Real Estate",
                    "Advanced property search with map browsing, photo gallery, wishlist, and full property listing specifications.",
                    "Kotlin, MVVM, Clean Architecture, Retrofit, Room, Google Maps SDK",
                    null,
                    null,
                    null,
                    6,
                    null,
                    null
                )
            ));
        }
    }

    public List<Project> findAll() {
        return projectRepository.findAllByOrderBySortOrderAscCreatedAtDesc();
    }

    public Project findById(Long id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found: " + id));
    }

    private void enrichWithPlayStoreData(Project project) {
        if (project.getAppId() != null && !project.getAppId().trim().isEmpty()) {
            PlayStoreScraperService.AppData data = scraperService.scrapeAppDetails(project.getAppId());
            if (data != null) {
                if (data.iconUrl != null) project.setIconUrl(data.iconUrl);
                if (data.rating != null) project.setRating(data.rating);
                if (data.downloads != null) project.setDownloads(data.downloads);
                if (project.getPlayStoreUrl() == null || project.getPlayStoreUrl().isEmpty()) {
                    project.setPlayStoreUrl("https://play.google.com/store/apps/details?id=" + project.getAppId());
                }
            }
        }
    }

    public Project create(Project project) {
        enrichWithPlayStoreData(project);
        return projectRepository.save(project);
    }

    public Project update(Long id, Project updated) {
        Project existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setCategory(updated.getCategory());
        existing.setDescription(updated.getDescription());
        existing.setTechStack(updated.getTechStack());
        existing.setPlayStoreUrl(updated.getPlayStoreUrl());
        existing.setSortOrder(updated.getSortOrder());
        existing.setAppId(updated.getAppId());
        
        // If user manually changed rating/downloads/icon, keep it, otherwise scrape
        if (updated.getRating() != null && !updated.getRating().isEmpty()) existing.setRating(updated.getRating());
        if (updated.getDownloads() != null && !updated.getDownloads().isEmpty()) existing.setDownloads(updated.getDownloads());
        if (updated.getIconUrl() != null && !updated.getIconUrl().isEmpty()) existing.setIconUrl(updated.getIconUrl());
        
        enrichWithPlayStoreData(existing);
        
        return projectRepository.save(existing);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}
