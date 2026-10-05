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

/* =========================================================
   Section Config
========================================================= */

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

/* =========================================================
   Page Data
========================================================= */

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

/* =========================================================
   Home Page Locale Data
========================================================= */

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];

  enableOnePageMode?: boolean;

  researchInterests?: string[];

  pagesToShow: PageData[];
}

/* =========================================================
   Props
========================================================= */

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

/* =========================================================
   Digital Twin Projects
========================================================= */

interface DigitalTwinProject {
  images: string[];
  title: string;
  description: string;
  video: string;
}

const digitalTwinProjects: DigitalTwinProject[] = [
  {
    images: ['/qiuzichen12/85.png'],
    title:
      'Demonstration and Verification Line for Ultra-Large Integrated Die-Casting Forming and Machining Equipment for Lightweight New Energy Vehicle Bodies',
    description:
      'A WebGL-based digital twin system for ultra-large integrated die-casting forming and machining equipment, supporting 3D visualization and real-time data synchronization.',
    video:
      'https://drive.google.com/file/d/1Qa8iQUoelive3W4LtOTyA5elFUs1FBQb/view?usp=sharing',
  },

  {
    images: ['/qiuzichen12/wuzhong.png'],
    title:
      'Research and Application of Machine Tool Health Management Technology',
    description:
      'A Unity3D-based digital twin system for CNC milling equipment, integrating equipment visualization with data-driven and physics-informed fault diagnosis.',
    video:
      'https://drive.google.com/file/d/1Gmv_aZPjh--paDCaWhfGIZ_CwKjAYx93/view?usp=sharing',
  },

  {
    images: [
      '/qiuzichen12/bishe1.png',
      '/qiuzichen12/bishe2.png',
    ],
    title:
      'Research and System Development of Energy and Resource Efficiency Improvement Methods for Sustainable Manufacturing',
    description:
      'A Unity3D-based digital twin system for sustainable manufacturing, integrating virtual scenes, equipment models, and industrial data.',
    video:
      'https://drive.google.com/file/d/13gBxrhYPj7cGgYv8-3fCIu75NBWXF0DB/view?usp=sharing',
  },
];

/* =========================================================
   Digital Twin Projects
   Seamless Infinite Carousel
========================================================= */

function DigitalTwinProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const isPausedRef = useRef(false);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    /*
     * Pixels per second.
     * Increase this value if you want the carousel to move faster.
     */
    const speed = 35;

    const animate = (currentTime: number) => {
      /*
       * First frame
       */
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      /*
       * Calculate elapsed time.
       *
       * Limit it to 50ms so that the carousel does not
       * suddenly jump forward when the browser tab becomes active.
       */
      const deltaTime = Math.min(
        currentTime - lastTimeRef.current,
        50
      );

      lastTimeRef.current = currentTime;

      if (!isPausedRef.current) {
        positionRef.current +=
          speed * (deltaTime / 1000);

        const firstProject =
          track.children[0] as HTMLElement | undefined;

        const secondProject =
          track.children[1] as HTMLElement | undefined;

        /*
         * Once the first card has completely moved out,
         * move it to the end of the track.
         *
         * This creates the seamless infinite-loop effect.
         */
        if (firstProject && secondProject) {
          const firstWidth = firstProject.offsetWidth;

          const styles = window.getComputedStyle(track);

          const gapValue =
            styles.columnGap || styles.gap || '0px';

          const gap = parseFloat(gapValue) || 0;

          const step = firstWidth + gap;

          if (positionRef.current >= step) {
            positionRef.current -= step;

            track.appendChild(firstProject);
          }
        }

        track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    /*
     * Cleanup
     */
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      lastTimeRef.current = null;
      positionRef.current = 0;
    };
  }, []);

  return (
    <section className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Unity3D- and WebGL-Based Digital Twin Projects
        </h2>

        <p className="mt-2 text-muted-foreground">
          Selected projects in digital twin development and
          intelligent manufacturing.
        </p>
      </div>

      {/* Carousel container */}
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
            window.setTimeout(() => {
              isPausedRef.current = false;
            }, 1200);
          }}
        >
          {digitalTwinProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="
                flex-none
                w-[320px]
                sm:w-[360px]
                lg:w-[380px]
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
                transition-shadow
                duration-300
                hover:shadow-lg
              "
            >
              {/* Images */}
              <div className="flex aspect-video overflow-hidden bg-muted">
                {project.images.map(
                  (image, imageIndex) => (
                    <div
                      key={`${image}-${imageIndex}`}
                      className="h-full flex-1 overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${
                          imageIndex + 1
                        }`}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          hover:scale-105
                        "
                        draggable={false}
                      />
                    </div>
                  )
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>

                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4
                    inline-flex
                    items-center
                    text-sm
                    font-medium
                    text-primary
                    hover:underline
                  "
                >
                  ▶ View Project Video
                </a>
              </div>
            </article>
          ))}
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
  const locale = useLocaleStore(
    (state) => state.locale
  );

  /*
   * Get the default language data.
   *
   * If defaultLocale does not exist, use the first
   * available locale as fallback.
   */
  const fallback =
    dataByLocale[defaultLocale] ||
    Object.values(dataByLocale)[0];

  /*
   * Get current locale data.
   *
   * If current locale does not exist, use fallback.
   */
  const data =
    dataByLocale[locale] || fallback;

  /*
   * No valid data
   */
  if (!data) {
    return null;
  }

  return (
    <div
      className="
        min-h-screen
        bg-background
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          gap-12
          lg:grid-cols-3
        "
      >
        {/* =====================================================
            Left Column - Profile
        ===================================================== */}

        <div className="lg:col-span-1">
          <Profile
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={
              data.researchInterests
            }
          />
        </div>

        {/* =====================================================
            Right Column - Page Content
        ===================================================== */}

        <div className="space-y-8 lg:col-span-2">
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
                page.sections.map(
                  (section: SectionConfig) => {
                    switch (section.type) {
                      /* -----------------------------------------
                         Markdown
                      ----------------------------------------- */

                      case 'markdown':
                        return (
                          <div
                            key={section.id}
                            className="space-y-8"
                          >
                            <About
                              content={
                                section.content || ''
                              }
                              title={section.title}
                            />

                            /*
                             * Show Digital Twin Projects
                             * immediately after the About section.
                             */
                            {section.id === 'about' && (
                              <DigitalTwinProjects />
                            )}
                          </div>
                        );

                      /* -----------------------------------------
                         Publications
                      ----------------------------------------- */

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

                      /* -----------------------------------------
                         News / List
                      ----------------------------------------- */

                      case 'list':
                        return (
                          <News
                            key={section.id}
                            items={
                              section.items || []
                            }
                            title={section.title}
                          />
                        );

                      /* -----------------------------------------
                         Unknown section type
                      ----------------------------------------- */

                      default:
                        return null;
                    }
                  }
                )}

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
