import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email AI Agent',
  description: 'AI-powered email assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900">{children}</body>
    </html>
  );
}
