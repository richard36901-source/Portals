// קטלוג המוצרים — המלל והמחירים נלקחו מ-autoscalehq.io/products ומדף הבית.
// כל המחירים אינם כוללים מע״מ (18%). עלויות כלים וצד שלישי אינן כלולות.
// הפורטל לא גובה תשלום: כל מוצר נשלח כבקשה, למעט בנק שעות שנרכש באתר הראשי.

export const WHATSAPP_DONNA = "https://wa.me/972552962965";
export const HOURS_BANK_URL = "https://autoscalehq.io/#client";
export const PRODUCTS_URL = "https://autoscalehq.io/products";

export function whatsappLink(subject: string): string {
  return `${WHATSAPP_DONNA}?text=${encodeURIComponent(`היי דונה, פונה מהפורטל בנוגע ל${subject}`)}`;
}

export type Product = {
  key: string;
  group: string;
  name: string;
  badge?: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  monthly?: string;
  /** בנק שעות בלבד — ניתן לרכישה מיידית באתר הראשי */
  buyable?: boolean;
};

export const HOUR_PACKS = [
  { hours: 5, price: "₪1,500", perHour: "₪300 לשעה" },
  { hours: 10, price: "₪2,900", perHour: "₪290 לשעה" },
  { hours: 20, price: "₪5,600", perHour: "₪280 לשעה" },
  { hours: 40, price: "₪10,800", perHour: "₪270 לשעה" },
];

