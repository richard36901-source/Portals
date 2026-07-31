/**
 * lib/monday.ts — מקור האמת של הפורטל.
 *
 * מודל הנתונים ב-Monday (לוח אחד, הכול במקום אחד):
 *   לוח "פורטל לקוחות" ← פריט (שורה) = פרויקט ← תת-פריטים = כל השאר.
 *   כל תת-פריט מסווג בעמודת "סוג" (dropdown): משימה / חשבונית / סבב תיקונים /
 *   אבן דרך / מדריך / גישה / קובץ / הפניה / תוספת.
 *   צ'אט + עדכונים = ה-Updates של פריט הפרויקט עצמו.
 *
 * הטוקן חי רק בצד השרת (process.env) — אין לייבא קובץ זה לקומפוננטות client.
 */

const MONDAY_API_URL = "https://api.monday.com/v2";

// ---- מיפוי עמודות -------------------------------------------------------
// לוח "פורטל לקוחות": 18424611751 · לוח תת-הפריטים: 18424612238
// ה-IDs נלקחו מהלוח האמיתי שהוקם ב-Monday (workspace AutoScalehq.io).

export const SUBITEMS_BOARD_ID = "18424612238";

export const PROJECT_COLUMNS = {
  client: "text_mm5s7sn6",          // לקוח (שם חברה)
  teamEmails: "text_mm5s3s76",      // אימיילים של חברי צוות, מופרדים בפסיק
  status: "color_mm5sxb26",         // סטטוס פרויקט
  progress: "numeric_mm5s53d7",     // % התקדמות
  phase: "text_mm5svtcx",           // שלב (למשל "2/3")
  deadline: "date_mm5swahg",        // דדליין מקורי
  updatedDeadline: "date_mm5sxqr2", // דדליין מעודכן
  delayNote: "long_text_mm5sa4g1",  // הערת עיכוב
  budget: "numeric_mm5s63sq",       // תקציב
  paid: "numeric_mm5sncxd",         // שולם עד כה
  roundsIncluded: "numeric_mm5syhk7",   // סבבים כלולים (ברירת מחדל 2)
  roundsUsed: "numeric_mm5svnhn",       // סבבים בשימוש
  extraRoundPrice: "numeric_mm5sq9zp",  // מחיר סבב נוסף
} as const;

export const SUBITEM_COLUMNS = {
  type: "dropdown_mm5s2ezd",   // סוג: משימה/חשבונית/סבב תיקונים/אבן דרך/מדריך/גישה/קובץ/הפניה/תוספת
  status: "color_mm5sp95c",    // סטטוס לפי סוג (אושר/ממתין/דורש תשלום/שולם/לחתימה...)
  amount: "numeric_mm5s5x1k",  // סכום ₪ (חשבונית/משימה בתשלום/עמלה)
  date: "date_mm5s1yjt",       // תאריך (יעד/הועלה/שולם)
  link: "link_mm5svvvv",       // קישור (וידאו מדריך/CMS/קובץ)
  details: "long_text_mm5s2wwg", // פרטים חופשיים (הערות, שם משתמש, מספר סבב...)
  shared: "boolean_mm5sead4",  // מדריך: מתג שיתוף-לצוות
} as const;

export const SUBITEM_TYPES = {
  task: "משימה",
  invoice: "חשבונית",
  revisionRound: "סבב תיקונים",
  milestone: "אבן דרך",
  tutorial: "מדריך",
  access: "גישה",
  file: "קובץ",
  referral: "הפניה",
  addon: "תוספת",
} as const;

export type SubitemType = (typeof SUBITEM_TYPES)[keyof typeof SUBITEM_TYPES];

// ---- קריאה בסיסית ל-API --------------------------------------------------

export async function mondayQuery<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const token = process.env.MONDAY_API_TOKEN;
  if (!token) throw new Error("MONDAY_API_TOKEN חסר ב-.env.local");

  const res = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": "2024-10",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(`Monday API: ${JSON.stringify(json.errors)}`);
  return json.data as T;
}

export function getBoardId(): string {
  const id = process.env.MONDAY_BOARD_ID;
  if (!id) throw new Error("MONDAY_BOARD_ID חסר ב-.env.local");
  return id;
}

// ---- טיפוסים -------------------------------------------------------------

export interface ColumnValue {
  id: string;
  text: string | null;
  value: string | null;
}

export interface MondaySubitem {
  id: string;
  name: string;
  column_values: ColumnValue[];
}

export interface MondayProject {
  id: string;
  name: string;
  column_values: ColumnValue[];
  subitems: MondaySubitem[];
}

export interface MondayUpdate {
  id: string;
  body: string;
  text_body: string;
  created_at: string;
  creator: { name: string } | null;
}

// ---- שליפות --------------------------------------------------------------

/** סכימת הלוח — להרצה חד-פעמית כדי למלא את מיפויי העמודות למעלה. */
export async function getBoardSchema() {
  return mondayQuery(
    `query ($board: [ID!]) {
      boards(ids: $board) {
        id name
        columns { id title type }
      }
    }`,
    { board: [getBoardId()] }
  );
}

/** כל הפרויקטים בלוח (לבחירת פרויקט אחרי התחברות). */
export async function listProjects(): Promise<MondayProject[]> {
  const data = await mondayQuery<{ boards: { items_page: { items: MondayProject[] } }[] }>(
    `query ($board: [ID!]) {
      boards(ids: $board) {
        items_page(limit: 100) {
          items {
            id name
            column_values { id text value }
            subitems { id name column_values { id text value } }
          }
        }
      }
    }`,
    { board: [getBoardId()] }
  );
  return data.boards[0]?.items_page.items ?? [];
}

/** פרויקט בודד לפי מזהה פריט, כולל כל תת-הפריטים. */
export async function getProject(itemId: string): Promise<MondayProject | null> {
  const data = await mondayQuery<{ items: MondayProject[] }>(
    `query ($ids: [ID!]) {
      items(ids: $ids) {
        id name
        column_values { id text value }
        subitems { id name column_values { id text value } }
      }
    }`,
    { ids: [itemId] }
  );
  return data.items[0] ?? null;
}

/** הפרויקטים של משתמש לפי אימייל (עמודת teamEmails מכילה את האימייל). */
export async function listProjectsForUser(email: string): Promise<MondayProject[]> {
  const all = await listProjects();
  const needle = email.trim().toLowerCase();
  return all.filter((p) =>
    (columnText(p, PROJECT_COLUMNS.teamEmails) ?? "")
      .toLowerCase()
      .split(/[,;\s]+/)
      .includes(needle)
  );
}

/** תת-פריטים מסוננים לפי סוג (משימות בלבד, חשבוניות בלבד וכו'). */
export function subitemsOfType(project: MondayProject, type: SubitemType): MondaySubitem[] {
  return project.subitems.filter(
    (s) => s.column_values.find((c) => c.id === SUBITEM_COLUMNS.type)?.text === type
  );
}

/** צ'אט + עדכונים: ה-Updates של פריט הפרויקט. */
export async function getUpdates(itemId: string): Promise<MondayUpdate[]> {
  const data = await mondayQuery<{ items: { updates: MondayUpdate[] }[] }>(
    `query ($ids: [ID!]) {
      items(ids: $ids) {
        updates(limit: 100) {
          id body text_body created_at
          creator { name }
        }
      }
    }`,
    { ids: [itemId] }
  );
  return data.items[0]?.updates ?? [];
}

// ---- כתיבה ---------------------------------------------------------------

/** שליחת הודעת צ'אט: נכתבת כ-Update על פריט הפרויקט (מסונכרן ל-Monday). */
export async function postUpdate(itemId: string, body: string) {
  return mondayQuery(
    `mutation ($item: ID!, $body: String!) {
      create_update(item_id: $item, body: $body) { id }
    }`,
    { item: itemId, body }
  );
}

/** יצירת תת-פריט חדש — למשל בקשת משימה או הפניה שהלקוח שלח מהפורטל. */
export async function createSubitem(
  parentItemId: string,
  name: string,
  type: SubitemType,
  columns: Record<string, unknown> = {}
) {
  return mondayQuery(
    `mutation ($parent: ID!, $name: String!, $cols: JSON) {
      create_subitem(parent_item_id: $parent, item_name: $name, column_values: $cols) { id }
    }`,
    {
      parent: parentItemId,
      name,
      cols: JSON.stringify({ [SUBITEM_COLUMNS.type]: { labels: [type] }, ...columns }),
    }
  );
}

/** עדכון עמודה בפריט/תת-פריט (למשל סטטוס משימה אחרי תשלום). */
export async function changeColumnValue(boardId: string, itemId: string, columnId: string, value: unknown) {
  return mondayQuery(
    `mutation ($board: ID!, $item: ID!, $col: String!, $val: JSON!) {
      change_column_value(board_id: $board, item_id: $item, column_id: $col, value: $val) { id }
    }`,
    { board: boardId, item: itemId, col: columnId, val: JSON.stringify(value) }
  );
}

// ---- עזרי קריאה ----------------------------------------------------------

export function columnText(entity: { column_values: ColumnValue[] }, columnId: string): string | null {
  return entity.column_values.find((c) => c.id === columnId)?.text ?? null;
}

export function columnNumber(entity: { column_values: ColumnValue[] }, columnId: string): number | null {
  const t = columnText(entity, columnId);
  if (t == null || t === "") return null;
  const n = Number(t.replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}
