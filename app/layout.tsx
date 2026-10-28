import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Чайхана — восточная кухня',
  description: 'Ароматный плов, лагман, манты и шашлык на углях. Меню чайханы.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
