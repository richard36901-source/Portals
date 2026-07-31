"use client";

import { useState } from "react";

export default function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return <div className={on ? "toggle on" : "toggle"} onClick={() => setOn(!on)} />;
}
