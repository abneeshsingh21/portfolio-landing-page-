import type { IconName } from '../components/Icon';
import { LINKS } from './site';

export type Category = 'AI' | 'Systems' | 'Platforms' | 'Dev Tools';
export const CATEGORIES: ('All' | Category)[] = ['All', 'AI', 'Systems', 'Platforms', 'Dev Tools'];

export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  role: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  features: string[];
  tags: string[];
  categories: Category[];
  icon: IconName;
  accent: string;
  link: string;
  liveUrl?: string;
  isPrivate?: boolean;
  pipeline?: string[];
  /** owner/name — enables live GitHub stats on the card */
  repo?: string;
}

export const projects: Project[] = [
  {
    id: 'epl',
    title: 'EPL Ecosystem',
    role: 'Founder & Lead Architect',
    summary: 'A programming language that reads like plain English.',
    description:
      'An open-source programming language designed so that code reads like natural, plain English sentences. Built to make programming accessible to beginners and powerful for engineers, EPL features a multi-backend compiler and a full standard library with 4,000+ global downloads.',
    problem:
      'Programming languages enforce cryptic syntax and symbols that present a steep barrier for beginners, students, and domain experts trying to translate mental logic into runnable code.',
    solution:
      'Designed and implemented the EPL compiler pipeline (Lexer, Parser, AST) with multiple compilation targets (Interpreter, Bytecode VM, native LLVM, WebAssembly). Released an official VS Code extension with code assistance, a 22-package standard library, and an automated package registry.',
    impact: '4,000+ Global Downloads',
    features: [
      'Natural Plain-English Syntax Engine',
      'Multi-Backend Compiler (LLVM, Wasm, VM)',
      '22-Package Standard Library Ecosystem',
      'Official VS Code Extension with Diagnostics',
      'Automated Package Registry System',
      'Full Web Documentation & Active Community',
    ],
    tags: ['C++', 'Python', 'LLVM', 'WebAssembly', 'Compiler Design'],
    categories: ['Systems', 'Dev Tools'],
    icon: 'book',
    accent: '#9fd0ff',
    link: LINKS.epl,
    liveUrl: 'https://eplang.me',
    pipeline: ['Lexer', 'Parser', 'AST'],
    repo: 'abneeshsingh21/EPL',
  },
  {
    id: 'neuroshell',
    title: 'NeuroShell',
    role: 'Founder & Lead Developer',
    summary: 'An AI terminal that turns plain English into safe shell commands.',
    description:
      'An intelligent terminal shell that allows developers to execute system commands using plain English. Combines a native C++20 engine with multi-LLM routing, 2,500+ offline translation phrases, and a 4-layer Zero-Trust safety shield that blocks destructive commands.',
    problem:
      'Terminal environments require memorizing hundreds of obscure commands and flags. Typos break production workflows, and dangerous commands like rm -rf / lack intelligent guardrails, risking catastrophic data loss.',
    solution:
      'Engineered a dual-engine architecture: a native C++20 core (FastParser, FuzzyMatcher via pybind11) coupled with Python multi-LLM routing (Ollama, Claude, GPT-4o). Includes a 2,500+ phrase offline dictionary and a 4-layer Zero-Trust safety shield that catches and blocks hazardous operations before shell execution.',
    impact: '2,500+ Offline Phrases',
    features: [
      'Natural English → Shell Command Translation',
      'High-Speed C++20 Core via pybind11',
      '4-Layer Zero-Trust Safety Shield',
      'Multi-LLM Routing (Ollama / Claude / GPT)',
      '100% Offline Mode (2,500+ Dictionary)',
      'Official VS Code 1-Click Terminal Extension',
    ],
    tags: ['C++', 'Python', 'Generative AI', 'pybind11', 'Zero-Trust Shield'],
    categories: ['AI', 'Systems'],
    icon: 'terminal',
    accent: '#8ff0d6',
    link: LINKS.neuroshell,
    repo: 'abneeshsingh21/neuroshell',
  },
  {
    id: 'asworks',
    title: 'ASWorks',
    role: 'Founder & Lead Architect',
    summary: 'A live commercial marketplace for developer assets.',
    description:
      'A commercial digital marketplace and SaaS platform (asworks.studio) where software engineers and creators buy, sell, and instantly download verified developer assets, UI components, and web templates.',
    problem:
      'Digital creators and developers struggle with high marketplace commission fees, slow asset distribution, unverified listings, and complex multi-currency payment setups.',
    solution:
      'Architected and launched a full-stack digital marketplace using Next.js 15, TypeScript, and MongoDB. Integrated dual global payment gateways (Stripe and Razorpay) with automated GST invoicing, creator verification, and instantaneous secure digital file fulfillment.',
    impact: 'Live Commercial Platform',
    features: [
      'Live Commercial Marketplace at asworks.studio',
      'Dual Payment Gateways (Stripe & Razorpay)',
      'Automated Tax/GST Invoice Generation',
      'Instant Secure File Download Delivery',
      'Creator Verification & Asset Review Pipeline',
      'Modern High-Performance Next.js 15 Architecture',
    ],
    tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'Stripe', 'Razorpay'],
    categories: ['Platforms'],
    icon: 'bag',
    accent: '#c7b2ff',
    link: LINKS.asworks,
    liveUrl: LINKS.asworks,
  },
  {
    id: 'syting',
    title: 'Syting',
    role: 'Lead Systems & Database Developer',
    summary: 'Privacy-first, real-time social discovery on PostgreSQL.',
    description:
      'A real-time cross-platform mobile social discovery platform built with Flutter and Supabase PostgreSQL. Features privacy-first matchmaking, automated spam prevention, and low-latency encrypted messaging channels.',
    problem:
      'Modern social and discovery apps frequently expose user privacy prematurely, suffer from laggy messaging infrastructure, and lack robust database-level security against spoofing.',
    solution:
      'Designed and deployed the backend architecture on PostgreSQL (SQL) with Row Level Security (RLS) policies, security-definer database triggers, and real-time WebSocket channels for sub-100ms chat latency.',
    impact: 'Sub-100ms Realtime Chat',
    features: [
      'Privacy-First Mutual Discovery System',
      'PostgreSQL Backend with Row Level Security',
      'Sub-100ms Real-Time Chat via WebSockets',
      'Database Triggers for Automated Spam Defense',
      'Optimized Relational Schema & Indexes',
      'Cross-Platform iOS & Android Architecture',
    ],
    tags: ['Flutter', 'PostgreSQL', 'SQL', 'Supabase Realtime', 'System Design'],
    categories: ['Platforms', 'Systems'],
    icon: 'message',
    accent: '#ffc6a8',
    link: '#projects',
    isPrivate: true,
  },
  {
    id: 'langshift',
    title: 'LangShift',
    role: 'Creator & Developer',
    summary: 'AI transpilation across 25+ languages, inside VS Code.',
    description:
      'A published Visual Studio Code extension that transpiles code across 25+ programming languages. Features automated two-pass AI self-correction, SHA-256 caching, enterprise PII sanitization, and offline LLM execution.',
    problem:
      'Web-based code converters require cumbersome copy-pasting, fail to import necessary libraries, produce broken syntax, and leak proprietary IP to third-party web servers.',
    solution:
      'Built a native VS Code extension (TypeScript) with a two-pass AI transpilation pipeline (generation followed by compiler verification and self-healing). Routes between 6 AI providers with automatic fallback, SHA-256 caching for zero duplicate calls, and local offline processing via Ollama.',
    impact: 'Published on VS Code Marketplace',
    features: [
      'Transpiles Across 25+ Programming Languages',
      'Two-Pass AI Self-Correction Pipeline',
      'SHA-256 Smart Hash Caching',
      'Zero-Data-Leak PII Sanitization',
      'Local Offline Mode via Ollama Support',
      'Compiler Validation (tsc, javac, rustc)',
    ],
    tags: ['TypeScript', 'VS Code API', 'Generative AI', 'Ollama', 'Compiler Validation'],
    categories: ['AI', 'Dev Tools'],
    icon: 'languages',
    accent: '#9fd0ff',
    link: LINKS.langshift,
    liveUrl: LINKS.langshift,
  },
];

