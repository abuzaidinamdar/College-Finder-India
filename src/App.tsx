import { useState } from 'react';
import LocationSelector from './components/LocationSelector';
import CollegeResults from './components/CollegeResults';
import { geminiService } from './services/geminiService';
import './App.css';

export interface College {
  name: string;
  address: string;
  contactDetails: {
    phone?: string;
    email?: string;
    website?: string;
  };
  coursesAvailable: string[];
  fees: {
    course: string;
    amount: string;
  }[];
  type: 'IT' | 'Management' | 'Both';
}

function App() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [displayCount, setDisplayCount] = useState(6);

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError('');
    setSearchLocation(location);
    setColleges([]);
    setDisplayCount(6);
    
    try {
      console.log('Searching for colleges in:', location);
      const response = await geminiService.searchColleges(location);
      
      if (response && response.length > 0) {
        setColleges(response);
        console.log('Successfully loaded', response.length, 'colleges');
      } else {
        setError(`No colleges found in ${location}. Please try a different location or check the spelling.`);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to fetch college data. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className="app">
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <div className="animated-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="background-3d">
        <div className="cube-container cube-1">
          <div className="cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face left"></div>
            <div className="cube-face right"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>
        <div className="cube-container cube-2">
          <div className="cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face left"></div>
            <div className="cube-face right"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>
        <div className="cube-container cube-3">
          <div className="cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face left"></div>
            <div className="cube-face right"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>
        <div className="sphere-container sphere-1"></div>
        <div className="sphere-container sphere-2"></div>
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      <div className="geometric-shapes">
        <div className="triangle triangle-1"></div>
        <div className="triangle triangle-2"></div>
        <div className="diamond diamond-1"></div>
        <div className="diamond diamond-2"></div>
      </div>

      <div className="particles-3d">
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
      </div>

      <div className="floating-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>

      <div className="hexagon-container">
        <div className="hexagon hexagon-1"></div>
        <div className="hexagon hexagon-2"></div>
        <div className="hexagon hexagon-3"></div>
      </div>

      <div className="spiral-particles">
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
        <div className="spiral-particle"></div>
      </div>

      <div className="morphing-blobs">
        <div className="morphing-blob blob-1"></div>
        <div className="morphing-blob blob-2"></div>
        <div className="morphing-blob blob-3"></div>
      </div>

      <div className="depth-layers">
        <div className="depth-layer" style={{'--depth': '-100px'} as React.CSSProperties}></div>
        <div className="depth-layer" style={{'--depth': '-200px'} as React.CSSProperties}></div>
        <div className="depth-layer" style={{'--depth': '-300px'} as React.CSSProperties}></div>
      </div>

      <div className="energy-field"></div>
      <div className="holographic-grid"></div>

      <div className="floating-polyhedrons">
        <div className="polyhedron polyhedron-1">
          <div className="polyhedron-face face-1"></div>
          <div className="polyhedron-face face-2"></div>
          <div className="polyhedron-face face-3"></div>
          <div className="polyhedron-face face-4"></div>
          <div className="polyhedron-face face-5"></div>
        </div>
        <div className="polyhedron polyhedron-2">
          <div className="polyhedron-face face-1"></div>
          <div className="polyhedron-face face-2"></div>
          <div className="polyhedron-face face-3"></div>
          <div className="polyhedron-face face-4"></div>
          <div className="polyhedron-face face-5"></div>
        </div>
      </div>

      <div className="quantum-dots">
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
        <div className="quantum-dot"></div>
      </div>

      <div className="neural-network">
        <div className="neural-node node-1"></div>
        <div className="neural-node node-2"></div>
        <div className="neural-node node-3"></div>
        <div className="neural-node node-4"></div>
        <div className="neural-node node-5"></div>
        <div className="neural-node node-6"></div>
        <div className="neural-node node-7"></div>
        <div className="neural-node node-8"></div>
        <div className="neural-connection connection-1"></div>
        <div className="neural-connection connection-2"></div>
        <div className="neural-connection connection-3"></div>
        <div className="neural-connection connection-4"></div>
        <div className="neural-connection connection-5"></div>
      </div>

      <div className="floating-crystals">
        <div className="crystal crystal-1"></div>
        <div className="crystal crystal-2"></div>
        <div className="crystal crystal-3"></div>
      </div>

      <div className="data-streams">
        <div className="data-stream stream-1"></div>
        <div className="data-stream stream-2"></div>
        <div className="data-stream stream-3"></div>
        <div className="data-stream stream-4"></div>
        <div className="data-stream stream-5"></div>
        <div className="data-stream stream-6"></div>
        <div className="data-stream stream-7"></div>
        <div className="data-stream stream-8"></div>
        <div className="data-stream stream-9"></div>
        <div className="data-stream stream-10"></div>
      </div>
      
      <header className="app-header">
        <h1> College Finder India</h1>
        <p>Find IT & Management Colleges across India</p>
      </header>
      
      <main className="app-main">
        <LocationSelector onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {colleges.length > 0 && (
          <CollegeResults 
            colleges={colleges.slice(0, displayCount)} 
            searchLocation={searchLocation}
            totalCount={colleges.length}
            displayCount={displayCount}
            onLoadMore={handleLoadMore}
          />
        )}
      </main>
    </div>
  );
}

export default App;
