'use client';

import { useState, useEffect } from 'react';

interface QuestionEntry {
  id: string;
  display_id?: string;
  text: string;
  [key: string]: unknown;
}

interface ArchetypeEntry {
  id: string;
  english_name: string;
  thai_name: string;
  short_name: string;
  tagline: string;
  hero_line: string;
  summary: string;
  strengths?: string[];
  blind_spots?: string[];
  [key: string]: unknown;
}

interface AdminContent {
  questions: { questions: QuestionEntry[]; [key: string]: unknown };
  archetypes: { archetypes: ArchetypeEntry[]; [key: string]: unknown };
}

export default function AdminPage() {
  const [data, setData] = useState<AdminContent | null>(null);
  const [activeTab, setActiveTab] = useState<'questions' | 'archetypes'>('questions');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: 'Failed to load content.', type: 'error' });
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ text: 'Changes saved locally!', type: 'success' });
      } else {
        setMessage({ text: result.error || 'Failed to save.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Network error saving content.', type: 'error' });
    }
    setSaving(false);
  };

  const handleDeploy = async () => {
    setDeploying(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/deploy', { method: 'POST' });
      const result = await res.json();
      if (res.ok && result.success) {
        setMessage({ text: 'Changes committed and pushed to GitHub!', type: 'success' });
      } else {
        setMessage({ text: result.message || result.error || 'Failed to deploy.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Network error during deployment.', type: 'error' });
    }
    setDeploying(false);
  };

  const handleQuestionChange = (index: number, field: string, value: unknown) => {
    if (!data) return;
    const newData = { ...data };
    newData.questions.questions[index][field] = value;
    setData(newData);
  };

  const handleArchetypeChange = (index: number, field: string, value: unknown) => {
    if (!data) return;
    const newData = { ...data };
    newData.archetypes.archetypes[index][field] = value;
    setData(newData);
  };

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-light)' }}>Loading admin panel...</div>;
  if (!data) return <div style={{ padding: '2rem', color: 'var(--text-light)' }}>Failed to load data.</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-sans)', color: 'var(--text-dark)', backgroundColor: 'var(--bg-panel)' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-light)', padding: '2rem 1rem', borderRight: '4px solid var(--accent-black)' }}>
        <h2 style={{ color: 'var(--accent-yellow)', marginBottom: '2rem', fontSize: '1.5rem' }}>Admin Panel</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            className={`p5-button ${activeTab === 'questions' ? 'inverted' : ''}`}
            onClick={() => setActiveTab('questions')}
            style={{ fontSize: '1rem', padding: '0.5rem' }}
          >
            Questions
          </button>
          <button 
            className={`p5-button ${activeTab === 'archetypes' ? 'inverted' : ''}`}
            onClick={() => setActiveTab('archetypes')}
            style={{ fontSize: '1rem', padding: '0.5rem' }}
          >
            Archetypes
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            className="p5-button"
            style={{ background: 'var(--accent-green)', fontSize: '1rem', padding: '0.5rem' }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save to File'}
          </button>
          <button 
            className="p5-button"
            style={{ background: 'var(--accent-red)', color: 'white', fontSize: '1rem', padding: '0.5rem' }}
            onClick={handleDeploy}
            disabled={deploying}
          >
            {deploying ? 'Deploying...' : 'Commit & Push'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', maxHeight: '100vh' }}>
        {message && (
          <div style={{ 
            padding: '1rem', 
            marginBottom: '2rem', 
            background: message.type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)',
            color: message.type === 'success' ? 'black' : 'white',
            fontWeight: 'bold',
            border: '4px solid var(--accent-black)',
            boxShadow: '4px 4px 0 var(--accent-black)'
          }}>
            {message.text}
          </div>
        )}

        <h1 style={{ color: 'var(--accent-black)', marginBottom: '2rem' }}>
          Editing {activeTab === 'questions' ? 'Questions' : 'Archetypes'}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {activeTab === 'questions' && data.questions.questions.map((q: QuestionEntry, index: number) => (
            <div key={q.id} style={{ border: '3px solid var(--accent-black)', padding: '1.5rem', background: 'white', boxShadow: '5px 5px 0 var(--accent-cyan)' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>{q.display_id}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 'bold' }}>Question Text (TH)</label>
                <textarea 
                  style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit', resize: 'vertical' }}
                  value={q.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}

          {activeTab === 'archetypes' && data.archetypes.archetypes.map((a: ArchetypeEntry, index: number) => (
            <div key={a.id} style={{ border: '3px solid var(--accent-black)', padding: '1.5rem', background: 'white', boxShadow: '5px 5px 0 var(--accent-yellow)' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>{a.english_name} / {a.thai_name}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>English Name</label>
                    <input 
                      style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit' }}
                      value={a.english_name}
                      onChange={(e) => handleArchetypeChange(index, 'english_name', e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Thai Name</label>
                    <input 
                      style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit' }}
                      value={a.thai_name}
                      onChange={(e) => handleArchetypeChange(index, 'thai_name', e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Short Name</label>
                    <input 
                      style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit' }}
                      value={a.short_name}
                      onChange={(e) => handleArchetypeChange(index, 'short_name', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Tagline</label>
                  <input 
                    style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit' }}
                    value={a.tagline}
                    onChange={(e) => handleArchetypeChange(index, 'tagline', e.target.value)}
                  />
                </div>
                
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Hero Line</label>
                  <textarea 
                    style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit', resize: 'vertical' }}
                    value={a.hero_line}
                    onChange={(e) => handleArchetypeChange(index, 'hero_line', e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Summary</label>
                  <textarea 
                    style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit', resize: 'vertical' }}
                    value={a.summary}
                    onChange={(e) => handleArchetypeChange(index, 'summary', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Strengths (1 per line)</label>
                  <textarea 
                    style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit', resize: 'vertical' }}
                    value={(a.strengths || []).join('\n')}
                    onChange={(e) => handleArchetypeChange(index, 'strengths', e.target.value.split('\n'))}
                    rows={4}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Blind Spots (1 per line)</label>
                  <textarea 
                    style={{ width: '100%', padding: '0.5rem', border: '2px solid black', fontFamily: 'inherit', resize: 'vertical' }}
                    value={(a.blind_spots || []).join('\n')}
                    onChange={(e) => handleArchetypeChange(index, 'blind_spots', e.target.value.split('\n'))}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
