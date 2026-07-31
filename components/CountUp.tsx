// המספר מוצג מיד בערכו המלא (בלי ספירה מ-0), עם כניסה עדינה של עלייה ושקיפות.
// כשמחברים את Monday, הערך יגיע מהלוח והקומפוננטה נשארת אותו דבר.
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  return (
    <span className="numin">
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
