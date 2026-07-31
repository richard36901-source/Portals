/* eslint-disable @next/next/no-img-element */

// הלוגו הרשמי (public/logo.png) בתוך אריח לבן מעוגל — בכל הגדלים.
export default function Logo({ size = 38, radius }: { size?: number; radius?: number }) {
  return (
    <div className="logo" style={{ width: size, height: size, borderRadius: radius ?? Math.round(size * 0.29) }}>
      <img src="/logo.png" alt="AutoScale" />
    </div>
  );
}
