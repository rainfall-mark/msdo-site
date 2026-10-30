import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { InterestDialog } from "@/components/ui/interest-dialog";

// MSDO fork: media items can also be a live embed (iframe), used by the
// Rainfall Studio case study to show the working Ask The Two Robbies app.
export interface CaseStudyMediaEmbed {
  src: string;
  title: string;
  ratio?: string;
  /** MSDO fork: below md, show this image as a tap-to-open link instead of a cramped iframe. */
  mobileFallback?: { image: string; alt: string; label?: string };
}
export interface CaseStudyMediaLink { href: string; label: string; }
// MSDO fork: a looping, muted screen recording (used by the Lab case studies).
export interface CaseStudyMediaVideo { src: string; /** Optional WebM fallback for browsers without H.264. */ webm?: string; poster?: string; title: string; width?: number; height?: number; /** Always show playback controls (for longer walkthroughs viewers may want to scrub). */ controls?: boolean; }
/** MSDO fork: a prominent call to action under a media item, e.g. "Try the live app". */
export interface CaseStudyMediaCta { href: string; label: string; note?: string; }
/** MSDO fork: lead capture under a media item ("Want to try it for yourself?" + name/email dialog). */
export interface CaseStudyMediaInterest { project: string; heading?: string; buttonLabel?: string; intro?: string; }
export interface CaseStudyMediaItem { src?: string; alt?: string; caption?: string; width?: number; height?: number; link?: CaseStudyMediaLink; embed?: CaseStudyMediaEmbed; video?: CaseStudyMediaVideo; cta?: CaseStudyMediaCta; interest?: CaseStudyMediaInterest; }
export interface CaseStudyMediaGroup { heading: string; description?: string; items: CaseStudyMediaItem[]; }
interface CaseStudyMediaSectionProps { id?: string; label?: string; heading?: string; items?: CaseStudyMediaItem[]; groups?: CaseStudyMediaGroup[]; }

/**
 * @ployComponent
 * @ployComponentId case-study-media-section
 * @ployComponentType section
 * @ployComponentPattern media
 * @ployComponentDescription Natural-height project-media section that supports one continuous image stack or titled media chapters with short descriptions, a consistent single-column layout, and no artificial framing.
 * @ployComponentTags case-study media imagery gallery studio editorial
 * @ployComponentStatus stable
 */
export default function CaseStudyMediaSection({ id, label, heading, items = [], groups = [] }: CaseStudyMediaSectionProps) {
  if (!items.length && !groups.length) return null;

  const renderItems = (mediaItems: CaseStudyMediaItem[]) => (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {mediaItems.map((item, index) => (
        <Reveal key={`${item.src ?? item.embed?.src ?? item.video?.src}-${index}`}>
          <figure>
            {item.video ? (
              <LoopVideo video={item.video} />
            ) : item.embed ? (
              <LazyEmbed embed={item.embed} />
            ) : (
              <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" className="block h-auto w-full rounded-xl" />
            )}
            {(item.caption || item.link) && (
              <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-ploy-text-secondary">
                {item.caption}
                {item.link && (
                  <>
                    {item.caption ? " " : null}
                    <a href={item.link.href} target="_blank" rel="noreferrer" className="text-ploy-text-primary underline underline-offset-4">{item.link.label}</a>
                  </>
                )}
              </figcaption>
            )}
            {item.cta && (
              <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
                <a href={item.cta.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ploy-button-primary-background px-6 text-base font-medium text-ploy-button-primary-text transition-transform duration-300 hover:scale-[1.03] sm:min-h-14 sm:px-8 sm:text-lg">
                  {item.cta.label}
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                {item.cta.note && <span className="text-sm text-ploy-text-secondary">{item.cta.note}</span>}
              </div>
            )}
            {item.interest && <InterestDialog {...item.interest} />}
          </figure>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section id={id} className="cs-media scroll-mt-24 bg-ploy-background-primary py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        {(label || heading) && (
          <Reveal className="mb-10 max-w-3xl">
            {label && <p className="text-sm text-ploy-text-secondary">{label}</p>}
            {heading && <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.045em] text-ploy-text-primary sm:text-6xl">{heading}</h2>}
          </Reveal>
        )}

        {groups.length > 0 ? (
          <div className="space-y-24 sm:space-y-32 lg:space-y-40">
            {groups.map((group) => (
              <div key={group.heading}>
                <Reveal className="mb-8 grid gap-4 border-t border-ploy-border-primary pt-6 md:grid-cols-[.8fr_1.2fr] md:gap-12">
                  <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-ploy-text-primary sm:text-4xl">{group.heading}</h2>
                  {group.description && <p className="max-w-xl text-base leading-relaxed text-ploy-text-secondary md:justify-self-end">{group.description}</p>}
                </Reveal>
                {renderItems(group.items)}
              </div>
            ))}
          </div>
        ) : renderItems(items)}
      </div>
    </section>
  );
}

/** How long the embed waits, after settling into view, before it starts. */
const START_DELAY_MS = 700;

/**
 * MSDO fork: an embed that only mounts its iframe once it scrolls into view,
 * so a self-playing demo does not run while it is still off screen.
 */
function LazyEmbed({ embed }: { embed: CaseStudyMediaEmbed }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }
    // Wait a beat after the frame settles into view, so the demo starts once
    // the reader has arrived rather than mid-scroll. Leaving view cancels it.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && timer === undefined) {
          timer = setTimeout(() => {
            setInView(true);
            observer.disconnect();
          }, START_DELAY_MS);
        } else if (!visible && timer !== undefined) {
          clearTimeout(timer);
          timer = undefined;
        }
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );
    observer.observe(node);
    return () => {
      if (timer !== undefined) clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const fallback = embed.mobileFallback;

  return (
    <>
    {fallback && (
      <a href={embed.src} target="_blank" rel="noreferrer" aria-label={fallback.label ?? "Open the demo in a new tab"} className="group block md:hidden">
        <img src={fallback.image} alt={fallback.alt} loading="lazy" decoding="async" className="block h-auto w-full rounded-xl" />
      </a>
    )}
    <div ref={frameRef} className={`w-full overflow-hidden rounded-xl p-[5%] ${fallback ? "hidden md:block" : ""}`} style={{ aspectRatio: embed.ratio ?? "16 / 10", backgroundColor: "#18191D" }}>
      {inView ? (
        <iframe src={embed.src} title={embed.title} className="block h-full w-full rounded-lg border-0" allow="autoplay" />
      ) : (
        <div className="h-full w-full rounded-lg" aria-hidden="true" />
      )}
    </div>
    </>
  );
}

/**
 * MSDO fork: a muted, looping screen recording that only plays while on screen,
 * so it costs nothing until the reader reaches it. Respects reduced motion by
 * showing the poster with controls instead of autoplaying.
 */
function LoopVideo({ video }: { video: CaseStudyMediaVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      queueMicrotask(() => setReducedMotion(true));
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      node.play().catch(() => undefined);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) node.play().catch(() => undefined);
          else node.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={video.poster}
      width={video.width}
      height={video.height}
      title={video.title}
      aria-label={video.title}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reducedMotion || video.controls}
      className="block h-auto w-full rounded-xl border border-ploy-border-primary bg-ploy-background-secondary"
    >
      <source src={video.src} type="video/mp4" />
      {video.webm && <source src={video.webm} type="video/webm" />}
    </video>
  );
}
