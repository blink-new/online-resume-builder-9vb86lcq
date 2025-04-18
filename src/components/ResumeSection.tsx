
import React, { ReactNode } from "react";

export function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold mb-3 tracking-wide font-serif border-b border-neutral-300 dark:border-neutral-700 pb-1">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}