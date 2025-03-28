import DraftModeToggler from '@/components/DraftModeToggler';
import ThemeToggler from '@/components/ThemeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import './global.css';

const query = graphql(
  /* GraphQL */ `
    query query {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment],
);

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Vefforritun 2, 2025, verkefni 5: Next.js og CMS kerfi</h1>
            <ThemeToggler />
          </div>
          <nav>
            <a className="navlink" href="/basic">
              🔧 Forsíða
            </a>
            <a className="navlink" href="/real-time-updates">
              ⚡️ Sundlaugar
            </a>
            
          </nav>
          <DraftModeToggler draftModeEnabled={draftMode().isEnabled} />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
