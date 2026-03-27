package com.ahmed.portfolio.service;

import com.ahmed.portfolio.model.Project;
import com.ahmed.portfolio.repository.ProjectRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
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
                    null,
                    1
                ),
                new Project(
                    "TAS Travel — Umrah & Travel Booking",
                    "Cross-Platform · KMP",
                    "Delivered cross-platform booking app live on both Google Play and the Apple App Store with 60%+ shared Kotlin codebase.",
                    "Kotlin, Compose Multiplatform, KMP, MVVM, Ktor, REST APIs",
                    null,
                    null,
                    null,
                    2
                ),
                new Project(
                    "SheDrive — Women-Only Ride-Hailing",
                    "Ride-Hailing · Real-Time",
                    "Real-time GPS tracking, ride matching, fare calculation, and in-app communication across two role-specific apps (Passenger + Captain).",
                    "Kotlin, Jetpack Compose, MVVM, Google Maps SDK, Pusher, Firebase",
                    null,
                    null,
                    null,
                    3
                ),
                new Project(
                    "Kora Live — Live Football Streaming",
                    "Live Streaming · Real-Time",
                    "Adaptive bitrate video streaming with SignalR-powered group chat at under 200ms latency. Supports 100+ concurrent users.",
                    "Kotlin, Jetpack Compose, ExoPlayer, SignalR, MVVM",
                    null,
                    null,
                    null,
                    4
                ),
                new Project(
                    "Yalla Style Provider — On-Demand Salon Booking",
                    "On-Demand Services",
                    "Real-time booking management, geolocation-based service area display, and order history for 100+ providers.",
                    "Kotlin, Jetpack Compose, MVVM, Clean Architecture, Retrofit, Google Maps SDK",
                    null,
                    null,
                    null,
                    5
                ),
                new Project(
                    "PremierShare — Real Estate Marketplace",
                    "Real Estate",
                    "Advanced property search with map browsing, photo gallery, wishlist, and full property listing specifications.",
                    "Kotlin, MVVM, Clean Architecture, Retrofit, Room, Google Maps SDK",
                    null,
                    null,
                    null,
                    6
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
