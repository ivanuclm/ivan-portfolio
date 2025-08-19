"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Mail, Github, Linkedin, Globe, Sun, Moon, Download,
  Hammer, Rocket, Newspaper, Briefcase, FlaskConical,
  Languages, ChevronRight, ExternalLink,
} from "lucide-react";
import type { Route } from "next";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

// util simple para clases
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// demo data
const projects = [
  { title: "HSE Incident Records", desc: "Aplicación para gestionar incidentes HSE, con flujo de estados, logs y reportería.", tags: ["CakePHP", "MySQL", "Charts"], link: "#" },
  { title: "Frutas y Verduras YOLOv7", desc: "Detección en tiempo real con pipeline MLRun y despliegue sobre Kubernetes.", tags: ["YOLOv7", "MLRun", "K3s", "Nuclio"], link: "#" },
  { title: "Pool IoT Controller", desc: "Domótica de piscina, control de pH y cloro, depuradora y relleno automático.", tags: ["ESP32", "IoT", "MQTT"], link: "#" },
  { title: "Realidad Aumentada: AR Drive", desc: "Juego de coches con Vuforia, combustible, turbo y coleccionables.", tags: ["Unity", "C#", "Vuforia"], link: "#" },
];

const posts = [
  { title: "Desplegando funciones con MLRun en local", date: "2025-05-02", minutes: 6, link: "#" },
  { title: "Trucos con Auth.js + Next.js", date: "2025-03-10", minutes: 5, link: "#" },
  { title: "Kettle + SAP B1 Service Layer", date: "2025-04-01", minutes: 7, link: "#" },
];

