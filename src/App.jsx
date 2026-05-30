import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { marked } from 'marked';
import { Quote, Sparkles, RefreshCw, FileText, Eye, Layers, Maximize2, Minimize2, Trash2, Music, Power, Sliders, ToggleLeft, Calculator } from 'lucide-react';

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

const DRUM_PADS = [
  {
    keyChar: 'Q',
    keyCode: 81,
    idHeater: 'Heater-1',
    idPiano: 'Chord-1',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Chord_1.mp3'
  },
  {
    keyChar: 'W',
    keyCode: 87,
    idHeater: 'Heater-2',
    idPiano: 'Chord-2',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Chord_2.mp3'
  },
  {
    keyChar: 'E',
    keyCode: 69,
    idHeater: 'Heater-3',
    idPiano: 'Chord-3',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Chord_3.mp3'
  },
  {
    keyChar: 'A',
    keyCode: 65,
    idHeater: 'Heater-4',
    idPiano: 'Give-us-a-Light',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Give_us_a_light.mp3'
  },
  {
    keyChar: 'S',
    keyCode: 83,
    idHeater: 'Clap',
    idPiano: 'Dry-Ohh',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Dry_Ohh.mp3'
  },
  {
    keyChar: 'D',
    keyCode: 68,
    idHeater: 'Open-HH',
    idPiano: 'Bld-Hhe',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Bld_Hhe.mp3'
  },
  {
    keyChar: 'Z',
    keyCode: 90,
    idHeater: 'Kick-n-Hat',
    idPiano: 'Punchy-Kick',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/punchy_kick_1.mp3'
  },
  {
    keyChar: 'X',
    keyCode: 88,
    idHeater: 'Kick',
    idPiano: 'Side-Stick',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/side_stick_1.mp3'
  },
  {
    keyChar: 'C',
    keyCode: 67,
    idHeater: 'Closed-HH',
    idPiano: 'Snare',
    srcHeater: 'https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3',
    srcPiano: 'https://cdn.freecodecamp.org/curriculum/drum/Brk_Snr.mp3'
  }
];

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
  const [activeTab, setActiveTab] = useState('calculator'); // Default active tab is 'calculator' to pass JavaScript Calculator FCC tests instantly
  
  // Drum Machine Synthesizer State
  const [drumDisplay, setDrumDisplay] = useState('AeroBeats Ready');
  const [drumVolume, setDrumVolume] = useState(0.5);
  const [drumPower, setDrumPower] = useState(true);
  const [soundBank, setSoundBank] = useState(0); // 0 = Heater Kit, 1 = Smooth Piano Kit

  // Markdown Previewer State
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  // Random Quote State
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // JavaScript Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFormula, setCalcFormula] = useState('');
  const [calcEvaluated, setCalcEvaluated] = useState(false);

  // Helper function to evaluate math formula expression safely and with high precision
  const evaluateFormula = (expr) => {
    try {
      let sanitized = expr.replace(/x/g, '*');
      const result = Function('"use strict"; return (' + sanitized + ')')();
      if (result === undefined || isNaN(result)) {
        return 'Error';
      }
      // Round to 12 decimal places and parse to Number to strip trailing zeros
      return Number(result.toFixed(12)).toString();
    } catch (e) {
      return 'Error';
    }
  };

  const handleCalcClear = () => {
    flushSync(() => {
      setCalcDisplay('0');
      setCalcFormula('');
      setCalcEvaluated(false);
    });
  };

  const handleCalcNumber = (num) => {
    flushSync(() => {
      if (calcEvaluated) {
        setCalcDisplay(num);
        setCalcFormula(num === '0' ? '' : num);
        setCalcEvaluated(false);
        return;
      }

      if (num === '0' && calcDisplay === '0') {
        return;
      }

      if (calcDisplay === '0') {
        setCalcDisplay(num);
        setCalcFormula(calcFormula === '0' ? num : calcFormula + num);
      } else {
        const isOperator = ['+', '-', '*', '/'].includes(calcDisplay);
        if (isOperator) {
          setCalcDisplay(num);
        } else {
          setCalcDisplay(calcDisplay + num);
        }
        setCalcFormula(calcFormula + num);
      }
    });
  };

  const handleCalcDecimal = () => {
    flushSync(() => {
      if (calcEvaluated) {
        setCalcDisplay('0.');
        setCalcFormula('0.');
        setCalcEvaluated(false);
        return;
      }

      const isLastOperator = ['+', '-', '*', '/'].includes(calcFormula.slice(-1)) || calcFormula === '';
      if (isLastOperator) {
        setCalcDisplay('0.');
        setCalcFormula(calcFormula + '0.');
        return;
      }

      if (!calcDisplay.includes('.')) {
        setCalcDisplay(calcDisplay + '.');
        setCalcFormula(calcFormula + '.');
      }
    });
  };

  const handleCalcOperator = (op) => {
    flushSync(() => {
      let currentFormula = calcFormula;

      if (calcEvaluated) {
        currentFormula = calcDisplay;
        setCalcEvaluated(false);
      }

      if (currentFormula === '') {
        if (op === '-') {
          setCalcDisplay('-');
          setCalcFormula('-');
        }
        return;
      }

      const lastChar = currentFormula.slice(-1);
      const isLastOperator = ['+', '-', '*', '/'].includes(lastChar);

      if (isLastOperator) {
        const lastTwoChars = currentFormula.slice(-2);
        const secondToLastChar = lastTwoChars.charAt(0);
        const isSecondToLastOperator = ['+', '-', '*', '/'].includes(secondToLastChar);

        if (op === '-') {
          if (lastChar !== '-') {
            setCalcDisplay('-');
            setCalcFormula(currentFormula + '-');
          }
        } else {
          if (isSecondToLastOperator) {
            setCalcDisplay(op);
            setCalcFormula(currentFormula.slice(0, -2) + op);
          } else {
            setCalcDisplay(op);
            setCalcFormula(currentFormula.slice(0, -1) + op);
          }
        }
      } else {
        setCalcDisplay(op);
        setCalcFormula(currentFormula + op);
      }
    });
  };

  const handleCalcEvaluate = () => {
    flushSync(() => {
      if (calcEvaluated || calcFormula === '') return;

      let cleanFormula = calcFormula;
      while (['+', '-', '*', '/'].includes(cleanFormula.slice(-1))) {
        cleanFormula = cleanFormula.slice(0, -1);
      }

      if (cleanFormula === '') {
        setCalcDisplay('0');
        setCalcFormula('');
        return;
      }

      const result = evaluateFormula(cleanFormula);
      setCalcDisplay(result);
      setCalcFormula(cleanFormula + '=' + result);
      setCalcEvaluated(true);
    });
  };

  // Initialize random quote and theme on mount
  useEffect(() => {
    const randomQuote = Math.floor(Math.random() * QUOTES_DATA.length);
    const randomTheme = Math.floor(Math.random() * THEMES.length);
    setCurrentQuoteIndex(randomQuote);
    setCurrentThemeIndex(randomTheme);
  }, []);

  // Keyboard Event Hook for Drum Machine pads
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'drum' || !drumPower) return;
      const key = (e.key || '').toUpperCase();
      const code = e.keyCode;
      const pad = DRUM_PADS.find(p => p.keyChar === key || p.keyCode === code);
      if (pad) {
        const clipId = soundBank === 0 ? pad.idHeater : pad.idPiano;
        playPadAudio(pad.keyChar, clipId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, drumPower, drumVolume, soundBank]);

  // Audio Play Core Trigger
  const playPadAudio = (keyChar, clipId) => {
    if (!drumPower) return;
    const audio = document.getElementById(keyChar);
    if (audio) {
      audio.currentTime = 0;
      audio.volume = drumVolume;
      
      // Execute play promise
      audio.play().catch(err => console.log("Audio block prevented:", err));
      
      // Simulate active tactile button glow
      const padButton = document.getElementById(clipId);
      if (padButton) {
        padButton.classList.add('active-synth-pad');
        setTimeout(() => padButton.classList.remove('active-synth-pad'), 120);
      }

      // Synchronous display state updates to satisfy React 19 test pipelines
      flushSync(() => {
        setDrumDisplay(clipId.replace(/-/g, ' '));
      });
    }
  };

  // Toggle power status
  const handlePowerToggle = () => {
    const nextPower = !drumPower;
    setDrumPower(nextPower);
    flushSync(() => {
      setDrumDisplay(nextPower ? 'AeroBeats Ready' : 'POWER OFF');
    });
  };

  // Switch sound bank
  const handleSoundBankToggle = () => {
    if (!drumPower) return;
    const nextBank = soundBank === 0 ? 1 : 0;
    setSoundBank(nextBank);
    flushSync(() => {
      setDrumDisplay(nextBank === 0 ? 'Heater Kit' : 'Smooth Piano');
    });
  };

  // Volume slider adjustments
  const handleVolumeChange = (e) => {
    if (!drumPower) return;
    const val = parseFloat(e.target.value);
    setDrumVolume(val);
    flushSync(() => {
      setDrumDisplay(`Volume: ${Math.round(val * 100)}%`);
    });
  };

  // Controlled Markdown Input - wrapped in flushSync for test compatibility
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
            className={`nav-tab ${activeTab === 'calculator' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator size={16} />
            <span>Calculator</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'drum' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('drum')}
          >
            <Music size={16} />
            <span>Drum Machine</span>
          </button>
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

        {/* JAVASCRIPT CALCULATOR WORKSPACE */}
        {activeTab === 'calculator' && (
          <div className="calc-root">
            {/* Elegant Header */}
            <header className="app-header">
              <div className="sparkle-tag">
                <Sparkles className="sparkle-icon" size={14} />
                <span>AeroCalc Quantum</span>
              </div>
              <h1>AeroCalc Console</h1>
              <p className="app-subtitle">A high-precision glassmorphic mathematical workspace</p>
            </header>

            {/* Main Calculator Console */}
            <main className="calc-console">
              <div className="calc-body">
                {/* Curved Digital Screen Display */}
                <div className="calc-screen">
                  <div className="calc-formula-trace">
                    {calcFormula || '0'}
                  </div>
                  <div id="display" className="calc-main-display">
                    {calcDisplay}
                  </div>
                </div>

                {/* Grid keyboard of 17 tactical buttons */}
                <div className="calc-keypad">
                  {/* Row 1 */}
                  <button id="clear" className="calc-btn calc-btn-clear" onClick={handleCalcClear}>
                    AC
                  </button>
                  <button id="divide" className="calc-btn calc-btn-operator" onClick={() => handleCalcOperator('/')}>
                    /
                  </button>
                  <button id="multiply" className="calc-btn calc-btn-operator" onClick={() => handleCalcOperator('x')}>
                    x
                  </button>

                  {/* Row 2 */}
                  <button id="seven" className="calc-btn" onClick={() => handleCalcNumber('7')}>
                    7
                  </button>
                  <button id="eight" className="calc-btn" onClick={() => handleCalcNumber('8')}>
                    8
                  </button>
                  <button id="nine" className="calc-btn" onClick={() => handleCalcNumber('9')}>
                    9
                  </button>
                  <button id="subtract" className="calc-btn calc-btn-operator" onClick={() => handleCalcOperator('-')}>
                    -
                  </button>

                  {/* Row 3 */}
                  <button id="four" className="calc-btn" onClick={() => handleCalcNumber('4')}>
                    4
                  </button>
                  <button id="five" className="calc-btn" onClick={() => handleCalcNumber('5')}>
                    5
                  </button>
                  <button id="six" className="calc-btn" onClick={() => handleCalcNumber('6')}>
                    6
                  </button>
                  <button id="add" className="calc-btn calc-btn-operator" onClick={() => handleCalcOperator('+')}>
                    +
                  </button>

                  {/* Row 4 & 5 combined (Grid handles placing zero, decimal, equals) */}
                  <button id="one" className="calc-btn" onClick={() => handleCalcNumber('1')}>
                    1
                  </button>
                  <button id="two" className="calc-btn" onClick={() => handleCalcNumber('2')}>
                    2
                  </button>
                  <button id="three" className="calc-btn" onClick={() => handleCalcNumber('3')}>
                    3
                  </button>
                  <button id="equals" className="calc-btn calc-btn-equals" onClick={handleCalcEvaluate}>
                    =
                  </button>

                  <button id="zero" className="calc-btn calc-btn-zero" onClick={() => handleCalcNumber('0')}>
                    0
                  </button>
                  <button id="decimal" className="calc-btn" onClick={handleCalcDecimal}>
                    .
                  </button>
                </div>
              </div>
            </main>
          </div>
        )}

        {/* DRUM MACHINE WORKSPACE */}
        {activeTab === 'drum' && (
          <div className="drum-root" id="drum-machine">
            {/* Elegant Header */}
            <header className="app-header">
              <div className="sparkle-tag">
                <Sparkles className="sparkle-icon" size={14} />
                <span>Futuristic Synthesizer</span>
              </div>
              <h1>AeroBeats Drum Station</h1>
              <p className="app-subtitle">A high-fidelity tactile drum synth pad console</p>
            </header>

            {/* Synthesizer Rack Console */}
            <main className="synth-rack">
              <div className="synth-body">
                
                {/* 9 Drum Pads Matrix Grid */}
                <div className="pads-matrix">
                  {DRUM_PADS.map(pad => {
                    const clipId = soundBank === 0 ? pad.idHeater : pad.idPiano;
                    const audioSrc = soundBank === 0 ? pad.srcHeater : pad.srcPiano;
                    return (
                      <button
                        key={pad.keyChar}
                        id={clipId}
                        className="drum-pad tactile-synth-pad"
                        onClick={() => playPadAudio(pad.keyChar, clipId)}
                        disabled={!drumPower}
                      >
                        {pad.keyChar}
                        
                        {/* Mandatory HTML5 audio element */}
                        <audio
                          id={pad.keyChar}
                          className="clip"
                          src={audioSrc}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Control Panel Dials & Sliders */}
                <div className="controls-panel">
                  
                  {/* Flourescent Cathode-Ray Display Element */}
                  <div className="display-rack">
                    <span className="display-label">SYSTEM STATE</span>
                    <div id="display" className="fluor-display">
                      {drumDisplay}
                    </div>
                  </div>

                  <div className="rack-sliders-switches">
                    {/* Power Dial Switch */}
                    <div className="synth-knob-container">
                      <span className="knob-label">SYSTEM POWER</span>
                      <button 
                        onClick={handlePowerToggle} 
                        className={`power-switch-btn ${drumPower ? 'power-on' : 'power-off'}`}
                      >
                        <Power size={18} />
                        <span>{drumPower ? 'ON' : 'OFF'}</span>
                      </button>
                    </div>

                    {/* Volume Slider Knob */}
                    <div className="synth-slider-container">
                      <div className="slider-labels">
                        <Sliders size={14} className="text-slate-400" />
                        <span className="knob-label">VOLUME DIAL</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={drumVolume}
                        onChange={handleVolumeChange}
                        disabled={!drumPower}
                        className="synth-volume-slider"
                      />
                    </div>

                    {/* Bank Switch Control */}
                    <div className="synth-knob-container">
                      <span className="knob-label">SOUND BANK</span>
                      <button 
                        onClick={handleSoundBankToggle}
                        disabled={!drumPower}
                        className={`bank-switch-btn ${soundBank === 1 ? 'bank-smooth' : 'bank-heater'}`}
                      >
                        <ToggleLeft size={18} className={`bank-switch-icon ${soundBank === 1 ? 'rotated' : ''}`} />
                        <span>{soundBank === 0 ? 'HEATER KIT' : 'AMBIENT PIANO'}</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </main>
          </div>
        )}

        {/* MARKDOWN PREVIEWER WORKSPACE */}
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

        {/* RANDOM QUOTE WORKSPACE */}
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
