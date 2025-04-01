import { executeQuery } from '@/lib/datocms/executeQuery';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
const query = graphql(
  /* GraphQL */ `
    query SundlaugQuery($slug: String!) {
      sundlaug(filter: { slug: { eq: $slug } }) {
        _seoMetaTags {
          ...TagFragment
        }
        title
        address
        email
      }
    }
  `,[TagFragment,],
);

export default async function SundlaugPage({ params }: { params: { slug: string } }) {
  const { isEnabled: isDraftModeEnabled } = draftMode();

  // Validate the slug parameter
  if (!params?.slug) {
    notFound();
  }

  try {
    const { sundlaug } = await executeQuery(query, {
      variables: { slug: params.slug },
      includeDrafts: isDraftModeEnabled,
    });

    if (!sundlaug) {
      notFound();
    }

    return (
      <div className="sundlaug-detail">
        <h1>{sundlaug.title}</h1>
        
        <div className="info-item">
          <h3>Staðsetning</h3>
          <p>{sundlaug.address}</p>
        </div>

        <div className="back-link">
          <Link href="/sundlaugar">← Til baka í sundlaugalista</Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching sundlaug data:', error);
    notFound();
  }
}