import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ABOUT_CONTENT_KEY, translations, useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

type Overrides = Record<string, { mn?: string; en?: string }>;

const LABELS: Record<string, string> = {
  badge: "Жижиг гарчиг", title: "Гарчиг", titleHighlight: "Гарчгийн тодруулсан хэсэг",
  desc1: "Тайлбар 1", desc2: "Тайлбар 2", learnMore: "Товчны текст",
  "value.mission": "Эрхэм зорилго", "value.missionDesc": "Эрхэм зорилгын тайлбар",
  "value.vision": "Алсын хараа", "value.visionDesc": "Алсын харааны тайлбар",
  "value.values": "Үнэт зүйлс", "value.valuesDesc": "Үнэт зүйлсийн тайлбар",
};

const isHidden = (k: string) => /milestone|timeline|satisfaction|ctaContact|ctaProducts/.test(k);

const groups = [
  { title: "Нүүр хуудас — Бидний тухай хэсэг", prefix: "about." },
  { title: "Бидний тухай хуудас", prefix: "aboutPage." },
];

const AdminAboutPage = () => {
  const { refreshOverrides } = useLanguage();
  const [values, setValues] = useState<Overrides>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const keysByGroup = useMemo(
    () => groups.map((g) => ({ ...g, keys: Object.keys(translations).filter((k) => k.startsWith(g.prefix) && !isHidden(k)) })),
    []
  );

  useEffect(() => {
    supabase.from("site_content").select("metadata").eq("section_key", ABOUT_CONTENT_KEY).maybeSingle()
      .then(({ data }) => {
        const saved = (data?.metadata as Overrides) ?? {};
        const init: Overrides = {};
        keysByGroup.forEach((g) => g.keys.forEach((k) => {
          init[k] = { mn: saved[k]?.mn ?? translations[k].mn, en: saved[k]?.en ?? translations[k].en };
        }));
        setValues(init);
        setLoading(false);
      });
  }, [keysByGroup]);

  const update = (k: string, lang: "mn" | "en", v: string) =>
    setValues((p) => ({ ...p, [k]: { ...p[k], [lang]: v } }));

  const reset = (k: string) => setValues((p) => ({ ...p, [k]: { mn: translations[k].mn, en: translations[k].en } }));

  const save = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { data: existing } = await supabase.from("site_content").select("id").eq("section_key", ABOUT_CONTENT_KEY).maybeSingle();
    const payload = { section_key: ABOUT_CONTENT_KEY, metadata: values, updated_by: user?.id ?? null, updated_at: new Date().toISOString() };
    const { error } = existing
      ? await supabase.from("site_content").update(payload).eq("id", existing.id)
      : await supabase.from("site_content").insert(payload);
    setSaving(false);
    if (error) return toast.error("Хадгалахад алдаа гарлаа: " + error.message);
    await refreshOverrides();
    toast.success("Бидний тухай хэсэг шинэчлэгдлээ");
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Бидний тухай</h1>
          <p className="text-muted-foreground text-sm">Монгол болон англи текстийг засаад хадгална уу.</p>
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Хадгалах
        </Button>
      </div>
      {keysByGroup.map((g) => (
        <Card key={g.prefix}>
          <CardHeader><CardTitle className="text-lg">{g.title}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {g.keys.map((k) => {
              const short = k.slice(g.prefix.length);
              const long = (translations[k].mn?.length ?? 0) > 70;
              const Field = long ? Textarea : Input;
              return (
                <div key={k} className="space-y-2 border-b border-border pb-4 last:border-0">
                  <div className="flex items-center justify-between">
                    <Label>{LABELS[short] ?? short}</Label>
                    <Button variant="ghost" size="sm" onClick={() => reset(k)} title="Анхны текст рүү буцаах">
                      <RotateCcw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Монгол</span>
                      <Field value={values[k]?.mn ?? ""} onChange={(e) => update(k, "mn", e.target.value)} rows={4} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">English</span>
                      <Field value={values[k]?.en ?? ""} onChange={(e) => update(k, "en", e.target.value)} rows={4} />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-end"><Button onClick={save} disabled={saving}><Save className="w-4 h-4 mr-2" />Хадгалах</Button></div>
    </div>
  );
};

export default AdminAboutPage;
