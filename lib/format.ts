// עזרי תצוגה משותפים לפורטל.

export function money(n: number | string | null | undefined): string {
  if (n == null || n === "") return "₪0";
  return "₪" + Math.round(Number(n)).toLocaleString("en-US");
}

export function hebDate(d: string | null | undefined): string {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long" }).format(new Date(d));
  } catch {
    return String(d);
  }
}