const skills = [
  { name: "TypeScript", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Python/ML", level: 75 },
  { name: "AWS/GCP", level: 70 },
  { name: "IoT/Embedded", level: 65 },
  { name: "Kubernetes", level: 60 },
];

const timeline = [
  { year: "2025", items: ["Team Lead, digitalización web", "Proyecto MLRun-CE en WSL2"] },
  { year: "2024", items: ["Arquitecturas IoT y visión artificial", "Elección de TFM"] },
  { year: "2023", items: ["Full-stack, ERPs y ETL", "Excelencia operacional"] },
];

export default function PortfolioApp() {
  // i18n
  const t = useTranslations();
  const locale = useLocale(); // "es" | "en"
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: "es" | "en") {
    // quita el prefijo actual /es o /en si existe
    const base = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
    // añade el nuevo prefijo
    const nextPath = `/${nextLocale}${base}`;
    // IMPORTANTE: solo un argumento, sin { locale: ... }
    router.replace(nextPath as Route);
  }

  // tema
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  const [formState, setFormState] = useState<"idle" | "loading" | "sent">("idle");

  const Section = ({ title, children, className }:{
    title: string, children: React.ReactNode, className?: string
  }) => (
    <Card className={cn("rounded-2xl shadow-sm", className)}>
      <CardHeader><CardTitle className="text-xl">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {t("greeting")} <span className="text-primary">👋</span>
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">{t("subtitle")}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm"><Download className="w-4 h-4 mr-2" /> {t("ctaViewCV")}</Button>
              <Button size="sm" variant="secondary"><Github className="w-4 h-4 mr-2" /> GitHub</Button>
              <Button size="sm" variant="secondary"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</Button>
              <Button size="sm" variant="ghost"><Globe className="w-4 h-4 mr-2" /> @ivhdez</Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Idioma */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Languages className="w-4 h-4" /> {t("language")}
              <Switch
                checked={locale === "en"}
                onCheckedChange={(v) => switchLocale(v ? "en" : "es")}
              />
              <span className="font-medium w-6 text-center">{locale.toUpperCase()}</span>
            </div>
            {/* Tema */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sun className="w-4 h-4" /> {t("theme")}
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </motion.header>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="bg-muted p-1 rounded-xl grid grid-cols-6 sm:w-auto sm:inline-grid sm:auto-cols-auto gap-2">
            <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:shadow-sm" value="about"><Briefcase className="w-4 h-4 mr-2" />{t("about")}</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:shadow-sm" value="projects"><Rocket className="w-4 h-4 mr-2" />{t("projects")}</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:shadow-sm" value="blog"><Newspaper className="w-4 h-4 mr-2" />{t("blog")}</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:shadow-sm" value="cv"><Download className="w-4 h-4 mr-2" />{t("cv")}</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:shadow-sm" value="playground"><FlaskConical className="w-4 h-4 mr-2" />{t("playground")}</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:shadow-sm" value="contact"><Mail className="w-4 h-4 mr-2" />{t("contact")}</TabsTrigger>
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Section title={t("techStack")} className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  {skills.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{s.name}</span>
                        <span className="text-xs text-muted-foreground">{s.level}%</span>
                      </div>
                      <Progress value={s.level} />
                    </div>
                  ))}
                </div>
              </Section>
              <Section title={t("timeline")}>
                <div className="space-y-4">
                  {timeline.map((tli) => (
                    <div key={tli.year}>
                      <div className="font-semibold">{tli.year}</div>
                      <ul className="mt-1 space-y-1">
                        {tli.items.map((it, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <ChevronRight className="w-4 h-4 mr-1 mt-0.5" /> {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects" className="mt-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  <Card className="h-full flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Hammer className="w-4 h-4" /> {p.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {p.tags.map((t) => (<Badge key={t} variant="secondary">{t}</Badge>))}
                        </div>
                        <Button size="sm" variant="ghost">
                          {t("view")} <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Blog */}
          <TabsContent value="blog" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Section title={t("featuredPosts")} className="md:col-span-2">
                <div className="divide-y">
                  {posts.map((post) => (
                    <a key={post.title} href={post.link} className="block py-3 group">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium group-hover:underline">{post.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString(locale)} · {post.minutes} min
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </Section>
            </div>
          </TabsContent>

          {/* CV */}
          <TabsContent value="cv" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Section title={t("cv.summaryTitle")} className="md:col-span-2">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>{t("cv.bullet1")}</li>
                  <li>{t("cv.bullet2")}</li>
                  <li>{t("cv.bullet3")}</li>
                </ul>
                <div className="mt-4 flex gap-2">
                  <Button><Download className="w-4 h-4 mr-2" />{t("pdf")}</Button>
                  <Button variant="secondary">{t("linkedin")}</Button>
                </div>
              </Section>
              <Section title={t("cv.skillsTitle")}>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript","React/Next.js","Python","Kubernetes","AWS","ML/Deep Learning","IoT/ESP32"].map((label) => (
                    <Badge key={label} variant="outline">{label}</Badge>
                  ))}
                </div>
              </Section>
            </div>
          </TabsContent>

          {/* Playground */}
          <TabsContent value="playground" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Section title={t("play.slugTitle")}><SlugTool /></Section>
              <Section title={t("play.roiTitle")}><RoiTool /></Section>
            </div>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="mt-4">
            <Section title={t("contactTitle")}>
              <form
                onSubmit={(e) => { e.preventDefault(); setFormState("loading"); setTimeout(() => setFormState("sent"), 800); }}
                className="space-y-3"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input required type="email" placeholder={t("yourEmail")} />
                  <Input type="text" placeholder={t("subject")} />
                </div>
                <Textarea required placeholder={t("yourMsg")} rows={6} />
                <Button type="submit" disabled={formState !== "idle"}>
                  <Mail className="w-4 h-4 mr-2" />
                  {formState === "idle" && t("send")}
                  {formState === "loading" && t("sending")}
                  {formState === "sent" && t("sent")}
                </Button>
              </form>
            </Section>
          </TabsContent>
        </Tabs>

        <footer className="text-xs text-muted-foreground mt-8 text-center">
          © {new Date().getFullYear()} Iván H. · {t("footer.note")}
        </footer>
      </div>
    </div>
  );
}

/* ---------- Mini herramientas traducidas ---------- */

function SlugTool() {
  const t = useTranslations();
  const [value, setValue] = useState("");
  const slug = value
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "").trim()
    .replace(/\s+/g, "-").replace(/-+/g, "-");

  return (
    <div className="space-y-2">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={t("yourMsg")} />
      <div className="text-sm">
        <span className="text-muted-foreground">Slug: </span>
        <code className="px-2 py-1 rounded bg-muted">{slug || "(vacío)"}</code>
      </div>
    </div>
  );
}

function RoiTool() {
  const t = useTranslations();
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(30);
  const [savings, setSavings] = useState(150);
  const cost = hours * rate;
  const roi = savings - cost;
  const pct = Math.round(((savings - cost) / Math.max(cost, 1)) * 100);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 items-end">
        <div>
          <label className="text-xs text-muted-foreground">{t("play.hours")}</label>
          <Input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("play.rate")}</label>
          <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("play.savings")}</label>
          <Input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} />
        </div>
      </div>
      <div className="text-sm">
        {t("play.cost")}: <b>{cost.toFixed(2)}€</b> · {t("play.net")}: <b>{roi.toFixed(2)}€</b>
      </div>
      <Progress value={Math.max(Math.min(pct + 50, 100), 0)} />
      <div className="text-xs text-muted-foreground">
        {t("play.roiRel")}: <b>{pct}%</b>
      </div>
    </div>
  );
}