export const PRODUCTS: Product[] = [
  // ---------- מסלולי עבודה ----------
  {
    key: "hours", group: "מסלולי עבודה", name: "בנק שעות", badge: "רכישה מיידית",
    tagline: "קונים שעות מראש ומושכים לפי הצורך. אידיאלי לעסקים עם עבודה שוטפת וגמישה.",
    price: "₪270–300", priceNote: "לשעה · ניכוי אוטומטי מהבנק", buyable: true,
    features: ["רכישה מראש בהנחה", "דשבורד לקוח בזמן אמת", "דיווח על כל משימה"],
  },
  {
    key: "project", group: "מסלולי עבודה", name: "פרויקט חד-פעמי",
    tagline: "סקופ ברור, מחיר קבוע, לוח זמנים מוסכם. מהרעיון ועד להשקה.",
    price: "החל מ-₪2,500", priceNote: "לפי פרויקט · הצעה ספציפית",
    features: ["סקופ מוגדר ומוסכם", "סרטוני הדרכה לפי צורך + מדריכים"],
  },
  {
    key: "maintenance", group: "מסלולי עבודה", name: "תחזוקה שוטפת",
    tagline: "ריטיינר חודשי לתמיכה, עדכונים, תיקונים, ופיתוח מתמשך של המערכות שלכם.",
    price: "החל מ-₪400", priceNote: "לחודש · כולל תמיכה ושדרוגים",
    features: ["תמיכה מועדפת", "בקשות דחיפות בפריוריטי", "ניטור שוטף של מערכות"],
  },

  // ---------- אוטומציות ומערכות ----------
  {
    key: "wa-bot", group: "אוטומציות ומערכות", name: "בוט וואטסאפ מלא", badge: "מומלץ",
    tagline: "עד 6 שלבים + CRM/Sheets + Dashboard",
    price: "החל מ-₪2,000", priceNote: "+מע״מ · הקמה חד פעמית", monthly: "תמיכה חודשית החל מ-₪350 +מע״מ/חודש",
    features: [
      "זרם שיחה עד 6 שלבים מותאמים לעסק",
      "חיבור ל-CRM או Google Sheets",
      "לוח ניהול (dashboard) — כמו WATI, אבל שלך",
      "הדרכה + תיעוד מסירה",
      "מספר WhatsApp Business — נדרש מראש (צד שלישי)",
    ],
  },
  {
    key: "crm", group: "אוטומציות ומערכות", name: "חיבור CRM בסיסי לעסק", badge: "הקמה מלאה",
    tagline: "לקוחות, לידים ופייפליין — הכל במקום אחד",
    price: "החל מ-₪3,500", priceNote: "+מע״מ · הקמה חד פעמית", monthly: "תמיכה חודשית החל מ-₪350 +מע״מ/חודש",
    features: [
      "CRM מותאם (Monday.com / Sheets / Notion)",
      "ניהול לידים, פייפליין מכירות, פרופיל לקוח",
      "אוטומציות בסיסיות: תזכורות, עדכונים, תיוגים",
      "חיבור לטפסים (אתר / WhatsApp / פייסבוק)",
      "הדרכה + תיעוד מסירה",
    ],
  },
  {
    key: "manychat", group: "אוטומציות ומערכות", name: "AutoResponse — ManyChat", badge: "ללא תחזוקה",
    tagline: "Instagram, Facebook, Email, SMS — עד 4 שלבים",
    price: "החל מ-₪900", priceNote: "+מע״מ · הקמה חד פעמית",
    features: [
      "זרם תגובה אוטומטי עד 4 שלבים",
      "Instagram DM, Facebook Messenger, Email, SMS",
      "תגובה לתגובות, סטורי, מודעות",
      'מסירה "תעבוד לבד" — ללא תחזוקה שוטפת',
      "רישיון ManyChat — בנפרד ועצמאית",
    ],
  },
  {
    key: "webinar", group: "אוטומציות ומערכות", name: "מערך וובינר מלא", badge: "End-to-End",
    tagline: "דף הרשמה + מיילים + תזכורות + מעקב",
    price: "החל מ-₪2,500", priceNote: "+מע״מ · להקמה",
    features: [
      "דף הרשמה ממיר עם טופס מלא",
      "סדרת מיילים אוטומטית (אישור + תזכורות)",
      "חיבור ל-Zoom או פלטפורמת סטרימינג",
      "מעקב נרשמים, משתתפים ו-follow-up אחרי",
      "שליחת הקלטה אוטומטית למי שלא הגיע",
    ],
  },

  // ---------- אתרים ושיווק ----------
  {
    key: "landing", group: "אתרים ושיווק", name: "דף נחיתה בסיסי", badge: "עד 5 סקשנים",
    tagline: "דף מקצועי ומותאם לעסק — לידים, מבצעים, שירותים",
    price: "החל מ-₪1,200", priceNote: "+מע״מ · לדף",
    features: [
      "עיצוב מותאם אישית לעסק",
      "עד 5 סקשנים (Hero, יתרונות, שירותים, המלצות, CTA)",
      "טופס לכידת לידים מחובר",
      "מותאם מובייל + RTL עברית",
      "דף נוסף מעבר ל-5 סקשנים — לפי תמחור",
    ],
  },
  {
    key: "website", group: "אתרים ושיווק", name: "בניית אתר לעסק", badge: "מקצועי",
    tagline: "אתר שלם — Multi-page, מערכת ניהול, מותאם SEO",
    price: "החל מ-₪3,500", priceNote: "+מע״מ · לאתר מלא",
    features: [
      "עיצוב מותאם אישית לעסק ולמותג",
      "מספר עמודים (בית, אודות, שירותים, צור קשר)",
      "אופטימיזציה ל-SEO + מובייל + RTL",
      "חיבור לטפסים, אנליטיקס, פיקסלים",
      "הדרכה + תיעוד מסירה",
    ],
  },
  {
    key: "ads", group: "אתרים ושיווק", name: "קמפיין ממומן", badge: "Meta / Google",
    tagline: "בניית קמפיין שלם + ניהול ראשוני",
    price: "החל מ-₪1,200", priceNote: "+מע״מ · להקמה",
    features: [
      "בניית קמפיין ב-Meta או Google Ads",
      "הגדרת קהלי יעד, פיקסלים ו-Conversions",
      "3 וריאציות מודעות (טקסט + ויזואל)",
      "חיבור לטופס לידים אוטומטי",
      "תקציב הפרסום — ישירות לפלטפורמה (לא כלול)",
    ],
  },
  {
    key: "graphics", group: "אתרים ושיווק", name: "גרפיקות לעסק", badge: "עיצוב מותאם",
    tagline: "פוסטים, סטוריז, באנרים, תמונות פרסום",
    price: "החל מ-₪400", priceNote: "+מע״מ · לגרפיקה",
    features: [
      "גרפיקה אחת בעיצוב מקצועי",
      "עד 2 סבבי תיקונים כלולים",
      "פורמטים שונים: Instagram / Facebook / Story / Banner",
      "קבצי מקור + גרסאות לפי דרישה",
      "חבילות חודשיות זמינות לפי דרישה",
    ],
  },

  // ---------- תמיכה ומוצרים מהירים ----------
  {
    key: "support", group: "תמיכה ומוצרים מהירים", name: "חבילת תמיכה חודשית",
    tagline: "לפי היקף שימוש — בלי הפתעות",
    price: "החל מ-₪350", priceNote: "+מע״מ · לחודש",
    features: [
      "מענה לבעיות, שגיאות ועדכונים קטנים",
      "ניטור תקינות האוטומציות",
      'דו״ח חודשי + זמינות WhatsApp',
      "גמישות — אפשר לשנות בכל עת",
    ],
  },
  {
    key: "lead-bot", group: "תמיכה ומוצרים מהירים", name: "Lead Capture Bot",
    tagline: "לכידת לידים + שמירה ל-CRM אוטומטית",
    price: "החל מ-₪800", priceNote: "+מע״מ", features: [],
  },
  {
    key: "bi", group: "תמיכה ומוצרים מהירים", name: "לוח BI / דשבורד",
    tagline: "לוח ניהול ויזואלי לנתוני העסק בזמן אמת",
    price: "החל מ-₪1,200", priceNote: "+מע״מ", features: [],
  },
  {
    key: "email-auto", group: "תמיכה ומוצרים מהירים", name: "אוטומציית אימייל",
    tagline: "מיון, תגובות, העברות ועדכון CRM",
    price: "החל מ-₪600", priceNote: "+מע״מ", features: [],
  },
  {
    key: "reports", group: "תמיכה ומוצרים מהירים", name: "דוחות אוטומטיים",
    tagline: "PDF / גיליון שבועי/חודשי נשלח אוטומטית",
    price: "החל מ-₪500", priceNote: "+מע״מ", features: [],
  },
  {
    key: "zapier", group: "תמיכה ומוצרים מהירים", name: "חיבורי Zapier/Make",
    tagline: "חיבור בין כלים קיימים ללא קוד",
    price: "החל מ-₪400", priceNote: "+מע״מ", features: [],
  },
];

export const GROUPS = ["מסלולי עבודה", "אוטומציות ומערכות", "אתרים ושיווק", "תמיכה ומוצרים מהירים"];

export const VAT_NOTE =
  'כל המחירים אינם כוללים מע״מ (18%). עלויות כלים ושירותי צד שלישי (WhatsApp Business, ManyChat, Monday.com וכו׳) אינן כלולות — משולמות ישירות ועצמאית.';
