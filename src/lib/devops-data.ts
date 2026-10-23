import type { IconName } from '../components/Icon';
import { LINKS } from './site';
import type { Project } from './data';

export const DEVOPS_CATEGORIES = ['All', 'CI/CD', 'Containers', 'Cloud', 'Automation'] as const;
export type DevOpsCategory = (typeof DEVOPS_CATEGORIES)[number];

export const devopsProjects: Project[] = [
  {
    id: 'syting',
    title: 'Syting Database CI/CD & Migration Harness',
    shortTitle: 'Syting CI/CD',
    role: 'Database Infrastructure & CI Engineer',
    summary: 'Ephemeral PostgreSQL 17 test harness executing 89 sequential migrations in GitHub Actions.',
    description:
      'An automated database reliability engineering pipeline built for Syting. Spins up ephemeral PostgreSQL 17 Alpine containers on isolated ports, polls initialization health with pg_isready, applies 89 SQL schema migrations sequentially, validates Row-Level Security policies, and guarantees zero runner contamination via shell exit traps.',
    problem:
      'Database schema changes across 89 migration files and Row-Level Security policies risked regressions in staging without isolated, repeatable database integration testing in CI.',
    solution:
      'Engineered a hermetic Bash test harness (verify_sql.sh) integrated into GitHub Actions. Provisions an ephemeral postgres:17-alpine container, verifies database readiness, sequentially executes all 89 migrations with ON_ERROR_STOP, runs RLS assertions, and utilizes trap cleanup EXIT to ensure reliable container destruction even upon unexpected script termination.',
    impact: '89 Sequential Migrations in CI',
    features: [
      'Ephemeral PostgreSQL 17 Alpine Container Lifecycle',
      'Database Health Probing Loop (pg_isready)',
      '89 Sequential Schema Migrations Applied with Error Trapping',
      'Guaranteed Teardown via Shell Exit Trap (trap cleanup EXIT)',
      'Row-Level Security (RLS) Policy Automated CI Gates',
      'Zero-Drift Hermetic GitHub Actions Pipeline',
    ],
    tags: ['PostgreSQL 17', 'Docker', 'Bash Scripting', 'GitHub Actions', 'RLS Security', 'CI/CD'],
    categories: ['CI/CD', 'Containers'] as any,
    icon: 'database',
    accent: '#ffc6a8',
    link: '#projects',
    isPrivate: true,
    pipeline: ['Docker Run', 'pg_isready', '89 Migrations', 'RLS Gates', 'Exit Trap'],
  },
  {
    id: 'epl',
    title: 'EPL Continuous Delivery & Cloud Tooling',
    shortTitle: 'EPL Cloud Tooling',
    role: 'DevOps & Release Tooling Architect',
    summary: 'Multi-OS matrix CI/CD, Azure Container Apps automation, and Kubernetes manifest generation.',
    description:
      'Production-grade CI/CD and cloud deployment tooling for the EPL programming language ecosystem. Features a multi-OS GitHub Actions matrix (Ubuntu, macOS, Windows) with pinned action SHAs, automated container deployment to Azure Container Apps via Azure CLI & ACR, OIDC trusted publishing to PyPI, and a programmatic Python Kubernetes manifest generator.',
    problem:
      'A multi-target language runtime requires hermetic cross-platform validation, credential-free secure package release publishing, and automated cloud deployments across environments.',
    solution:
      'Architected multi-OS matrix CI workflows in GitHub Actions with Ruff linting, pinned SHAs, and least-privilege token permissions (contents: read). Automated container builds and continuous deployment to Azure Container Apps with ACR integration, OIDC trusted publishing to PyPI, and engineered k8s_gen.py to programmatically generate valid Kubernetes manifests (Deployments, Services, Ingress, and HPA).',
    impact: 'Multi-OS Matrix CI & Azure CD',
    features: [
      'Multi-OS GitHub Actions Matrix (Ubuntu, macOS, Windows)',
      'Automated Azure Container Apps Continuous Deployment',
      'Azure Container Registry (ACR) Image Build & Push',
      'OIDC Cryptographic Trusted Publishing to PyPI',
      'Programmatic Kubernetes YAML & HPA Manifest Generation',
      'Azure App Service Deployments with HTTP Health Probing',
    ],
    tags: ['GitHub Actions', 'Docker', 'Azure Container Apps', 'Kubernetes YAML', 'OIDC Publishing', 'Python CLI'],
    categories: ['CI/CD', 'Cloud', 'Automation'] as any,
    icon: 'book',
    accent: '#9fd0ff',
    link: LINKS.epl,
    liveUrl: 'https://eplang.me',
    pipeline: ['Matrix CI', 'Ruff Lint', 'ACR Push', 'Azure Deploy', 'K8s Gen'],
    repo: 'abneeshsingh21/EPL',
  },
  {
    id: 'neuroshell',
    title: 'NeuroShell Reliability & Container Hardening',
    shortTitle: 'NeuroShell CI',
    role: 'Systems & Reliability Engineer',
    summary: 'Cross-platform CMake & AddressSanitizer CI, nightly chaos testing, and hardened non-root Docker builds.',
    description:
      'A hardened native systems runtime and automated verification infrastructure. Features cross-platform CMake CI matrix pipelines running CTest and Linux AddressSanitizer (ASan) memory checks, automated Python chaos fault injection, and multi-stage Dockerfile architecture enforcing non-root user execution and minimal runtime attack surface.',
    problem:
      'Native C++20 terminal engines risk memory corruption, buffer overflows, and crashes across operating systems without automated sanitizers, resilience testing, and container security isolation.',
    solution:
      'Configured CI pipelines running CMake and CTest with AddressSanitizer (-fsanitize=address) enabled to catch memory violations before merge. Authored multi-stage Dockerfiles based on python:3.12-slim isolating build tools from runtime, enforcing non-root execution (useradd -m neuroshell), and built release tooling that calculates SHA-256 checksums for distribution bundles.',
    impact: 'Hardened Non-Root Container',
    features: [
      'Cross-Platform CMake & CTest Matrix Pipelines',
      'Linux AddressSanitizer (ASan) Memory Corruption Defense',
      'Multi-Stage Dockerfile on python:3.12-slim Runtime',
      'Non-Root User Execution Isolation (useradd -m)',
      'Nightly Soak Workflows & Chaos Fault Injection',
      'Automated SHA-256 Checksum Calculation & Packaging',
    ],
    tags: ['Docker', 'GitHub Actions', 'AddressSanitizer', 'Release Tooling', 'Linux', 'CMake'],
    categories: ['Containers', 'CI/CD'] as any,
    icon: 'terminal',
    accent: '#8ff0d6',
    link: LINKS.neuroshell,
    pipeline: ['CMake Build', 'CTest Matrix', 'ASan Sanitizer', 'Multi-Stage Docker', 'SHA-256'],
    repo: 'abneeshsingh21/neuroshell',
  },
  {
    id: 'asworks',
    title: 'ASWorks Cloud Deployment Packaging & Testing',
    shortTitle: 'ASWorks Cloud',
    role: 'Cloud Deployment & Testing Architect',
    summary: 'MongoDB 7 service container CI pipeline and Next.js standalone packaging for Azure App Service.',
    description:
      'Automated deployment packaging and integration testing infrastructure for a live digital marketplace (asworks.studio). Implements containerized MongoDB 7 service containers in GitHub Actions with active health checking, paired with package-deploy.mjs for Next.js standalone bundle extraction and deployment path validation for Azure App Service.',
    problem:
      'Next.js standalone deployments on Azure App Service frequently fail with silent 404 errors due to nested archive path mismatches, and integration tests require isolated database instances.',
    solution:
      'Configured GitHub Actions CI with MongoDB 7 service containers and health checks (mongosh ping) for hermetic integration and Playwright E2E testing. Built package-deploy.mjs to automate standalone bundle extraction, public asset copying, and deployment archive path validation to catch packaging errors that could cause production 404s before release.',
    impact: 'Hermetic CI & Azure App Service CD',
    features: [
      'MongoDB 7 GitHub Actions Service Container',
      'Automated Container Health Probing (mongosh ping)',
      'Hermetic Integration & Automated Playwright E2E Testing',
      'Next.js Standalone Azure App Service Deployment Packaging',
      'Deployment Archive Path Validation to Prevent 404s',
      'Zero-Downtime Deployment Packaging Automation',
    ],
    tags: ['Azure App Service', 'Docker Services', 'GitHub Actions', 'Playwright', 'Next.js Standalone', 'Node.js'],
    categories: ['Cloud', 'CI/CD'] as any,
    icon: 'bag',
    accent: '#c7b2ff',
    link: LINKS.asworks,
    liveUrl: LINKS.asworks,
    pipeline: ['Mongo 7 Service', 'Healthcheck Ping', 'Playwright E2E', 'Standalone Zip', 'Azure Deploy'],
  },
];

