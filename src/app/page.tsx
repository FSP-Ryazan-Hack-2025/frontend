'use client';

import { withAuth } from '@/shared/hoc';
import { Button, Card, CardContent } from '@/shared/ui';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Code, Globe, Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function Home() {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    const projectFeatures = [
        {
            title: 'Социальное воздействие',
            description:
                'Наш проект направлен на решение важных общественных проблем и улучшение качества жизни людей.',
            icon: <Heart className='h-8 w-8 text-primary' />
        },
        {
            title: 'Открытость и доступность',
            description:
                'Наша платформа разработана с учетом потребностей всех пользователей, обеспечивая легкий доступ к информации.',
            icon: <Globe className='h-8 w-8 text-primary' />
        },
        {
            title: 'Современные технологии',
            description:
                'Проект построен на передовом стеке технологий, обеспечивая высокую производительность и масштабируемость.',
            icon: <Code className='h-8 w-8 text-primary' />
        }
    ];

    return (
        <>
            <section className='w-full bg-background py-12 md:py-24'>
                <div className='container px-4 md:px-6'>
                    <div className='flex flex-col items-center space-y-4 text-center'>
                        <motion.div
                            className='space-y-2'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                                Инновационное решение для общества
                            </h1>
                            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
                                Мы создаем технологии, которые делают жизнь
                                людей лучше и решают важные социальные задачи.
                            </p>
                        </motion.div>
                        <motion.div
                            className='flex flex-col gap-4 sm:flex-row'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Button asChild size='lg'>
                                <Link href='/about'>
                                    Узнать больше{' '}
                                    <ArrowRight className='ml-2 h-4 w-4' />
                                </Link>
                            </Button>
                            <Button variant='outline' size='lg'>
                                <Link href='/sign-up'>
                                    Присоединиться к проекту
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Секция с особенностями проекта */}
            <section
                id='features'
                className='w-full bg-muted/50 py-12 md:py-24'
            >
                <div className='container px-4 md:px-6'>
                    <motion.div
                        className='flex flex-col items-center justify-center space-y-4 text-center'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='space-y-2'>
                            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                                Особенности нашего проекта
                            </h2>
                            <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
                                Мы стремимся создать платформу, которая
                                действительно меняет жизнь к лучшему.
                            </p>
                        </div>
                    </motion.div>

                    <div
                        className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'
                        ref={ref}
                    >
                        {projectFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                initial='hidden'
                                animate={controls}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2
                                }}
                            >
                                <Card className='h-full transition-all hover:shadow-lg'>
                                    <CardContent className='flex h-full flex-col p-6'>
                                        <div className='mb-4'>
                                            {feature.icon}
                                        </div>
                                        <h3 className='mb-2 text-xl font-bold'>
                                            {feature.title}
                                        </h3>
                                        <p className='flex-grow text-muted-foreground'>
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Секция "О проекте" */}
            <section className='w-full py-12 md:py-24'>
                <div className='container px-4 md:px-6'>
                    <motion.div
                        className='flex flex-col items-center space-y-4 text-center'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                            О нашем проекте
                        </h2>
                        <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
                            Мы стремимся создать платформу, которая объединяет
                            людей и ресурсы для решения важных социальных задач.
                            Наша цель - сделать информацию доступной, а
                            взаимодействие - простым и эффективным.
                        </p>
                        <Button asChild>
                            <Link href='/about'>Узнать больше о нас</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Призыв к действию */}
            <section className='w-full bg-primary py-12 text-primary-foreground md:py-24'>
                <motion.div
                    className='container flex flex-col items-center px-4 text-center md:px-6'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='mb-4 text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                        Присоединяйтесь к нам
                    </h2>
                    <p className='mx-auto mb-6 max-w-[700px] text-primary-foreground/80 md:text-xl'>
                        Вместе мы можем сделать мир лучше. Ваш вклад имеет
                        значение.
                    </p>
                    <Button size='lg' variant='secondary' asChild>
                        <Link href='/sign-up'>Стать частью проекта</Link>
                    </Button>
                </motion.div>
            </section>
        </>
    );
}

export default withAuth(Home);
