import type { Metadata } from 'next'
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import './globals.css'
import { domainConfig } from '@/config/domain';

const headingFont = localFont({
  src: "../public/fonts/SCDream4.otf"
});

export const metadata: Metadata = {
  title: {
    default: domainConfig.name,
    template: `%s | ${domainConfig.name}`
  },
  description: domainConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg"
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("h-full", headingFont.className)}>{children}</body>
    </html>
  );
}
