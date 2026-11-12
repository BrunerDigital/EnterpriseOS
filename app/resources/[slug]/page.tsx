import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { articles, editorialDate } from "@/lib/editorial";

type Props = { params: Promise<{ slug: string }> };

const articleDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) return {};
  const url = `/resources/${slug}`;
  const images = article.image
    ? [{ url: article.image.src, alt: article.image.alt, width: 1200, height: 628 }]
    : undefined;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt ?? editorialDate,
      authors: ["BrunerDigital"],
      url,
      images,
    },
    ...(images ? { twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images,
    } } : {}),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  const publishedAt = article.publishedAt ?? editorialDate;
  const productResource = article.category === "Digital360";
  const walkthrough = `/demo?utm_source=digital360_resources&utm_medium=owned_content&utm_campaign=digital360_private_walkthrough&utm_content=${article.slug}`;

  return (
    <MarketingShell>
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
          <Link href="/resources" className="underline underline-offset-4">Resources</Link>
          <span aria-hidden="true"> / </span>{article.category}
        </nav>
        <article>
          <header className="border-b border-white/15 pb-8">
            <p className="mt-8 text-sm font-semibold text-emerald-300">
              {article.category} · By BrunerDigital · <time dateTime={publishedAt}>{articleDateFormat.format(new Date(publishedAt))}</time>
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{article.description}</p>
          </header>
          {article.image && (
            <Image src={article.image.src} alt={article.image.alt} width={1200} height={628}
              sizes="(max-width: 896px) 100vw, 848px" className="mt-8 h-auto w-full rounded-xl border border-white/15" />
          )}
          {article.sections.map(section => (
            <section key={section.title} className="mt-10">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph} className="mt-4 text-base leading-8 text-slate-300">{paragraph}</p>
              ))}
            </section>
          ))}
          {article.sources && (
            <section className="mt-10 border-t border-white/15 pt-6">
              <h2 className="text-xl font-semibold">Further reading</h2>
              <ul className="mt-4 space-y-3">
                {article.sources.map(source => (
                  <li key={source.url}><a className="text-emerald-300 underline underline-offset-4" href={source.url}>{source.label}</a></li>
                ))}
              </ul>
            </section>
          )}
        </article>
        <aside className="mt-12 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-6">
          <h2 className="text-xl font-semibold">{productResource ? "Bring one workflow to a walkthrough." : "Make the next step clear."}</h2>
          <p className="mt-3 leading-7 text-slate-300">
            {productResource
              ? "See how Digital360 handles a sample workflow and discuss what your team would need for a private evaluation."
              : `Discuss a scoped ${article.service} engagement or explore the related BrunerDigital services. Digital360 software availability is documented separately.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            {productResource
              ? <Link href={walkthrough} className="font-semibold underline underline-offset-4">Request a walkthrough</Link>
              : <Link href="/brunerdigital" className="font-semibold underline underline-offset-4">Explore the services</Link>}
            <Link href="/launch-status" className="underline underline-offset-4">Software availability</Link>
          </div>
        </aside>
      </main>
    </MarketingShell>
  );
}
