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
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

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
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

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

const digitalTwinProjects = [
  {
    image: '/85.png',
    title: 'WebGL Digital Twin for Die-Casting Equipment',
    description:
      'A WebGL-based digital twin system for ultra-large integrated die-casting and machining equipment, supporting 3D visualization and real-time data synchronization.',
  },
  {
    image: '/wuzhong.png',
    title: 'CNC Milling Digital Twin',
    description:
      'A Unity3D-based digital twin for CNC milling equipment, integrating equipment visualization with data-driven and physics-informed fault diagnosis.',
  },
  {
    image: '/bishe1.png',
    title: 'Intelligent Production Line Digital Twin',
    description:
      'A Unity3D-based digital twin for an intelligent production line, enabling immersive 3D visualization and cyber–physical interaction.',
  },
  {
    image: '/bishe2.png',
    title: 'Digital Twin System',
    description:
      'A 3D digital twin system integrating virtual scenes, equipment models, and real-time industrial data for manufacturing applications.',
  },
];

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
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
            <section key={page.id} id={page.id} className="scroll-mt-24 space-y-8">
              {page.type === 'about' &&
                page.sections.map((section: SectionConfig) => {
                  switch (section.type) {
                    case 'markdown':
                      return (
                        <div key={section.id} className="space-y-8">
                          <About
                            content={section.content || ''}
                            title={section.title}
                          />

                          {section.id === 'about' && (
                            <section className="space-y-5">
                              <div>
                                <h2 className="text-2xl font-semibold tracking-tight">
                                  Digital Twin Projects
                                </h2>
                                <p className="text-muted-foreground mt-2">
                                  Selected projects in digital twin development and intelligent manufacturing.
                                </p>
                              </div>

                              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                                {digitalTwinProjects.map((project) => (
                                  <article
                                    key={project.title}
                                    className="flex-none w-[320px] sm:w-[360px] snap-start rounded-xl border bg-card overflow-hidden"
                                  >
                                    <div className="aspect-video overflow-hidden bg-muted">
                                      <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>

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
                          )}
                        </div>
                      );

                    case 'publications':
                      return (
                        <SelectedPublications
                          key={section.id}
                          publications={section.publications || []}
                          title={section.title}
                          enableOnePageMode={data.enableOnePageMode}
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
                })}

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
