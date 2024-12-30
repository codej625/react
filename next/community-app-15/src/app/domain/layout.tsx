import type { Metadata } from "next";
import "./domain.module.css";

export const metadata: Metadata = {
  title: "domain",
  description: "domain page",
};

export default function DomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
