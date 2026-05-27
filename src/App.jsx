import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { marked } from 'marked';
import { Quote, Sparkles, RefreshCw, FileText, Eye, BookOpen, Layers, Maximize2, Minimize2, Trash2 } from 'lucide-react';

// Configure marked options globally to enable carriage returns as <br>
marked.setOptions({
  breaks: true,
  gfm: true
});

const DEFAULT_MARKDOWN = `# Elegant Markdown Previewer

## Sub-heading: Write beautiful styled documents

Welcome to the markdown playground! Here, you can compile text in real-time. 

### 1. Essential Elements

To include links: Learn more at [FreeCodeCamp](https://www.freecodecamp.org/).

Inline code can be written like this: \`const active = true;\`.

For multiline code blocks, specify the language:
\`\`\`javascript
function calculateWisdom() {
  const learning = true;
  const coding = true;
  return learning && coding ? "Infinite" : "Unbound";
}
\`\`\`

You can make text **bold and strong**, or *italicized and elegant*.

### 2. Lists and Bullet Points

Create structured lists:
- Learn the markdown formatting syntax.
- Build clean, documentation-heavy web applications.
- Wow users with beautiful glassmorphic dark UIs.

### 3. Styled Blockquotes

> "Simplicity is the ultimate sophistication. When you eliminate all superfluous elements, you arrive at the absolute truth."
> — Leonardo da Vinci

### 4. Rich Media & Images

Insert responsive placeholder or high-res images:
![Aesthetic Aurora Gradient](https://picsum.photos/id/10/600/350)

*Enjoy compiling markdown documents dynamically with zero friction.*`;

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

