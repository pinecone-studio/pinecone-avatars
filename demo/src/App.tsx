import { useState, useEffect } from 'react'
import {
  Avatar,
  AvatarPicker,
  AvatarConfig,
  generateRandomConfig,
  generateSvg,
  generateBase64,
  downloadSvg,
  downloadPng,
} from 'pinecone-avatars'
import './App.css'

function App() {
  const [config, setConfig] = useState<AvatarConfig>(generateRandomConfig())
  const [randomAvatars, setRandomAvatars] = useState<AvatarConfig[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    regenerateRandom()
  }, [])

  const regenerateRandom = () => {
    setRandomAvatars(Array.from({ length: 12 }, () => generateRandomConfig()))
  }

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const handleDownloadSvg = () => {
    downloadSvg(config, 'pinecone-avatar.svg')
    showToast('SVG downloaded!')
  }

  const handleDownloadPng = async () => {
    await downloadPng(config, 512, 'pinecone-avatar.png')
    showToast('PNG downloaded!')
  }

  const handleCopy = async (type: 'svg' | 'base64' | 'config') => {
    let content = ''
    if (type === 'svg') content = generateSvg(config)
    else if (type === 'base64') content = generateBase64(config)
    else content = JSON.stringify(config, null, 2)

    await navigator.clipboard.writeText(content)
    setCopied(type)
    showToast(`${type.toUpperCase()} copied!`)
    setTimeout(() => setCopied(null), 1500)
  }

  const selectRandomAvatar = (avatarConfig: AvatarConfig) => {
    setConfig(avatarConfig)
    showToast('Avatar selected!')
  }

  return (
    <div className="app">
      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <Avatar {...config} size={180} />
          </div>
          <h1 className="hero-title">Pinecone Avatars</h1>
          <p className="hero-subtitle">
            Beautiful, customizable SVG avatars for your React apps
          </p>
          <div className="hero-badges">
            <a href="https://www.npmjs.com/package/pinecone-avatars" className="badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
              </svg>
              npm
            </a>
            <a href="https://github.com/temuulennibno/pinecone-avatars" className="badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Customizer Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Customize Your Avatar</h2>
            <p className="section-desc">Mix and match to create your perfect avatar</p>
          </div>
          <div className="customizer-card">
            <AvatarPicker value={config} onChange={setConfig} />
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Random Gallery</h2>
            <p className="section-desc">Click any avatar to select it</p>
          </div>
          <div className="gallery-grid">
            {randomAvatars.map((avatarConfig, i) => (
              <button
                key={i}
                className="gallery-item"
                onClick={() => selectRandomAvatar(avatarConfig)}
              >
                <Avatar {...avatarConfig} size={80} />
              </button>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={regenerateRandom}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Regenerate
          </button>
        </section>

        {/* Export Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Export & Use</h2>
            <p className="section-desc">Download or copy your avatar</p>
          </div>

          <div className="export-card">
            <div className="export-preview">
              <Avatar {...config} size={160} />
            </div>

            <div className="export-actions">
              <div className="action-group">
                <span className="action-label">Download</span>
                <div className="action-buttons">
                  <button className="btn btn-primary" onClick={handleDownloadSvg}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    SVG
                  </button>
                  <button className="btn btn-primary" onClick={handleDownloadPng}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    PNG
                  </button>
                </div>
              </div>

              <div className="action-group">
                <span className="action-label">Copy to clipboard</span>
                <div className="action-buttons">
                  <button
                    className={`btn btn-outline ${copied === 'svg' ? 'copied' : ''}`}
                    onClick={() => handleCopy('svg')}
                  >
                    {copied === 'svg' ? 'Copied!' : 'SVG Code'}
                  </button>
                  <button
                    className={`btn btn-outline ${copied === 'base64' ? 'copied' : ''}`}
                    onClick={() => handleCopy('base64')}
                  >
                    {copied === 'base64' ? 'Copied!' : 'Base64'}
                  </button>
                  <button
                    className={`btn btn-outline ${copied === 'config' ? 'copied' : ''}`}
                    onClick={() => handleCopy('config')}
                  >
                    {copied === 'config' ? 'Copied!' : 'Config'}
                  </button>
                </div>
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span>React Usage</span>
                <button
                  className="code-copy"
                  onClick={() => {
                    const code = `<Avatar
  background="${config.background}"
  skin="${config.skin}"
  tshirt="${config.tshirt}"
  expression="${config.expression}"
  hair="${config.hair}"
  size={200}
/>`
                    navigator.clipboard.writeText(code)
                    showToast('Code copied!')
                  }}
                >
                  Copy
                </button>
              </div>
              <pre className="code-content">
{`import { Avatar } from 'pinecone-avatars';

<Avatar
  background="${config.background}"
  skin="${config.skin}"
  tshirt="${config.tshirt}"
  expression="${config.expression}"
  hair="${config.hair}"
  size={200}
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section className="section install-section">
          <div className="section-header">
            <h2 className="section-title">Get Started</h2>
            <p className="section-desc">Install with your favorite package manager</p>
          </div>

          <div className="install-options">
            <div className="install-option">
              <code>npm install pinecone-avatars</code>
            </div>
            <div className="install-option">
              <code>yarn add pinecone-avatars</code>
            </div>
            <div className="install-option">
              <code>pnpm add pinecone-avatars</code>
            </div>
            <div className="install-option">
              <code>bun add pinecone-avatars</code>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with React & TypeScript
          <span className="footer-sep">•</span>
          <a href="https://github.com/temuulennibno/pinecone-avatars">View on GitHub</a>
          <span className="footer-sep">•</span>
          <a href="https://www.npmjs.com/package/pinecone-avatars">npm Package</a>
        </p>
      </footer>
    </div>
  )
}

export default App
