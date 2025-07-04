import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

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
    name: "My Favorites",
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

  const handleToggle = (categoryName) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
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
          engineer and artist
        </motion.p>
        <nav className="bio-links">
          {linkCategories.map((category, idx) => (
            <div key={category.name} style={{ width: "100%" }}>
              <motion.button
                className="category-toggle"
                onClick={() => handleToggle(category.name)}
                initial={false}
                animate={{
                  backgroundColor:
                    openCategory === category.name ? "#f5f5f5" : "#fff",
                }}
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
                          <motion.a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{ x: 5, color: "#555" }}
                            whileTap={{ scale: 0.98 }}
                            style={{ fontWeight: 500, fontSize: "1rem" }}
                          >
                            {link.name}
                          </motion.a>
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
