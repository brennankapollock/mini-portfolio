import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
const tableName = process.env.REACT_APP_AIRTABLE_TABLE_NAME || "Links";

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = new Airtable({ apiKey }).base(baseId);
    base(tableName)
      .select({
        sort: [{ field: "Order", direction: "asc" }],
      })
      .all()
      .then((records) => {
        setLinks(
          records.map((record) => ({
            id: record.id,
            name: record.get("Name"),
            url: record.get("URL"),
            description: record.get("Description"),
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load links.");
        setLoading(false);
      });
  }, []);

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
        
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="loading-spinner"></div>
            </motion.div>
          )}
          
          {error && (
            <motion.p 
              style={{ color: "red" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
          
          {!loading && !error && (
            <motion.nav 
              className="bio-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                  {link.description ? (
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "0.9rem",
                        marginLeft: 8,
                        opacity: 0.7,
                      }}
                    >
                      {link.description}
                    </span>
                  ) : null}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

export default App;
