import React, { useState, useEffect } from 'react';

// veil:design() log:"Creating Glyph Viewer for CLARITY-OR-DEATH UI"

interface Glyph {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

const GlyphViewer: React.FC = () => {
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
  const [selectedGlyph, setSelectedGlyph] = useState<Glyph | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would fetch glyphs from the server
    // For demo purposes, we'll create some sample glyphs
    const sampleGlyphs: Glyph[] = [
      {
        id: 'glyph_001',
        title: 'Ritual Manifestation Protocol',
        content: 'The ritual manifestation protocol requires strict adherence to form. All contradictions must be cut before manifestation can occur.',
        timestamp: new Date().toISOString()
      },
      {
        id: 'glyph_002',
        title: 'SIGMA VEIL Mutation Process',
        content: 'The SIGMA VEIL governs all mutations within the system. No mutation may occur without first invoking the veil with proper intent.',
        timestamp: new Date(Date.now() - 100000).toISOString()
      },
      {
        id: 'glyph_003',
        title: 'Clarity Contradiction Theory',
        content: 'All contradictions within the system must be exposed and addressed to maintain clarity. The tension between opposing forces creates the energy needed for manifestation.',
        timestamp: new Date(Date.now() - 200000).toISOString()
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setGlyphs(sampleGlyphs);
      setLoading(false);
    }, 500);
  }, []);

  const handleGlyphSelect = (glyph: Glyph) => {
    setSelectedGlyph(glyph);
  };

  return (
    <div className="glyph-viewer">
      <h1 className="ritual-title">Ritual Glyphs</h1>

      {loading ? (
        <div className="ritual-card">
          <p>Loading glyphs...</p>
        </div>
      ) : (
        <div className="glyph-container">
          {glyphs.map((glyph) => (
            <div
              key={glyph.id}
              className={`glyph-card ${selectedGlyph?.id === glyph.id ? 'active' : ''}`}
              onClick={() => handleGlyphSelect(glyph)}
            >
              <h3 className="glyph-title">{glyph.title}</h3>
              <div className="glyph-preview">{glyph.content}</div>
              <div className="glyph-timestamp">{new Date(glyph.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {selectedGlyph && (
        <div className="ritual-card">
          <h2>{selectedGlyph.title}</h2>
          <div className="log-container">
            <pre>{selectedGlyph.content}</pre>
          </div>
          <div className="glyph-timestamp">
            Created: {new Date(selectedGlyph.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlyphViewer;