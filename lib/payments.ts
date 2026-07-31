/**
 * lib/payments.ts — תשלומים דרך Grow (משולם).
 *
 * ההחלטה: כל תשלום בפורטל מוביל ללינק תשלום של Grow.
 * המימוש בשלב חיבור הנתונים:
 *   - לכל פריט בתשלום (חשבונית / מקדמה / סבב נוסף / תוספת / משימה / בנק שעות)
 *     נשמר לינק Grow בעמודת "קישור" של תת-הפריט ב-Monday.
 *   - כפתור תשלום בפורטל פותח את הלינק. אחרי תשלום מסמנים "שולם" ב-Monday
 *     (ידנית או דרך webhook של Grow אם נחבר בהמשך).
 *   - תחזוקה חודשית: הוראת קבע דרך Grow, אותו עיקרון.
 *
 * לעולם לא שומרים פרטי כרטיס אצלנו. הכול אצל Grow.
 */

export function growLinkFor(subitemLink: string | null): string | null {
  return subitemLink && subitemLink.trim() !== "" ? subitemLink : null;
}
