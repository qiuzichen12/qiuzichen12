```tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TextPageConfig } from '@/types/page';

interface TextPageProps {
    config: TextPageConfig;
    content: string;
    embedded?: boolean;
}

export default function TextPage({
    config,
    content,
    embedded = false,
}: TextPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={embedded ? '' : 'max-w-3xl mx-auto'}
        >
            <h1
                className={`${
                    embedded ? 'text-2xl' : 'text-4xl'
                } font-serif font-bold text-primary mb-4`}
            >
                {config.title}
            </h1>

            {config.description && (
                <p
                    className={`${
                        embedded ? 'text-base' : 'text-lg'
                    } text-neutral-600 dark:text-neutral-500 mb-8 max-w-2xl`}
                >
                    {config.description}
                </p>
            )}

            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">
                                {children}
                            </h1>
                        ),

                        h2: ({ children }) => (
                            <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                                {children}
                            </h2>
                        ),

                        h3: ({ children }) => {
                            const getText = (
                                child: React.ReactNode
                            ): string => {
                                if (
                                    typeof child === 'string' ||
                                    typeof child === 'number'
                                ) {
                                    return String(child);
                                }

                                if (Array.isArray(child)) {
                                    return child.map(getText).join('');
                                }

                                if (React.isValidElement(child)) {
                                    return getText(child.props.children);
                                }

                                return '';
                            };

                            const headingText = getText(children);
                            const parts = headingText.split('|||');

                            // Left content + right date
                            if (parts.length === 2) {
                                return (
                                    <div className="flex w-full items-baseline justify-between gap-4 mt-6 mb-3">
                                        <h3 className="min-w-0 flex-1 text-xl font-semibold text-primary">
                                            {children}
                                        </h3>

                                        <span className="ml-auto shrink-0 whitespace-nowrap text-right text-sm text-neutral-600 dark:text-neutral-500">
                                            {parts[1].trim()}
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">
                                    {children}
                                </h3>
                            );
                        },

                        p: ({ children }) => (
                            <p className="mb-4 last:mb-0">
                                {children}
                            </p>
                        ),

                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-4 pl-0 ml-0 space-y-1">
                                {children}
                            </ul>
                        ),

                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-4 pl-0 ml-0 space-y-4">
                                {children}
                            </ol>
                        ),

                        li: ({ children }) => {
                            const getText = (
                                child: React.ReactNode
                            ): string => {
                                if (
                                    typeof child === 'string' ||
                                    typeof child === 'number'
                                ) {
                                    return String(child);
                                }

                                if (Array.isArray(child)) {
                                    return child.map(getText).join('');
                                }

                                if (React.isValidElement(child)) {
                                    return getText(child.props.children);
                                }

                                return '';
                            };

                            const listItemText = getText(children);
                            const parts = listItemText.split('|||');

                            // Left content + right year/date
                            if (parts.length === 2) {
                                return (
                                    <li className="list-none mb-2 pl-0 ml-0">
                                        <div className="flex w-full items-baseline justify-between gap-4">
                                            <span className="min-w-0 flex-1">
                                                {parts[0].trim()}
                                            </span>

                                            <span className="ml-auto shrink-0 whitespace-nowrap text-right text-sm text-neutral-600 dark:text-neutral-500">
                                                {parts[1].trim()}
                                            </span>
                                        </div>
                                    </li>
                                );
                            }

                            return (
                                <li className="mb-1 pl-0 ml-0">
                                    {children}
                                </li>
                            );
                        },

                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            />
                        ),

                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),

                        strong: ({ children }) => (
                            <strong className="font-semibold text-primary">
                                {children}
                            </strong>
                        ),

                        em: ({ children }) => (
                            <em className="italic text-neutral-600 dark:text-neutral-500">
                                {children}
                            </em>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
}
```

然后你的 Honors 保持这样：

```markdown
## HONORS & PRIZES

- Baosteel Excellent Student Scholarship ||| **2025**
- Hong Kong, Macao and Overseas Chinese Student Scholarship (Grand Prize) ||| **2025**
- China Undergraduate Mechanical Engineering Innovation and Creative Competition, National Second Prize ||| **November 2022**
- Excellent Completion Award, National Undergraduate Innovation and Entrepreneurship Program project, *Automated Fuel Cell Assembly Enabled by a Collaborative Robot*
```

这样修改后，**不要再改 `ol` 的 `list-inside`**。你的 `1. 2. 3.` 和 `•` 都会保持在正文左边界以内。
