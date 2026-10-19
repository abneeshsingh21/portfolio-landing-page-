import { useEffect, useState } from 'react';

export interface RepoStats {
  stars: number;
  forks: number;
  pushedAt: string;
}

const TTL = 60 * 60 * 1000;
const inflight = new Map<string, Promise<RepoStats | null>>();

async function load(repo: string): Promise<RepoStats | null> {
  const key = `gh:${repo}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) ?? 'null') as { t: number; v: RepoStats } | null;
    if (cached && Date.now() - cached.t < TTL) return cached.v;
  } catch {
    /* ignore */
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    const j = (await res.json()) as { stargazers_count: number; forks_count: number; pushed_at: string };
    const v = { stars: j.stargazers_count, forks: j.forks_count, pushedAt: j.pushed_at };
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v }));
    } catch {
      /* ignore */
    }
    return v;
  } catch {
    return null;
  }
}

/** Live public repo stats (cached per session, fails silently when rate-limited). */
export function useGithubStats(repo?: string) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  useEffect(() => {
    if (!repo) return;
    let alive = true;
    if (!inflight.has(repo)) inflight.set(repo, load(repo));
    inflight.get(repo)?.then((v) => {
      if (alive) setStats(v);
    });
    return () => {
      alive = false;
    };
  }, [repo]);
  return stats;
}

export function timeAgo(iso: string) {
  const s = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [
    [31536000, 'y'],
    [2592000, 'mo'],
    [604800, 'w'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
  ];
  for (const [n, u] of units) if (s >= n) return `${Math.floor(s / n)}${u} ago`;
  return 'just now';
}