export const devopsHeroStats = [
  { value: 89, decimals: 0, suffix: '', label: 'SQL migrations in CI', sub: 'Ephemeral Postgres harness' },
  { value: 3, decimals: 0, suffix: ' OS', label: 'Matrix test targets', sub: 'Ubuntu, macOS, Windows' },
  { text: 'Live', label: 'Azure cloud deployments', sub: 'Container Apps & App Service' },
  { value: 0, decimals: 0, suffix: '', label: 'Container drift', sub: 'Hardened non-root runtimes' },
];

export const devopsStack = [
  'GitHub Actions',
  'Docker',
  'Multi-Stage Builds',
  'Azure Container Apps',
  'Azure App Service',
  'ACR & GHCR',
  'Bash (Linux/Shell)',
  'Python Scripting',
  'Kubernetes YAML',
  'HPA Scaling',
  'PostgreSQL 17',
  'MongoDB 7 Services',
  'OIDC Publishing',
  'AddressSanitizer (ASan)',
  'Playwright CI Gates',
  'Linux (Ubuntu/Debian)',
];

export const devopsFocusAreas = [
  { title: 'Automated CI/CD & Gates', icon: 'zap' as IconName, body: 'Multi-OS matrices, pinned SHAs, OIDC publishing' },
  { title: 'Containers & Docker', icon: 'layers' as IconName, body: 'Multi-stage builds, non-root users, ephemeral DBs' },
  { title: 'Cloud & Azure Operations', icon: 'globe' as IconName, body: 'Azure Container Apps, App Service, ACR, health checks' },
  { title: 'Infrastructure Tooling', icon: 'code' as IconName, body: 'Kubernetes YAML generation, Bash exit traps' },
];