export const heroStats: { value?: number; decimals?: number; suffix?: string; text?: string; label: string; sub: string }[] = [
  { value: 4, decimals: 0, suffix: 'K+', label: 'Global downloads', sub: 'EPL ecosystem' },
  { value: 2.5, decimals: 1, suffix: 'K+', label: 'Offline phrases', sub: 'NeuroShell engine' },
  { text: 'Live', label: 'Commercial SaaS', sub: 'asworks.studio' },
  { value: 25, decimals: 0, suffix: '+', label: 'Language targets', sub: 'LangShift transpiler' },
];

export const stack = [
  'C++20',
  'Python',
  'PostgreSQL',
  'Generative AI',
  'Agentic AI',
  'Multi-LLM Routing',
  'LLVM',
  'WebAssembly',
  'pybind11',
  'TypeScript',
  'Next.js',
  'FastAPI',
  'Flutter',
  'Supabase',
  'Docker',
  'System Design',
];

export const focusAreas: { title: string; icon: IconName; body: string }[] = [
  { title: 'High-performance C++', icon: 'cpu', body: 'Native engines & interop bridges' },
  { title: 'Generative & agentic AI', icon: 'sparkles', body: 'Multi-LLM routing with guardrails' },
  { title: 'Relational data & SQL', icon: 'database', body: 'Schemas, RLS, realtime channels' },
  { title: 'Tooling & compilers', icon: 'code', body: 'Languages, extensions, registries' },
];

