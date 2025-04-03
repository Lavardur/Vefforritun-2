import DraftModeToggler from '@/components/DraftModeToggler';
import ThemeToggler from '@/components/ThemeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { toNextMetadata } from 'react-datocms';

import './global.scss';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Sundlaugar </h1>
            <DraftModeToggler draftModeEnabled={draftMode().isEnabled} />
            <ThemeToggler />
          </div>
          <nav>
            <Link className="navlink" href="/">
              🔧 Forsíða
            </Link>
            <a className="navlink" href="/sundlaugar">
              🏊‍♂️ Sundlaugar
            </a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