export const devopsCompetencies = [
  {
    number: '01',
    title: 'Automated CI/CD Pipelines & Security Gates',
    icon: 'zap' as IconName,
    description:
      'Architecting resilient GitHub Actions matrix workflows across Ubuntu, macOS, and Windows. Enforcing least-privilege tokens (contents: read), pinned action SHAs, automated linting gates, and keyless OIDC trusted package publishing.',
    tags: ['GitHub Actions', 'Matrix Builds', 'OIDC Publishing', 'Automated Gates'],
  },
  {
    number: '02',
    title: 'Containerization & Production Hardening',
    icon: 'layers' as IconName,
    description:
      'Authoring multi-stage Dockerfiles separating build dependencies from minimal production runtimes on python:3.12-slim. Enforcing non-root user execution (useradd) and managing ephemeral container lifecycles for hermetic testing.',
    tags: ['Docker', 'Multi-Stage', 'Non-Root Security', 'Container Lifecycle'],
  },
  {
    number: '03',
    title: 'Cloud Deployment & Infrastructure Operations',
    icon: 'globe' as IconName,
    description:
      'Automating container image packaging and continuous deployment to Azure Container Apps via Azure CLI and ACR. Packaging Next.js standalone web applications for Azure App Service with archive validation and HTTP health probing.',
    tags: ['Azure Container Apps', 'Azure App Service', 'ACR', 'Health Probes'],
  },
  {
    number: '04',
    title: 'Database Migration Harnesses & Linux Scripting',
    icon: 'database' as IconName,
    description:
      'Engineering production-grade Bash validation harnesses that spin up ephemeral PostgreSQL 17 Alpine containers, poll pg_isready until healthy, apply 89 SQL migrations sequentially, and guarantee clean exit-trap teardown (trap cleanup EXIT).',
    tags: ['PostgreSQL 17', 'Bash Scripting', 'Exit Traps', 'Kubernetes YAML'],
  },
];

export const devopsPrinciples = [
  { title: 'Hermetic by default', body: 'Every test and migration runs in isolated, ephemeral containers without runner contamination.' },
  { title: 'Least-privilege security', body: 'Non-root container execution (useradd) and restricted CI tokens (contents: read).' },
  { title: 'Zero surprise deployments', body: 'Pre-deployment archive and path validation prevent silent production 404 errors.' },
  { title: 'Automated teardown', body: 'Exit traps (trap cleanup EXIT) guarantee temporary test containers are purged on every exit.' },
];

export const devopsTerminalScenes = [
  {
    prompt: 'run ephemeral postgres migration verification',
    lines: [
      { kind: 'info' as const, text: 'harness · tools/verify_sql.sh   image · postgres:17-alpine' },
      { kind: 'out' as const, text: 'pg_isready -h localhost -p 54332 -> accepting connections (1.2s)' },
      { kind: 'ok' as const, text: '89/89 SQL migrations applied sequentially · RLS verified' },
      { kind: 'info' as const, text: 'trap cleanup EXIT -> container stopped & purged cleanly' },
    ],
  },
  {
    prompt: 'deploy epl runtime to azure container apps',
    lines: [
      { kind: 'info' as const, text: 'registry · acr.azurecr.io   auth · azure cli & oidc' },
      { kind: 'out' as const, text: 'az containerapp update --image acr:sha-256 --cpu 0.5 --memory 1.0Gi' },
      { kind: 'ok' as const, text: 'Revision provisioned · health probe 200 OK · zero downtime' },
    ],
  },
  {
    prompt: 'generate kubernetes manifest with hpa scaling',
    lines: [
      { kind: 'info' as const, text: 'generator · epl/k8s_gen.py   specs · deployment, service, hpa' },
      { kind: 'out' as const, text: 'k8s_gen.py --replicas 3 --cpu-target 75% > k8s/deploy.yaml' },
      { kind: 'ok' as const, text: 'Valid K8s YAML emitted · 6 resources configured' },
    ],
  },
];

export const DEVOPS_PHRASES = [
  'automated CI/CD pipelines.',
  'hardened Docker containers.',
  'ephemeral PostgreSQL test harnesses.',
  'Azure cloud deployments.',
  'Kubernetes manifest tooling.',
] as const;
