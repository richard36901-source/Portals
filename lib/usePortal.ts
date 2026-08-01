"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { resolveTenant, fetchProvider } from "@/lib/tenant";

// שכבת נתונים משותפת לפורטל: פותרת דייר מה-hostname, טוענת provider + פרויקטים
// (RLS מסנן לפי project_members), ובוחרת פרויקט נוכחי. demo=true כשאין env.

export type Provider = { id: string; slug: string; name: string };

export type Project = {
  id: string;
  title: string;
  client_name: string | null;
  kind: string | null;
  status: string | null;
  progress: number | null;
  phase: string | null;
  start_date: string | null;
  deadline: string | null;
  updated_deadline: string | null;
  delay_note: string | null;
  budget: number | null;
  paid: number | null;
  rounds_included: number | null;
  rounds_used: number | null;
  extra_round_price: number | null;
};

export type PortalState = {
  demo: boolean;
  loading: boolean;
  provider: Provider | null;
  projects: Project[];
  project: Project | null;
  selectProject: (id: string) => void;
};

const LS_KEY = "ap_selected_project";

export function tenantSlug(): string {
  if (typeof window === "undefined") return "autoscale";
  const r = resolveTenant(window.location.hostname);
  return r.mode === "tenant" ? r.slug : "autoscale";
}

export function usePortal(): PortalState {
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const sb = supabase();
    if (!sb) {
      setDemo(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data: userData } = await sb.auth.getUser();
      if (!userData.user) {
        // ללא סשן — ה-guard ב-layout יפנה ל-/login
        if (!cancelled) setLoading(false);
        return;
      }
      const slug = tenantSlug();
      let prov: Provider;
      try {
        prov = (await fetchProvider(sb, slug)) as Provider;
      } catch {
        if (!cancelled) setLoading(false);
        return;
      }
      // חברות בדייר — אם אין, להצטרף פעם אחת דרך RPC
      const { data: mem } = await sb
        .from("user_providers")
        .select("provider_id")
        .eq("provider_id", prov.id)
        .maybeSingle();
      if (!mem) {
        await sb.rpc("join_tenant", { tslug: slug });
      }
      const { data: projs } = await sb
        .from("projects")
        .select("*")
        .eq("provider_id", prov.id)
        .order("created_at", { ascending: true });
      const list = (projs ?? []) as Project[];
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(LS_KEY);
      } catch {}
      const sel = list.find((p) => p.id === stored)?.id ?? list[0]?.id ?? null;
      if (cancelled) return;
      setProvider(prov);
      setProjects(list);
      setSelectedId(sel);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectProject = (id: string) => {
    try {
      localStorage.setItem(LS_KEY, id);
    } catch {}
    setSelectedId(id);
  };

  const project = projects.find((p) => p.id === selectedId) ?? null;
  return { demo, loading, provider, projects, project, selectProject };
}