// Inline classic Twitter SVG icon to avoid external module dependency
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
  const [activeTab, setActiveTab] = useState('previewer'); // Default active tab is 'previewer' to pass FCC tests instantly
  
  // Markdown Previewer State
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  // Random Quote State
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

  // Controlled Editor Input - wrapped in flushSync for React 19 test suite compatibility
  const handleMarkdownChange = (e) => {
    flushSync(() => {
      setMarkdown(e.target.value);
    });
  };

  // Clear Markdown text
  const handleClearMarkdown = () => {
    flushSync(() => {
      setMarkdown('');
    });
  };

  // Quote Generation
  const handleNewQuote = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      let nextQuoteIndex;
      do {
        nextQuoteIndex = Math.floor(Math.random() * QUOTES_DATA.length);
      } while (nextQuoteIndex === currentQuoteIndex && QUOTES_DATA.length > 1);

      let nextThemeIndex;
      do {
        nextThemeIndex = Math.floor(Math.random() * THEMES.length);
      } while (nextThemeIndex === currentThemeIndex && THEMES.length > 1);

      setCurrentQuoteIndex(nextQuoteIndex);
      setCurrentThemeIndex(nextThemeIndex);
      setTotalQuotesCount(prev => prev + 1);
      setIsFading(false);
    }, 400);
  };

  const activeQuote = QUOTES_DATA[currentQuoteIndex];
  const activeTheme = THEMES[currentThemeIndex];
  
  const twitterIntentUrl = activeQuote 
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${activeQuote.text}" — ${activeQuote.author}`)}` 
    : '';

  // Parse HTML string from markdown
  const getParsedHtml = () => {
    try {
      return { __html: marked.parse(markdown) };
    } catch (e) {
      return { __html: `<p style="color: #f43f5e;">Parsing Error: ${e.message}</p>` };
    }
  };

  return (
    <div className={`app-container bg-gradient-to-br ${activeTheme?.bgClass || 'from-slate-950 to-slate-900'}`}>
      <div 
        className="radial-glow-overlay" 
        style={{ 
          background: `radial-gradient(circle 700px at 50% 50%, ${activeTheme?.accentColor || 'rgba(168, 85, 247, 0.2)'}, transparent)` 
        }}
      />

      <div className="container-inner dashboard-width">
        {/* Elegant Portfolio Tab Controls */}
        <nav className="dashboard-nav">
          <button 
            className={`nav-tab ${activeTab === 'previewer' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('previewer')}
          >
            <FileText size={18} />
            <span>Markdown Previewer</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'quotes' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            <Quote size={16} style={{ transform: 'rotate(180deg)' }} />
            <span>Quote Machine</span>
          </button>
        </nav>

        {/* Dynamic Project Rendering */}
        {activeTab === 'previewer' && (
          <div className="previewer-root">
            {/* Elegant Header */}
            <header className="app-header">
              <div className="sparkle-tag">
                <Sparkles className="sparkle-icon" size={14} />
                <span>Real-time compiler</span>
              </div>
              <h1>Markup Compiler</h1>
              <p className="app-subtitle">Write structural markdown and view instant aesthetic compilations</p>
            </header>

            {/* Split Screen Workspace */}
            <div className={`workspace-panels ${editorMaximized ? 'only-editor' : ''} ${previewMaximized ? 'only-preview' : ''}`}>
              
              {/* EDITOR PANEL */}
              {!previewMaximized && (
                <section className={`panel-card editor-panel ${editorMaximized ? 'maximized' : ''}`}>
                  <header className="panel-header">
                    <div className="panel-title">
                      <FileText size={16} className="title-icon text-purple-400" />
                      <h2>Source Editor</h2>
                    </div>
                    <div className="panel-actions">
                      <button 
                        onClick={handleClearMarkdown} 
                        className="panel-action-btn delete-btn" 
                        title="Clear all text"
                      >
                        <Trash2 size={15} />
                      </button>
                      <button 
                        onClick={() => setEditorMaximized(!editorMaximized)} 
                        className="panel-action-btn expand-btn"
                        title={editorMaximized ? "Restore view" : "Maximize editor"}
                      >
                        {editorMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                      </button>
                    </div>
                  </header>

                  <div className="textarea-container">
                    {/* Controlled TextArea Editor element */}
                    <textarea
                      id="editor"
                      value={markdown}
                      onChange={handleMarkdownChange}
                      placeholder="Type some GitHub flavored markdown here..."
                      className="editor-textarea"
                    />
                  </div>
                  <footer className="panel-footer-stats">
                    <span>Characters: {markdown.length}</span>
                    <span>Lines: {markdown.split('\n').length}</span>
                  </footer>
                </section>
              )}

              {/* PREVIEW PANEL */}
              {!editorMaximized && (
                <section className={`panel-card preview-panel ${previewMaximized ? 'maximized' : ''}`}>
                  <header className="panel-header">
                    <div className="panel-title">
                      <Eye size={16} className="title-icon text-emerald-400" />
                      <h2>Aesthetic Preview</h2>
                    </div>
                    <div className="panel-actions">
                      <button 
                        onClick={() => setPreviewMaximized(!previewMaximized)} 
                        className="panel-action-btn expand-btn"
                        title={previewMaximized ? "Restore view" : "Maximize preview"}
                      >
                        {previewMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                      </button>
                    </div>
                  </header>

                  {/* Rendered Preview element */}
                  <div 
                    id="preview" 
                    className="preview-viewport"
                    dangerouslySetInnerHTML={getParsedHtml()}
                  />
                  <footer className="panel-footer-stats">
                    <span>Format: GFM Output</span>
                  </footer>
                </section>
              )}

            </div>
          </div>
        )}

        {activeTab === 'quotes' && activeQuote && (
          <div className="quotes-root">
            {/* Elegant Header */}
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
                boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 40px 5px ${activeTheme?.glowColor || 'rgba(139, 92, 246, 0.2)'}` 
              }}
            >
              <div className="quote-mark-top">
                <Quote size={48} />
              </div>

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
          </div>
        )}

        {/* Global Footer info */}
        <footer className="app-footer spacer-top">
          <p>Portfolio Development & Dashboard Suite</p>
          <span className="stats-indicator">Active Domain: project01.andredev.web.id</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
