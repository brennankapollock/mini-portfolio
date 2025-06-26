import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Linkedin,
  Github,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Music,
  Shirt,
  Film,
  Headphones,
} from "lucide-react";
import posthog from "posthog-js";
import "./App.css";

// Initialize PostHog
posthog.init(process.env.REACT_APP_POSTHOG_KEY || "phc_placeholder", {
  api_host: process.env.REACT_APP_POSTHOG_HOST || "https://us.i.posthog.com",
  person_profiles: "identified_only",
  capture_pageview: true, // Enable automatic pageview tracking
  capture_pageleave: true, // Enable automatic pageleave tracking
  loaded: (posthog) => {
    if (process.env.NODE_ENV === "development") console.log("PostHog loaded");
  },
});

// Icon mapping function
const getIconForLink = (linkName) => {
  const iconProps = { size: 18, strokeWidth: 2 };

  switch (linkName.toLowerCase()) {
    case "website":
      return <Globe {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    case "spotify":
    case "apple music":
      return <Music {...iconProps} />;
    case "wherring":
      return <Shirt {...iconProps} />;
    case "letterboxd":
      return <Film {...iconProps} />;
    case "cosmos":
      return <Headphones {...iconProps} />;
    default:
      return <Globe {...iconProps} />;
  }
};

const linkCategories = [
  {
    name: "Sun Rot Studios",
    links: [
      { name: "Website", url: "http://www.sunrotstudios.com" },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/sunrotstudios/about/?viewAsMember=true",
      },
      { name: "Github", url: "https://github.com/sunrotstudios" },
      {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61576240667177",
      },
      { name: "Twitter", url: "https://x.com/sunrotstudios" },
      { name: "YouTube", url: "https://www.youtube.com/@sunrotstudios" },
      { name: "Cosmos", url: "https://www.cosmos.so/sunrotstudios" },
    ],
  },
  {
    name: "Social",
    links: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/brennanpollock/" },
      {
        name: "Instagram",
        url: "https://www.instagram.com/brennankeithpollock/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61576731083028",
      },
      { name: "Github", url: "https://github.com/brennankapollock" },
    ],
  },
  {
    name: "Media & Fashion",
    links: [
      {
        name: "Wherring",
        url: "https://app.whering.co.uk/profile/brennankapollock/pieces",
      },
      { name: "Letterboxd", url: "https://letterboxd.com/breninvenice/" },
    ],
  },
  {
    name: "Playlists",
    links: [
      {
        name: "Spotify",
        url: "https://open.spotify.com/user/31zlcrd53et4wdhiau73uucggyg4",
      },
      { name: "Apple Music", url: "https://music.apple.com/profile/yoctangee" },
    ],
  },
];

function App() {
  const [openCategory, setOpenCategory] = useState(null);

  // PostHog will automatically track pageviews and pageleaves
  useEffect(() => {
    // Optional: Set user properties for better analytics
    posthog.setPersonProperties({
      page_type: "link_bio",
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    });
  }, []);

  const handleToggle = (categoryName) => {
    const isOpening = openCategory !== categoryName;
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));

    // Track category toggle
    posthog.capture("category_toggled", {
      category: categoryName,
      action: isOpening ? "expand" : "collapse",
      timestamp: new Date().toISOString(),
    });
  };

  const handleLinkClick = (link, category) => {
    // Track link clicks
    posthog.capture("link_clicked", {
      link_name: link.name,
      link_url: link.url,
      category: category,
      timestamp: new Date().toISOString(),
      link_domain: new URL(link.url).hostname,
    });
  };

  const handleLinkHover = (link, category) => {
    // Track link hovers for engagement analysis
    posthog.capture("link_hovered", {
      link_name: link.name,
      category: category,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="bio-root">
      <motion.main
        className="bio-main"
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="bio-title"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Brennan Pollock
        </motion.h1>
        <motion.p
          className="bio-desc"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>artist</span>
          <span>&</span>
          <span>engineer</span>
        </motion.p>
        <nav className="bio-links">
          {linkCategories.map((category, idx) => (
            <div key={category.name} style={{ width: "100%" }}>
              <motion.button
                className="category-toggle"
                onClick={() => handleToggle(category.name)}
                initial={false}
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  border: "none",
                  background: "none",
                  padding: "0.5rem 0",
                  cursor: "pointer",
                  outline: "none",
                  marginBottom: "0.2rem",
                  borderBottom: "2px solid #111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                whileHover={{ x: 5 }}
              >
                {category.name}
                <motion.span
                  initial={false}
                  animate={{ rotate: openCategory === category.name ? 90 : 0 }}
                  style={{ display: "inline-block", marginLeft: 8 }}
                >
                  ▶
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {openCategory === category.name && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0.5rem 0 1rem 0",
                      }}
                    >
                      {category.links.map((link) => (
                        <li key={link.url} style={{ marginBottom: "0.5rem" }}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick(link, category.name)}
                            onMouseEnter={() =>
                              handleLinkHover(link, category.name)
                            }
                            className="bio-link"
                            style={{
                              fontWeight: 500,
                              fontSize: "1rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              color: "rgb(17, 17, 17)",
                              textDecoration: "none",
                              WebkitTextFillColor: "rgb(17, 17, 17)",
                              border: "none",
                              outline: "none"
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center" }}>
                              {getIconForLink(link.name)}
                            </span>
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </motion.main>
    </div>
  );
}

export default App;
