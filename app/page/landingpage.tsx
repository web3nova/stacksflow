'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Zap, Shield, Code, Menu, X, Rocket, TrendingUp,
  Users, Globe, CheckCircle, Play, Sparkles, Bot, Cpu, Brain,
} from 'lucide-react';

const DOCS_URL = 'https://web3nova-bb969d43.mintlify.app/api-reference';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --background: #0A0805;
    --foreground: #e6a21a;
    --font-sans: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0A0805;
      --foreground: #F0E8D8;
    }
  }

  html {
    color-scheme: dark;
  }

  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --gold: #BF5FFF;
    --gold-light: #CC80FF;
    --gold-dim: #5A1A8A;
    --bg: #060509;
    --surface: #08050d;
    --surface2: #0d0a12;
    --border: rgba(201,168,76,0.15);
    --border-bright: rgba(201,168,76,0.4);
    --text: #F0E8D8;
    --muted: #4a3060;
    --orange: #9933CC;
  }

  html, body {
    background: #050a0d !important;
    color: #F0E8D8;
  }

  .sf-root {
    background: #0A0805;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NOISE TEXTURE OVERLAY */
  .sf-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1000;
    opacity: 0.35;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 2rem;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(180deg, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.7) 100%);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
  }

  .nav.scrolled {
    background: rgba(10,8,5,0.98);
    border-bottom-color: var(--border-bright);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--gold-light);
  }

  .logo-mark {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--orange) 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    color: #0A0805;
    font-family: 'Syne', sans-serif;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .nav-link {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .nav-link:hover { color: var(--gold-light); }

  .nav-cta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: transparent;
    border: 1px solid var(--border-bright);
    color: var(--gold-light);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .nav-cta:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: #0A0805;
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 8rem 2rem 4rem;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
  }

  .hero-glow {
    position: absolute;
    top: 20%;
    right: -10%;
    width: 700px;
    height: 700px;
    background: radial-gradient(ellipse, rgba(232,98,42,0.08) 0%, transparent 60%);
    border-radius: 50%;
  }

  .hero-glow-2 {
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 60%);
    border-radius: 50%;
  }

  .hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--border);
    border-radius: 2px;
    background: rgba(201,168,76,0.05);
  }

  .hero-eyebrow-dot {
    width: 5px; height: 5px;
    background: var(--gold);
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  .hero-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: 1.5rem;
  }

  .hero-h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--muted);
    margin-bottom: 2.5rem;
    max-width: 480px;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, var(--gold) 0%, var(--orange) 100%);
    color: #0A0805;
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.02em;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(232,98,42,0.35);
    filter: brightness(1.1);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background: transparent;
    color: var(--text);
    font-weight: 400;
    font-size: 0.875rem;
    letter-spacing: 0.02em;
    border-radius: 4px;
    text-decoration: none;
    border: 1px solid rgba(240,232,216,0.15);
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-secondary:hover {
    border-color: rgba(240,232,216,0.4);
    color: var(--text);
    background: rgba(240,232,216,0.05);
  }

  .hero-trust {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.02em;
  }

  .trust-item svg {
    color: #4CAF50;
    flex-shrink: 0;
  }

  /* HERO VISUAL */
  .hero-visual {
    position: relative;
  }

  .orb-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    max-width: 480px;
    margin: 0 auto;
  }

  .orb-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: spin-slow linear infinite;
  }

  .orb-ring:nth-child(1) {
    width: 90%; height: 90%;
    border-color: rgba(201,168,76,0.12);
    animation-duration: 30s;
  }

  .orb-ring:nth-child(2) {
    width: 70%; height: 70%;
    border-color: rgba(201,168,76,0.18);
    animation-duration: 20s;
    animation-direction: reverse;
    border-style: dashed;
  }

  .orb-ring:nth-child(3) {
    width: 50%; height: 50%;
    border-color: rgba(232,98,42,0.2);
    animation-duration: 15s;
  }

  @keyframes spin-slow {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .orb-core {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gold) 0%, var(--orange) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 800;
    color: #0A0805;
    box-shadow:
      0 0 60px rgba(201,168,76,0.3),
      0 0 120px rgba(232,98,42,0.15);
    animation: core-pulse 4s ease-in-out infinite;
  }

  @keyframes core-pulse {
    0%, 100% { box-shadow: 0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(232,98,42,0.15); }
    50% { box-shadow: 0 0 80px rgba(201,168,76,0.5), 0 0 160px rgba(232,98,42,0.25); }
  }

  .orb-dot {
    position: absolute;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--gold);
  }

  .stat-float {
    position: absolute;
    background: rgba(17,14,8,0.95);
    border: 1px solid var(--border-bright);
    border-radius: 8px;
    padding: 0.75rem 1.25rem;
    backdrop-filter: blur(20px);
  }

  .stat-float-label {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.2rem;
  }

  .stat-float-value {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--gold-light);
  }

  .stat-float:nth-child(6) {
    top: 10%; right: 0;
    animation: float-1 6s ease-in-out infinite;
  }

  .stat-float:nth-child(7) {
    bottom: 15%; left: 0;
    animation: float-2 6s ease-in-out infinite 1s;
  }

  @keyframes float-1 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @keyframes float-2 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }

  /* DIVIDER */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-bright), transparent);
    max-width: 1200px;
    margin: 0 auto;
  }

  /* STATS BAR */
  .stats-bar {
    padding: 4rem 2rem;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .stats-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .stat-item {
    text-align: center;
    position: relative;
  }

  .stat-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0; top: 10%; bottom: 10%;
    width: 1px;
    background: var(--border);
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800;
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    display: block;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* SECTIONS */
  .section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 2px;
  }

  .section-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: 1rem;
  }

  .section-h2 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-sub {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 3rem;
  }

  /* AI SECTION - full bleed */
  .ai-section {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 6rem 2rem;
  }

  .ai-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .ai-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: end;
    margin-bottom: 4rem;
  }

  .ai-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .ai-card {
    background: var(--surface2);
    padding: 2.5rem;
    position: relative;
    transition: background 0.3s;
  }

  .ai-card:hover { background: rgba(201,168,76,0.04); }

  .ai-card-icon {
    width: 48px; height: 48px;
    border: 1px solid var(--border-bright);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: var(--gold);
  }

  .ai-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .ai-card p {
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--muted);
  }

  .ai-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(201,168,76,0.08);
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 0.75rem;
    color: var(--gold);
    letter-spacing: 0.05em;
  }

  /* FEATURES */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2.5rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-card:hover {
    border-color: var(--border-bright);
    transform: translateY(-2px);
  }

  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    width: 44px; height: 44px;
    background: rgba(201,168,76,0.1);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    margin-bottom: 1.5rem;
  }

  .feature-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .feature-card p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .feature-list {
    list-style: none;
  }

  .feature-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: rgba(240,232,216,0.5);
    margin-bottom: 0.4rem;
    line-height: 1.4;
  }

  .feature-list li svg { color: #4CAF50; flex-shrink: 0; margin-top: 1px; }

  /* CODE SECTION */
  .code-section {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 6rem 2rem;
  }

  .code-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .code-block {
    background: #0D0B07;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border);
    background: rgba(201,168,76,0.04);
  }

  .code-dots {
    display: flex;
    gap: 0.4rem;
  }

  .code-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }

  .code-filename {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .code-body {
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    line-height: 1.7;
    color: #8FA3B1;
    overflow-x: auto;
  }

  .code-import { color: #C792EA; }
  .code-from { color: #C792EA; }
  .code-string { color: #C3E88D; }
  .code-key { color: #82AAFF; }
  .code-method { color: #82AAFF; }
  .code-const { color: #C792EA; }
  .code-comment { color: #546E7A; font-style: italic; }

  /* USE CASES */
  .use-cases-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .use-case-card {
    padding: 2.5rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    transition: all 0.3s;
  }

  .use-case-card:hover {
    border-color: var(--border-bright);
    background: rgba(201,168,76,0.03);
  }

  .use-case-icon {
    width: 48px; height: 48px;
    flex-shrink: 0;
    background: rgba(201,168,76,0.08);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
  }

  .use-case-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  .use-case-card p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.6;
  }

  /* CTA */
  .cta-section {
    padding: 8rem 2rem;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .cta-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .cta-inner {
    position: relative;
    z-index: 1;
    max-width: 700px;
    margin: 0 auto;
  }

  .cta-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.04em;
    color: var(--text);
    margin-bottom: 1.5rem;
  }

  .cta-h2 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cta-sub {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* FOOTER */
  .footer {
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 4rem 2rem 2rem;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-brand p {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.6;
    margin-top: 1rem;
    max-width: 240px;
  }

  .footer-col h4 {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text);
    font-weight: 500;
    margin-bottom: 1.25rem;
  }

  .footer-col ul {
    list-style: none;
  }

  .footer-col li {
    margin-bottom: 0.6rem;
  }

  .footer-col a {
    font-size: 0.82rem;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-col a:hover { color: var(--gold-light); }

  .footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-bottom span {
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.02em;
  }

  .status-dot {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .status-dot::before {
    content: '';
    width: 6px; height: 6px;
    background: #4CAF50;
    border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* MOBILE */
  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    padding: 0.25rem;
  }

  .mobile-menu {
    display: none;
  }

  @media (max-width: 1024px) {
    .nav-links { display: none; }
    .mobile-toggle { display: flex; }
    .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
    .hero-visual { display: none; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .stat-item:nth-child(2)::after, .stat-item:nth-child(4)::after { display: none; }
    .ai-header { grid-template-columns: 1fr; gap: 2rem; }
    .ai-cards { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .code-inner { grid-template-columns: 1fr; gap: 3rem; }
    .use-cases-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 640px) {
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .hero-h1 { font-size: 2.5rem; }
    .hero { padding: 6rem 1.25rem 3rem; }
    .section { padding: 4rem 1.25rem; }
    .ai-section, .code-section { padding: 4rem 1.25rem; }
    .footer-grid { grid-template-columns: 1fr; }
  }

  /* MOBILE MENU OPEN */
  .mobile-menu.open {
    display: block;
    position: fixed;
    inset: 72px 0 0 0;
    background: rgba(10,8,5,0.98);
    z-index: 99;
    padding: 2rem;
    border-top: 1px solid var(--border);
  }

  .mobile-menu a {
    display: block;
    padding: 1rem 0;
    color: var(--text);
    text-decoration: none;
    font-size: 1.2rem;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }

  .mobile-menu a:hover { color: var(--gold-light); }
`;

export default function StacksLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sf-root">
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <div className="logo-mark">S</div>
          StacksFlow
        </div>
        <div className="nav-links">
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="nav-link">Docs</a>
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="nav-link">Pricing</a>
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="nav-link">Support</a>
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Get API Key <ArrowRight size={12} />
          </a>
        </div>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">Docs</a>
        <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">Pricing</a>
        <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">Support</a>
        <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">Get API Key →</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-glow" />
          <div className="hero-glow-2" />
        </div>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-dot" />
              AI-Powered Settlement
            </div>
            <h1 className="hero-h1">
              Your bridge to the<br />
              <em>Bitcoin economy</em>
            </h1>
            <p className="hero-sub">
              Bring Circle-backed USDC to Stacks in one API call. AI agents handle routing, verification, and settlement. Zero complexity.
            </p>
            <div className="hero-actions">
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start Building Now!<ArrowRight size={16} />
              </a>
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Play size={14} /> View Docs
              </a>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><CheckCircle size={14} /> No credit card Required</div>
              <div className="trust-item"><CheckCircle size={14} /> 5-minute setup</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orb-container">
              <div className="orb-ring" />
              <div className="orb-ring" />
              <div className="orb-ring" />
              <div className="orb-core">₿</div>
              <div className="stat-float">
                <div className="stat-float-label">Live Settlements</div>
                <div className="stat-float-value">.5M</div>
              </div>
              <div className="stat-float">
                <div className="stat-float-label">Active Builders</div>
                <div className="stat-float-value">890+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { value: '850+', label: 'Active Builders' },
            { value: '.7M', label: 'Daily Volume' },
            { value: '99.8%', label: 'Uptime' },
            { value: '3.2s', label: 'Avg Settlement' },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI SECTION */}

      <div className="ai-section">
        <div className="ai-inner">
          <div className="ai-header">
            <div>
              <div className="section-tag"><Brain size={12} /> Intelligent Automation</div>
              <h2 className="section-h2">AI agents solve<br /><em>the complexity</em></h2>
            </div>
            <div>
              <p className="section-sub">Smart routing, auto verification, and error recovery — running 24/7 for 99.9% settlement success.</p>
              <div className="ai-badge"><Bot size={14} /> Trained on 10M+ cross-chain settlements</div>
            </div>
          </div>
          <div className="ai-cards">
            {[
              { Icon: Cpu, title: 'Smart Routing', desc: 'Real-time network analysis selects optimal paths. Lowest fees, fastest execution, guaranteed.' },
              { Icon: Shield, title: 'Auto Verification', desc: "Every transaction verified against Circle's xReserve. 1:1 backing guaranteed before settlement." },
              { Icon: Zap, title: 'Error Recovery', desc: 'Automatic retry with adjusted parameters. 99.9% success rate without manual intervention.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="ai-card">
                <div className="ai-card-icon"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <div className="section-tag"><Sparkles size={12} /> Built for Builders</div>
        <h2 className="section-h2">Everything you need.<br /><em>One API.</em></h2>
        <p className="section-sub">Production-ready infrastructure so you can focus on shipping, not plumbing.</p>
        <div className="features-grid">
          {[
            { Icon: Zap, title: 'AI Settlement Agents', desc: 'Intelligent routing and gas optimization, fully automated.', features: ['Auto-retry failed transactions', 'Gas optimization', 'Real-time status tracking'] },
            { Icon: Shield, title: 'Circle xReserve Trust', desc: 'Real USDC backed by Circle with cryptographic attestations.', features: ['Proof of reserves on-chain', 'No exploits possible', 'Direct Circle integration'] },
            { Icon: Code, title: 'Developer-First API', desc: 'Clean API endpoint with full TypeScript support and webhooks.', features: ['TypeScript SDK', 'Webhook notifications', '5-minute integration'] },
          ].map(({ Icon, title, desc, features }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon"><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul className="feature-list">
                {features.map(f => (
                  <li key={f}><CheckCircle size={13} /> {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CODE */}

      <div className="code-section">
        <div className="code-inner">
          <div>
            <div className="section-tag"><Code size={12} /> Developer Experience</div>
            <h2 className="section-h2">Ship in<br /><em>10 lines.</em></h2>
            <p className="section-sub">From Ethereum to Stacks in minutes. Clean SDK, clear docs, real results.</p>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View Documentation <ArrowRight size={16} />
            </a>
          </div>
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots">
                <div className="code-dot" style={{background:'#FF5F57'}} />
                <div className="code-dot" style={{background:'#FEBC2E'}} />
                <div className="code-dot" style={{background:'#28C840'}} />
              </div>
              <div className="code-filename">settlement.ts</div>
            </div>
            <pre className="code-body">{`<span class="code-import">import</span> { USDCxClient } <span class="code-from">from</span> <span class="code-string">'@stacks/usdcx'</span>;

<span class="code-const">const</span> client = <span class="code-method">new</span> <span class="code-method">USDCxClient</span>({
  <span class="code-key">apiKey</span>: process.env.<span class="code-string">USDCX_API_KEY</span>
});

<span class="code-const">const</span> settlement = <span class="code-key">await</span> client.<span class="code-method">bridge</span>({
  <span class="code-key">amount</span>: <span class="code-string">'1000.00'</span>,
  <span class="code-key">fromChain</span>: <span class="code-string">'ethereum'</span>,
  <span class="code-key">toChain</span>: <span class="code-string">'stacks'</span>,
  <span class="code-key">autoSettle</span>: <span class="code-key">true</span>
});

console.<span class="code-method">log</span>(<span class="code-string">'Settled:'</span>, settlement.txId);`}</pre>
          </div>
        </div>
      </div>

      {/* USE CASES */}

      <section className="section">
        <div className="section-tag"><Globe size={12} /> Use Cases</div>
        <h2 className="section-h2">Built for every<br /><em>use case.</em></h2>
        <p className="section-sub">From DeFi protocols to enterprise payments — StacksFlow powers them all.</p>
        <div className="use-cases-grid">
          {[
            { Icon: TrendingUp, title: 'DeFi Protocols', desc: 'Bring Ethereum liquidity to Stacks. Enable lending, borrowing, and trading with real USDC.' },
            { Icon: Globe, title: 'Payment Platforms', desc: 'Accept USDC payments, settle on Bitcoin. Perfect for cross-border transactions.' },
            { Icon: Rocket, title: 'Web3 Apps', desc: 'Build with stable USDC. Gaming, social tipping, creator monetization.' },
            { Icon: Users, title: 'Enterprise', desc: 'Treasury management and B2B settlements with enterprise compliance.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="use-case-card">
              <div className="use-case-icon"><Icon size={20} /></div>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <div className="section-tag" style={{justifyContent:'center', marginBottom:'1.5rem'}}><Sparkles size={12} /> Join the Builders</div>
          <h2 className="cta-h2">Start building<br /><em>now.</em></h2>
          <p className="cta-sub">Bitcoin economy. Circle-backed USDC. One API.<br />No credit card. No complexity. Just ship.</p>
          <div className="cta-actions">
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get API Key <ArrowRight size={16} />
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Explore Docs
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="logo-mark">S</div>
                StacksFlow
              </div>
              <p>AI-powered USDC settlement for Bitcoin Layer 2. Zero complexity, production-ready.</p>
            </div>
            {[
              { title: 'Product', links: ['API Reference', 'SDK', 'Pricing', 'Status'] },
              { title: 'Resources', links: ['Docs', 'Guides', 'Examples', 'Support'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact', 'Privacy'] },
            ].map(col => (
              <div key={col.title} className="footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map(link => (
                    <li key={link}><a href={DOCS_URL} target="_blank" rel="noopener noreferrer">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 Stacks USDCx. All rights reserved.</span>
            <span className="status-dot">All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}