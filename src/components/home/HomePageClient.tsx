
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
    type: 'single' as const,
    image: '/qiuzichen12/85.png',
    title:
      'Demonstration and Verification Line for Ultra-Large Integrated Die-Casting Forming and Machining Equipment for Lightweight New Energy Vehicle Bodies',
    description:
      'A WebGL-based digital twin system for ultra-large integrated die-casting forming and machining equipment, supporting 3D visualization and real-time data synchronization.',
    videoUrl:
      'https://drive.google.com/file/d/1Qa8iQUoelive3W4LtOTyA5elFUs1FBQb/view?usp=sharing',
    videoLabel: 'Play Video',
  },

  {
    type: 'single' as const,
    image: '/qiuzichen12/wuzhong.png',
    title:
      'Research and Application of Machine Tool Health Management Technology',
    description:
      'A Unity3D-based digital twin system for CNC milling equipment, integrating equipment visualization with data-driven and physics-informed fault diagnosis.',
    videoUrl:
      'https://drive.google.com/file/d/1Gmv_aZPjh--paDCaWhfGIZ_CwKjAYx93/view?usp=sharing',
    videoLabel: 'Play Video',
  },

  {
    type: 'double' as const,
    images: [
      '/qiuzichen12/bishe1.png',
      '/qiuzichen12/bishe2.png',
    ],
    title:
      'Research and System Development of Energy and Resource Efficiency Improvement Methods for Sustainable Manufacturing',
    description:
      'A Unity3D-based digital twin system for sustainable manufacturing, integrating virtual scenes, equipment models, and industrial data to support 3D visualization and cyber–physical interaction.',
    videoUrl:
      'https://drive.google.com/file/d/13gBxrhYPj7cGgYv8-3fCIu75NBWXF0DB/view?usp=sharing',
    videoLabel: 'Play Video',
  },
];

/* =========================================================
   Digital Twin Projects - Seamless Infinite Carousel
   ========================================================= */

function DigitalTwinProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const isPausedRef = useRef(false);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const speed = 35;

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = Math.min(
        currentTime - lastTimeRef.current,
        50
      );

      lastTimeRef.current = currentTime;

      if (!isPausedRef.current) {
        positionRef.current += speed * (deltaTime / 1000);

        const firstProject =
          track.children[0] as HTMLElement | undefined;

        if (firstProject) {
          const gap = parseFloat(
            window.getComputedStyle(track).gap || '0'
          );

          const step = firstProject.offsetWidth + gap;

          if (positionRef.current >= step) {
            positionRef.current -= step;
            track.appendChild(firstProject);
          }

          track.style.transform =
            `translate3d(-${positionRef.current}px, 0, 0)`;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = null;
      lastTimeRef.current = null;
    };
  }, []);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Unity3D- and WebGL-Based Digital Twin Projects
        </h2>

        <p className="mt-2 text-muted-foreground">
          Selected projects in digital twin development and
          intelligent manufacturing.
        </p>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
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
            isPausedRef.current = false;
          }}
        >
          {digitalTwinProjects.map((project, index) => {
            /*
             * -----------------------------------------------------
             * Normal project
             * -----------------------------------------------------
             */
            if (project.type === 'single') {
              return (
                <article
                  key={`${project.type}-${index}`}
                  className="
                    flex-none
                    w-[320px]
                    sm:w-[360px]
                    lg:w-[380px]
                    rounded-xl
                    border
                    bg-card
                    overflow-hidden
                    shadow-sm
                    hover:shadow-lg
                    transition-shadow
                    duration-300
                  "
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-105
                      "
                    />
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Video */}
                    <div className="mt-4">
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-medium
                          text-primary
                          hover:underline
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>

                        {project.videoLabel}
                      </a>
                    </div>
                  </div>
                </article>
              );
            }

            /*
             * -----------------------------------------------------
             * Bishe project - two images in one wide card
             * -----------------------------------------------------
             */
            return (
              <article
                key={`${project.type}-${index}`}
                className="
                  flex-none
                  w-[640px]
                  sm:w-[720px]
                  lg:w-[760px]
                  rounded-xl
                  border
                  bg-card
                  overflow-hidden
                  shadow-sm
                  hover:shadow-lg
                  transition-shadow
                  duration-300
                "
              >
                {/* =================================================
                    Two Images
                   ================================================= */}
                <div className="grid grid-cols-2 gap-1 bg-muted">
                  {project.images.map((image, imageIndex) => (
                    <div
                      key={image}
                      className="
                        aspect-video
                        overflow-hidden
                      "
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${
                          imageIndex + 1
                        }`}
                        loading="lazy"
                        decoding="async"
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          hover:scale-105
                        "
                      />
                    </div>
                  ))}
                </div>

                {/* =================================================
                    One shared project description
                   ================================================= */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Video */}
                  <div className="mt-4">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-primary
                        hover:underline
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>

                      {project.videoLabel}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
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
    dataByLocale[defaultLocale] ||
    Object.values(dataByLocale)[0];

  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <Profile
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={data.researchInterests}
          />
        </div>

        <div className="lg:col-span-2 space-y-8">
          {data.pagesToShow.map((page) => (
            <section
              key={page.id}
              id={page.id}
              className="scroll-mt-24 space-y-8"
            >
              {page.type === 'about' &&
                page.sections.map(
                  (section: SectionConfig) => {
                    switch (section.type) {
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

                            {section.id === 'about' && (
                              <DigitalTwinProjects />
                            )}
                          </div>
                        );

                      case 'publications':
                        return (
                          <SelectedPublications
                            key={section.id}
                            publications={
                              section.publications || []
                            }
                            title={section.title}
                            enableOnePageMode={
                              data.enableOnePageMode
                            }
                          />
                        );

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
                  }
                )}

              {page.type === 'publication' && (
                <PublicationsList
                  config={page.config}
                  publications={page.publications}
                  embedded={true}
                />
              )}

              {page.type === 'text' && (
                <TextPage
                  config={page.config}
                  content={page.content}
                  embedded={true}
                />
              )}

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

