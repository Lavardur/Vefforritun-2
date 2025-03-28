import Link from 'next/link';

export const metadata = {
  title: 'Home | Tech Starter Kit',
};

export default function Page() {
  return (
    <>
      <h1>Vefforritun 2, 2025, verkefni 5: Next.js og CMS kerfi</h1>
      <p>Verkefnið snýst um að setja upp Next.js framenda fyrir headless CMS kerfi.</p>

      <h2>Markmið</h2>
      <ul>
      <li>Uppsetning og notkun á <a href="https://nextjs.org/">Next.js</a>.</li>
      <li>Notkun á headless CMS kerfi eða álíka.</li>
      <li>Hýsing með Vercel.</li>
      </ul>

      <h2>Virkni</h2>
      <p>Verkefnið er viljandi opið og ekki mikið skilgreint. Það er í lagi að einhver skörun sé við einstaklingsverkefni.</p>

      <h3>Next.js</h3>
      <p>Setja skal upp Next.js verkefni sem notar:</p>
      <ul>
      <li><a href="https://www.typescriptlang.org/">TypeScript</a>.</li>
      <li>App router.</li>
      <li>Sass fyrir CSS.</li>
      </ul>

      <h3>Headless CMS kerfi</h3>
      <p>Setja skal upp headless CMS kerfi eða álíka, t.d.:</p>
      <ul>
      <li><a href="https://www.datocms.com/">DatoCMS</a>. Við munum vinna gunnvinnu með DatoCMS í fyrirlestri.</li>
      <li><a href="https://prismic.io/">Prismic</a>.</li>
      <li><a href="https://www.contentful.com/">Contentful</a>.</li>
      <li><a href="https://www.sanity.io/">Sanity</a>.</li>
      <li><a href="https://strapi.io/">Strapi</a>.</li>
      <li><a href="https://graphcms.com/">GraphCMS</a>.</li>
      </ul>
      <p>Uppfylla þarf eftirfarandi kröfur:</p>
      <ul>
      <li>Forsíða með efni sem hægt er að breyta í kerfinu. Að minnsta kosti titill og texti.</li>
      <li>Síða með lista af efni sem hægt er að breyta í kerfinu, t.d. frétta– eða greinalisti.</li>
      <li>Stakar síður með efni sem hægt er að breyta í kerfinu, t.d. stök frétt eða grein. Að minnsta kosti titill og texti.</li>
      </ul>
      <p>Æskilegt er að finna kennsluefni (tutorial) fyrir valið kerfi og fylgja því að einhverju leiti. T.d. <a href="https://github.com/vercel/next.js/tree/canary/examples">er mikið af dæmum á Next.js GitHub</a>. Athugið samt að einhver dæmin nota pages router ekki app router.</p>

      <h3>Viðmót</h3>
      <p>Útbúa skal einfalt viðmót sem uppfyllir kröfur um virkni.</p>

      <h3>GitHub og hýsing</h3>
      <ul>
      <li>Setja skal upp vefinn á Vercel gegnum GitHub.</li>
      <li>Setja skal upp vefinn á Vercel.</li>
      </ul>

      <h2>Mat</h2>
      <ul>
      <li>40% — Next.js uppsetning með TypeScript, app router og Sass.</li>
      <li>40% — Headless CMS kerfi notað og uppfyllir kröfur.</li>
      <li>10% — Viðmót.</li>
      <li>10% — GitHub og Hýsing.</li>
      </ul>

      <h2>Sett fyrir</h2>
      <p>Verkefni sett fyrir í fyrirlestri miðvikudaginn 19. mars 2025.</p>

      <h2>Skil</h2>
      <p>Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 3. apríl 2025.</p>
      <p>Skil skulu innihalda:</p>
      <ul>
      <li>Slóð á verkefni keyrandi.</li>
      <li>Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:</li>
      <ul>
        <li><code>osk</code></li>
        <li><code>ofurtumi</code></li>
        <li><code>tomasblaer</code></li>
      </ul>
      </ul>

      <h2>Einkunn</h2>
      <p>Leyfilegt er að ræða, og vinna saman að verkefni en <strong>skrifið ykkar eigin lausn</strong>. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.</p>
      <p>Ef stórt mállíkan (LLM, „gervigreind“, t.d. ChatGTP) er notað til að skrifa part af lausn skal taka það fram. <a href="https://gervigreind.hi.is/">Sjá nánar á upplýsingasíða um gervigreind hjá HÍ</a>.</p>
      <p>Sett verða fyrir (<a href="https://github.com/vefforritun/vef2-2025/blob/main/namsefni/01.kynning/1.kynning.md">sjá nánar í kynningu á áfanga</a>):</p>
      <ul>
      <li>fimm minni sem gilda 10% hvert, samtals 50% af lokaeinkunn.</li>
      <li>tvö hópverkefni þar sem hvort um sig gildir 20%, samtals 40% af lokaeinkunn.</li>
      <li>einstaklingsverkefni sem gildir 15–25% af lokaeinkunn.</li>
      </ul>
    </>
  );
}
