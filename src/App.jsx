import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, RefreshCw } from 'lucide-react';

const QUOTES_DATA = [
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House"
  },
  {
    text: "Make it simple, but significant.",
    author: "Don Draper"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine"
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds"
  },
  {
    text: "The power of imagination makes us infinite.",
    author: "John Muir"
  }
];

const THEMES = [
  {
    name: "Mystic Nebula",
    bgClass: "from-slate-950 via-purple-950 to-indigo-950",
    accentColor: "rgba(168, 85, 247, 0.4)",
    glowColor: "rgba(139, 92, 246, 0.3)"
  },
  {
    name: "Emerald Forest",
    bgClass: "from-slate-950 via-emerald-950 to-teal-950",
    accentColor: "rgba(16, 185, 129, 0.4)",
    glowColor: "rgba(20, 184, 166, 0.3)"
  },
  {
    name: "Deep Ocean",
    bgClass: "from-slate-950 via-blue-950 to-cyan-950",
    accentColor: "rgba(59, 130, 246, 0.4)",
    glowColor: "rgba(6, 182, 212, 0.3)"
  },
  {
    name: "Sunset Ember",
    bgClass: "from-slate-950 via-rose-950 to-orange-950",
    accentColor: "rgba(244, 63, 94, 0.4)",
    glowColor: "rgba(249, 115, 22, 0.3)"
  },
  {
    name: "Cyberpunk Night",
    bgClass: "from-slate-950 via-fuchsia-950 to-rose-950",
    accentColor: "rgba(217, 70, 239, 0.4)",
    glowColor: "rgba(244, 63, 94, 0.3)"
  }
];

// Inline classic Twitter SVG icon to avoid external module import dependencies
const TwitterIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
    {...props}
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

function App() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [totalQuotesCount, setTotalQuotesCount] = useState(0);

  // Initialize random quote and theme on mount
  useEffect(() => {
    const randomQuote = Math.floor(Math.random() * QUOTES_DATA.length);
    const randomTheme = Math.floor(Math.random() * THEMES.length);
    setCurrentQuoteIndex(randomQuote);
    setCurrentThemeIndex(randomTheme);
  }, []);

  const handleNewQuote = () => {
    if (isFading) return;
    
    setIsFading(true);
    
    // Smooth transition timeout
    setTimeout(() => {
      // Avoid immediate repeat
      let nextQuoteIndex;
      do {
        nextQuoteIndex = Math.floor(Math.random() * QUOTES_DATA.length);
      } while (nextQuoteIndex === currentQuoteIndex && QUOTES_DATA.length > 1);

      // Cycle background theme
      let nextThemeIndex;
      do {
        nextThemeIndex = Math.floor(Math.random() * THEMES.length);
      } while (nextThemeIndex === currentThemeIndex && THEMES.length > 1);

      setCurrentQuoteIndex(nextQuoteIndex);
      setCurrentThemeIndex(nextThemeIndex);
      setTotalQuotesCount(prev => prev + 1);
      setIsFading(false);
    }, 400); // Wait for fadeout CSS animation
  };

  const activeQuote = QUOTES_DATA[currentQuoteIndex];
  const activeTheme = THEMES[currentThemeIndex];

  // If initial load hasn't set state yet, use safety fallback
  if (!activeQuote || !activeTheme) {
    return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Loading Inspiration...</div>;
  }

  // Encode Twitter URL properly for sharing
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${activeQuote.text}" — ${activeQuote.author}`
  )}`;

  return (
    <div className={`app-container bg-gradient-to-br ${activeTheme.bgClass}`}>
      {/* Subtle background glow effect */}
      <div 
        className="radial-glow-overlay" 
        style={{ 
          background: `radial-gradient(circle 600px at 50% 50%, ${activeTheme.accentColor}, transparent)` 
        }}
      />

      <div className="container-inner">
        {/* Elegant Title Header */}
        <header className="app-header">
          <div className="sparkle-tag">
            <Sparkles className="sparkle-icon" size={14} />
            <span>Sparks of Inspiration</span>
          </div>
          <h1>Whisperings of Wisdom</h1>
        </header>

        {/* Central Quote Box */}
        <main 
          id="quote-box" 
          className="quote-box"
          style={{ 
            boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 40px 5px ${activeTheme.glowColor}` 
          }}
        >
          {/* Decorative quote marks */}
          <div className="quote-mark-top">
            <Quote size={48} />
          </div>

          {/* Quote content container with dynamic animation class */}
          <div className={`quote-content ${isFading ? 'fade-out' : 'fade-in'}`}>
            <p id="text" className="quote-text">
              {activeQuote.text}
            </p>
            <div className="quote-divider" />
            <p id="author" className="quote-author">
              — {activeQuote.author}
            </p>
          </div>

          <div className="quote-mark-bottom">
            <Quote size={48} />
          </div>

          {/* Quote Box Actions */}
          <footer className="quote-box-footer">
            <a
              id="tweet-quote"
              href={twitterIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button tweet-button"
              title="Share this quote on Twitter"
            >
              <TwitterIcon size={20} />
              <span>Tweet Wisdom</span>
            </a>

            <button
              id="new-quote"
              onClick={handleNewQuote}
              className={`action-button new-quote-button ${isFading ? 'spinning' : ''}`}
              title="Generate a new random quote"
            >
              <RefreshCw size={20} className="refresh-icon" />
              <span>New Insight</span>
            </button>
          </footer>
        </main>

        {/* Footer info */}
        <footer className="app-footer">
          <p>Crafted for FreeCodeCamp Quote Machine Project</p>
          <span className="stats-indicator">Insights Explored: {totalQuotesCount + 1}</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
