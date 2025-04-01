import ImageBlock, { ImageBlockFragment } from '@/components/blocks/ImageBlock';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
        content {
          ... on ImageBlockRecord {
            ...ImageBlockFragment
          }
        }
      }
    }
  `,
  [TagFragment, ImageBlockFragment],
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

        {/* Display the image if it exists */}
        {sundlaug.content && (
          <div className="sundlaug-image">
            <ImageBlock data={sundlaug.content} />
          </div>
        )}

        <div className="info-item">
          <h3>Staðsetning</h3>
          <p>{sundlaug.address}</p>
        </div>

        {sundlaug.email && (
          <div className="info-item">
            <h3>Netfang</h3>
            <p><a href={`mailto:${sundlaug.email}`}>{sundlaug.email}</a></p>
          </div>
        )}

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
