package com.ahmed.portfolio.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class PlayStoreScraperService {

    public static class AppData {
        public String title;
        public String iconUrl;
        public String rating;
        public String downloads;
    }

    public AppData scrapeAppDetails(String appId) {
        if (appId == null || appId.trim().isEmpty()) {
            return null;
        }

        try {
            String url = "https://play.google.com/store/apps/details?id=" + appId + "&hl=en&gl=US";
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                    .timeout(5000)
                    .get();

            AppData data = new AppData();
            
            // Title
            Element titleElement = doc.selectFirst("h1[itemprop=name]");
            if (titleElement != null) data.title = titleElement.text();

            // Icon URL (usually inside an img tag with alt "Icon image")
            Element iconElement = doc.selectFirst("img[alt=Icon image]");
            if (iconElement != null) data.iconUrl = iconElement.attr("src");

            // Rating (look for aria-label containing "stars out of five")
            Element ratingElement = doc.selectFirst("div[aria-label*='stars out of five']");
            if (ratingElement != null) {
                String ariaLabel = ratingElement.attr("aria-label"); // e.g., "Rated 4.5 stars out of five stars"
                data.rating = ariaLabel.replaceAll("[^0-9.]", "").replace("...", "").trim();
            }

            // Downloads (usually inside a div with containing text "+")
            Element downloadsElement = doc.selectFirst("div:containsOwn(+)");
            if (downloadsElement != null) {
                // Often play store puts it in a specific class structure, but finding by text `+` is a basic heuristic
                // An alternative reliable way is finding the div matching "Downloads" label
                data.downloads = downloadsElement.text();
            }

            return data;
        } catch (IOException e) {
            System.err.println("Failed to scrape Google Play for app: " + appId + ". " + e.getMessage());
            return null;
        }
    }
}
