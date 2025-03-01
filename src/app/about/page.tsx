'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const technologies = [
    {
        category: 'Фронтенд',
        items: [
            {
                name: 'Next.js',
                description:
                    'Производительный фреймворк для React, идеально подходящий для продакшн-приложений'
            },
            {
                name: 'TypeScript',
                description:
                    'Расширение JavaScript с строгой типизацией, значительно улучшающее опыт разработки'
            },
            {
                name: 'TailwindCSS',
                description:
                    'Утилитарный CSS-фреймворк для быстрого и удобного создания интерфейсов'
            },
            {
                name: 'React Hook Form',
                description:
                    'Высокопроизводительные и гибкие формы с простой валидацией'
            },
            {
                name: 'Zustand',
                description:
                    'Компактное, быстрое и масштабируемое управление состоянием без лишней сложности'
            },
            {
                name: 'Axios',
                description:
                    'Эффективный HTTP-клиент с поддержкой промисов для браузера и Node.js'
            },
            {
                name: 'shadcn/ui',
                description:
                    'Готовые элегантные UI-компоненты, созданные на базе Radix UI и Tailwind CSS'
            }
        ]
    },
    {
        category: 'Бэкенд',
        items: [
            {
                name: 'Python',
                description:
                    'Гибкий и мощный язык программирования для веб-разработки и анализа данных'
            },
            {
                name: 'PostgreSQL',
                description:
                    'Надёжная и масштабируемая объектно-реляционная СУБД с открытым исходным кодом'
            },
            {
                name: 'FastAPI',
                description:
                    'Современный и высокопроизводительный фреймворк для создания API на Python'
            }
        ]
    }
];

const TechnologyItem = ({
    name,
    description,
    index
}: {
    name: string;
    description: string;
    index: number;
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={controls}
            variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='mb-4'
        >
            <div className='flex items-center'>
                <div className='mr-4 h-3 w-3 rounded-full bg-primary'></div>
                <div>
                    <h3 className='text-lg font-semibold'>{name}</h3>
                    <p className='text-sm text-muted-foreground'>
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function About() {
    return (
        <div className='container mx-auto px-4 py-12'>
            <h1 className='mb-8 text-center text-4xl font-bold'>
                Наш технологический стек
            </h1>
            <div className='flex flex-col gap-12 md:flex-row'>
                {technologies.map(category => (
                    <div key={category.category} className='flex-1'>
                        <h2 className='mb-6 text-2xl font-semibold'>
                            {category.category}
                        </h2>
                        <div className='relative border-l-2 border-primary pl-6'>
                            {category.items.map((tech, index) => (
                                <TechnologyItem
                                    key={tech.name}
                                    name={tech.name}
                                    description={tech.description}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
