
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

/* =========================================================
   Digital Twin Projects - Infinite Carousel
   ========================================================= */

function DigitalTwinProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    // Scrolling speed
    const speed = 0.15;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPausedRef.current) {
        container.scrollLeft +=
          speed * (deltaTime / 16.67);

        const maxScrollLeft =
          container.scrollWidth -
          container.clientWidth;

        /*
         * When reaching the end,
         * smoothly restart from the beginning.
         */
        if (
          maxScrollLeft > 0 &&
          container.scrollLeft >= maxScrollLeft
        ) {
          container.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(
          animationRef.current
        );
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
          Selected projects in digital twin development and
          intelligent manufacturing.
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
        {digitalTwinProjects.map(
          (project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="
                flex-none
                w-[380px]
                sm:w-[420px]
                rounded-xl

