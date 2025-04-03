import ImageBlock, { ImageBlockFragment } from '@/components/blocks/ImageBlock';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '@/styles/SundlaugDetail.module.scss';

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
        description
        afgreidslutimi
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
      <div className={styles.sundlaugDetail}>
        <div className={styles.backLink}>
          <Link href="/sundlaugar">← Til baka í sundlaugalista</Link>
        </div>
        
        <h1>{sundlaug.title}</h1>

        {/* Display the image if it exists */}
        {sundlaug.content && (
          <div className={styles.imageContainer}>
            <ImageBlock data={sundlaug.content} />
          </div>
        )}

        <div className={styles.infoItem}>
          <h3>Staðsetning</h3>
          <p>{sundlaug.address}</p>
        </div>

        {sundlaug.email && (
          <div className={styles.infoItem}>
            <h3>Netfang</h3>
            <p><a href={`mailto:${sundlaug.email}`}>{sundlaug.email}</a></p>
          </div>
        )}

        {sundlaug.description && (
          <div className="sundlaug-description">
            <h3>Lýsing</h3>
            <div dangerouslySetInnerHTML={{ __html: sundlaug.description }} />
          </div>
        )}

        {sundlaug.afgreidslutimi && (
          <div className="sundlaug-afgreidslutimi">
            <h3>Afgreiðslutími</h3>
            <div dangerouslySetInnerHTML={{ __html: sundlaug.afgreidslutimi }} />
          </div>
        )}

      </div>
    );
  } catch (error) {
    console.error('Error fetching sundlaug data:', error);
    notFound();
  }
}
