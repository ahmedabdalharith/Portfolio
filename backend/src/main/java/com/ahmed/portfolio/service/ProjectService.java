package com.ahmed.portfolio.service;

import com.ahmed.portfolio.model.Project;
import com.ahmed.portfolio.repository.ProjectRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @PostConstruct
    public void seedDefaultProjects() {
        if (projectRepository.count() == 0) {
            projectRepository.saveAll(List.of(
                Project.builder()
                    .title("BNB Dafatery — Personal Finance & Debt Management")
                    .category("Fintech · Personal Finance")
                    .description("Built debt tracking system, installment scheduling, daily expense logging, PDF report export, and AI-powered financial insights. Egypt's highest-rated personal finance app.")
                    .techStack("Kotlin, Jetpack Compose, MVVM, Room, Firebase, Retrofit")
                    .rating("4.9")
                    .downloads("5,000+")
                    .sortOrder(1)
                    .build(),
                Project.builder()
                    .title("TAS Travel — Umrah & Travel Booking")
                    .category("Cross-Platform · KMP")
                    .description("Delivered cross-platform booking app live on both Google Play and the Apple App Store with 60%+ shared Kotlin codebase.")
                    .techStack("Kotlin, Compose Multiplatform, KMP, MVVM, Ktor, REST APIs")
                    .sortOrder(2)
                    .build(),
                Project.builder()
                    .title("SheDrive — Women-Only Ride-Hailing")
                    .category("Ride-Hailing · Real-Time")
                    .description("Real-time GPS tracking, ride matching, fare calculation, and in-app communication across two role-specific apps (Passenger + Captain).")
                    .techStack("Kotlin, Jetpack Compose, MVVM, Google Maps SDK, Pusher, Firebase")
                    .sortOrder(3)
                    .build(),
                Project.builder()
                    .title("Kora Live — Live Football Streaming")
                    .category("Live Streaming · Real-Time")
                    .description("Adaptive bitrate video streaming with SignalR-powered group chat at under 200ms latency. Supports 100+ concurrent users.")
                    .techStack("Kotlin, Jetpack Compose, ExoPlayer, SignalR, MVVM")
                    .sortOrder(4)
                    .build(),
                Project.builder()
                    .title("Yalla Style Provider — On-Demand Salon Booking")
                    .category("On-Demand Services")
                    .description("Real-time booking management, geolocation-based service area display, and order history for 100+ providers.")
                    .techStack("Kotlin, Jetpack Compose, MVVM, Clean Architecture, Retrofit, Google Maps SDK")
                    .sortOrder(5)
                    .build(),
                Project.builder()
                    .title("PremierShare — Real Estate Marketplace")
                    .category("Real Estate")
                    .description("Advanced property search with map browsing, photo gallery, wishlist, and full property listing specifications.")
                    .techStack("Kotlin, MVVM, Clean Architecture, Retrofit, Room, Google Maps SDK")
                    .sortOrder(6)
                    .build()
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

    public Project create(Project project) {
        return projectRepository.save(project);
    }

    public Project update(Long id, Project updated) {
        Project existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setCategory(updated.getCategory());
        existing.setDescription(updated.getDescription());
        existing.setTechStack(updated.getTechStack());
        existing.setRating(updated.getRating());
        existing.setDownloads(updated.getDownloads());
        existing.setPlayStoreUrl(updated.getPlayStoreUrl());
        existing.setSortOrder(updated.getSortOrder());
        return projectRepository.save(existing);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}
