'use client';

import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import {
  CardPageConfig,
  PublicationPageConfig,
  TextPageConfig,
} from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useEffect, useRef } from 'react';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
}

type PageData =
  | {
      type: 'about';
      id: string;
      sections: SectionConfig[];
    }
  | {
      type: 'publication';
      id: string;
      config: PublicationPageConfig;
      publications: Publication[];
    }
  | {
      type: 'text';
      id: string;
      config: TextPageConfig;
      content: string;
    }
  | {
      type: 'card';
      id: string;
      config: CardPageConfig;
    };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

/* =========================================================
   Digital Twin Projects
   ========================================================= */

const digitalTwinProjects = [
  {
    image: '/qiuzichen12/85.png',
    title:
      'Demonstration and Verification Line for Ultra-Large Integrated Die-Casting Forming and Machining Equipment for Lightweight New Energy Vehicle Bodies',
    description:
      'A WebGL-based digital twin system for ultra-large integrated die-casting forming and machining equipment, supporting 3D visualization and real-time data synchronization.',
  },
  {
    image: '/qiuzichen12/wuzhong.png',
    title:
      'Research and Application of Machine Tool Health Management Technology',
    description:
      'A Unity3D-based digital twin system for CNC milling equipment, integrating equipment visualization with data-driven and physics-informed fault diagnosis.',
  },
  {
    image: '/qiuzichen12/bishe1.png',
    title:
      'Research and System Development of Energy and Resource Efficiency Improvement Methods for Sustainable Manufacturing',
    description:
      'A Unity3D-based digital twin system for intelligent manufacturing, enabling 3D visualization and cyber–physical interaction.',
  },
  {
    image: '/qiuzichen12/bishe2.png',
    title:
      'Research and System Development of Energy and Resource Efficiency Improvement Methods for Sustainable Manufacturing',
    description:
      'A Unity3D-based digital twin system for sustainable manufacturing, integrating virtual scenes, equipment models, and industrial data.',
  },
];

function DigitalTwinProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    // Scrolling speed
    const speed = 0.15;

    const animate = () => {
      if (!isPausedRef.current) {
        container.scrollLeft += speed;

        const maxScrollLeft =
          container.scrollWidth - container.clientWidth;

        // Stop when reaching the final project
        if (container.scrollLeft >= maxScrollLeft) {
          container.scrollLeft = maxScrollLeft;

          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
          }

          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="space-y-5">
      {/* Section title */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Digital Twin Projects
        </h2>

        <p className="text-muted-foreground mt-2">
          Selected projects in digital twin development and intelligent
          manufacturing.
        </p>
      </div>

      {/* Project carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
        onTouchStart={() => {
          isPausedRef.current = true;
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            isPausedRef.current = false;
          }, 1500);
        }}
      >
        {digitalTwinProjects.map((project, index) => (
          <article
            key={`${project.title}-${index}`}
            className="flex-none w-[320px] sm:w-[360px] rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {/* Project image */}
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Project information */}
            <div className="p-5">
              <h3 className="text-lg font-semibold leading-snug">
                {project.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   Home Page
   ========================================================= */

export default function HomePageClient({
  dataByLocale,
  defaultLocale,
}: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);

  const fallback =
    dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];

  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* =================================================
            Left Column - Profile
            ================================================= */}
        <div className="lg:col-span-1">
          <Profile
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={data.researchInterests}
          />
        </div>

        {/* =================================================
            Right Column - Main Content
            ================================================= */}
        <div className="lg:col-span-2 space-y-8">
          {data.pagesToShow.map((page) => (
            <section
              key={page.id}
              id={page.id}
              className="scroll-mt-24 space-y-8"
            >
              {/* =================================================
                  About Page
                  ================================================= */}
              {page.type === 'about' &&
                page.sections.map((section: SectionConfig) => {
                  switch (section.type) {
                    /* -----------------------------------------
                       Markdown / About
                       ----------------------------------------- */
                    case 'markdown':
                      return (
                        <div
                          key={section.id}
                          className="space-y-8"
                        >
                          <About
                            content={section.content || ''}
                            title={section.title}
                          />

                          {/* Digital Twin Projects */}
                          {section.id === 'about' && (
                            <DigitalTwinProjects />
                          )}
                        </div>
                      );

                    /* -----------------------------------------
                       Selected Publications
                       ----------------------------------------- */
                    case 'publications':
                      return (
                        <SelectedPublications
                          key={section.id}
                          publications={section.publications || []}
                          title={section.title}
                          enableOnePageMode={data.enableOnePageMode}
                        />
                      );

                    /* -----------------------------------------
                       News
                       ----------------------------------------- */
                    case 'list':
                      return (
                        <News
                          key={section.id}
                          items={section.items || []}
                          title={section.title}
                        />
                      );

                    default:
                      return null;
                  }
                })}

              {/* =================================================
                  Publication Page
                  ================================================= */}
              {page.type === 'publication' && (
                <PublicationsList
                  config={page.config}
                  publications={page.publications}
                  embedded={true}
                />
              )}

              {/* =================================================
                  Text Page
                  ================================================= */}
              {page.type === 'text' && (
                <TextPage
                  config={page.config}
                  content={page.content}
                  embedded={true}
                />
              )}

              {/* =================================================
                  Card Page
                  ================================================= */}
              {page.type === 'card' && (
                <CardPage
                  config={page.config}
                  embedded={true}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

