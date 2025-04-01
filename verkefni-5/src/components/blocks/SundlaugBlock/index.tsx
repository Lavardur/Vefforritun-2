import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';

export const SundlaugBlockFragment = graphql(
  /* GraphQL */ `
    fragment SundlaugBlockFragment on SundlaugBlockRecord {
      title
      image {
        title
        responsiveImage(sizes: "(max-width: 700px) 100vw, 700px") {
          ...ResponsiveImageFragment
        }
      }
      sundlaugLink {
        ... on SundlaugRecord {
          address
          slug
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof SundlaugBlockFragment>;
};

export default function SundlaugBlock({ data }: Props) {
  // Read unmasked data from fragment
  const unmaskedData = readFragment(SundlaugBlockFragment, data);

  return (
    <figure>
      {/* Display title */}
      <h2>{unmaskedData.title}</h2>
      {/* Display address */}
      <h3>{unmaskedData.sundlaugLink?.address}</h3>
      {/* Display sundlaug link */}
      {unmaskedData.sundlaugLink && (
        <a href={`/sundlaug/${unmaskedData.sundlaugLink.slug}`} className="pill">
          {'Skoða nánar'}
        </a>
      )}
      {/* Display responsive image */}
      <ResponsiveImage data={unmaskedData.image.responsiveImage} />
    </figure>
  );
}