export const competencies: { number: string; title: string; icon: IconName; description: string; tags: string[] }[] = [
  {
    number: '01',
    title: 'High-Performance C++ Systems',
    icon: 'cpu',
    description:
      'Engineering ultra-fast, memory-conscious core runtime engines and native interoperability bridges using modern C++20 and pybind11 for near-instant execution.',
    tags: ['C++', 'pybind11', 'CMake', 'System Design'],
  },
  {
    number: '02',
    title: 'Generative AI & Agentic Systems',
    icon: 'sparkles',
    description:
      'Architecting intelligent autonomous pipelines, multi-LLM routing networks (Ollama, Claude, GPT-4o), and Zero-Trust safety shields that block destructive actions.',
    tags: ['Agentic AI', 'Generative AI', 'Multi-LLM Routing', 'Zero-Trust Safety'],
  },
  {
    number: '03',
    title: 'Relational Databases & SQL',
    icon: 'database',
    description:
      'Designing normalized schemas, query optimizations, Row Level Security (RLS) policies, and high-throughput real-time data channels with PostgreSQL.',
    tags: ['PostgreSQL', 'SQL Optimization', 'Database Schema', 'Real-Time Data'],
  },
  {
    number: '04',
    title: 'Developer Tooling & Compilers',
    icon: 'code',
    description:
      'Building multi-backend compilers (LLVM, WebAssembly), AST parsers, official VS Code extensions, and production-grade commercial software marketplaces.',
    tags: ['LLVM', 'WebAssembly', 'Compiler Design', 'Next.js 15'],
  },
];

export const principles = [
  { title: 'Performance first', body: 'Native C++ cores where latency matters, with clean bridges into higher-level code.' },
  { title: 'Safe by default', body: 'Guardrails such as NeuroShell’s Zero-Trust shield are designed in, never bolted on.' },
  { title: 'Open by design', body: 'EPL is open source — tools should be inspectable, shareable and easy to extend.' },
  { title: 'Built for production', body: 'ASWorks runs live payments and fulfilment — real users, real constraints.' },
];

export const certifications = [
  { title: 'Claude Code in Action', issuer: 'Anthropic', year: '2026' },
  { title: 'AWS EC2 Fundamentals', issuer: 'KodeKloud', year: '2025' },
  { title: 'Cloud Computing Fundamentals', issuer: 'KodeKloud', year: '2025' },
];

export const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Work', id: 'projects' },
  { name: 'Architecture', id: 'architecture' },
  { name: 'Credentials', id: 'certifications' },
  { name: 'Contact', id: 'contact' },
];
