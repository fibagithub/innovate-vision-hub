// Mongolian aimags (provinces) with ISO 3166-2:MN codes used by amCharts mongoliaLow geodata
// These IDs MUST match the `id` field in https://cdn.amcharts.com/lib/5/geodata/json/mongoliaLow.json

export interface Aimag {
  id: string;        // ISO code used by amCharts geodata (e.g. "MN-1")
  value: string;     // stable key stored in DB (slug)
  label_mn: string;  // Mongolian display name
  label_en: string;  // English display name
}

export const AIMAGS: Aimag[] = [
  { id: "MN-1",  value: "ulaanbaatar",   label_mn: "Улаанбаатар",      label_en: "Ulaanbaatar" },
  { id: "MN-035", value: "orkhon",       label_mn: "Орхон",            label_en: "Orkhon" },
  { id: "MN-037", value: "darkhan-uul",  label_mn: "Дархан-Уул",       label_en: "Darkhan-Uul" },
  { id: "MN-039", value: "khentii",      label_mn: "Хэнтий",           label_en: "Khentii" },
  { id: "MN-041", value: "khovsgol",     label_mn: "Хөвсгөл",          label_en: "Khövsgöl" },
  { id: "MN-043", value: "khovd",        label_mn: "Ховд",             label_en: "Khovd" },
  { id: "MN-046", value: "uvs",          label_mn: "Увс",              label_en: "Uvs" },
  { id: "MN-047", value: "tov",          label_mn: "Төв",              label_en: "Töv" },
  { id: "MN-049", value: "selenge",      label_mn: "Сэлэнгэ",          label_en: "Selenge" },
  { id: "MN-051", value: "sukhbaatar",   label_mn: "Сүхбаатар",        label_en: "Sükhbaatar" },
  { id: "MN-053", value: "umnugovi",     label_mn: "Өмнөговь",         label_en: "Ömnögovi" },
  { id: "MN-055", value: "uvurkhangai",  label_mn: "Өвөрхангай",       label_en: "Övörkhangai" },
  { id: "MN-057", value: "zavkhan",      label_mn: "Завхан",           label_en: "Zavkhan" },
  { id: "MN-059", value: "dundgovi",     label_mn: "Дундговь",         label_en: "Dundgovi" },
  { id: "MN-061", value: "dornogovi",    label_mn: "Дорноговь",        label_en: "Dornogovi" },
  { id: "MN-063", value: "dornod",       label_mn: "Дорнод",           label_en: "Dornod" },
  { id: "MN-064", value: "govi-sumber",  label_mn: "Говьсүмбэр",       label_en: "Govi-Sümber" },
  { id: "MN-065", value: "govi-altai",   label_mn: "Говь-Алтай",       label_en: "Govi-Altai" },
  { id: "MN-067", value: "bulgan",       label_mn: "Булган",           label_en: "Bulgan" },
  { id: "MN-069", value: "bayankhongor", label_mn: "Баянхонгор",       label_en: "Bayankhongor" },
  { id: "MN-071", value: "bayan-ulgii",  label_mn: "Баян-Өлгий",       label_en: "Bayan-Ölgii" },
  { id: "MN-073", value: "arkhangai",    label_mn: "Архангай",         label_en: "Arkhangai" },
];

export const AIMAG_BY_VALUE: Record<string, Aimag> = AIMAGS.reduce((acc, a) => {
  acc[a.value] = a;
  return acc;
}, {} as Record<string, Aimag>);

export const AIMAG_BY_ID: Record<string, Aimag> = AIMAGS.reduce((acc, a) => {
  acc[a.id] = a;
  return acc;
}, {} as Record<string, Aimag>);
