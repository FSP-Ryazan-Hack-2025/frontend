"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  BriefcaseBusiness,
  LaptopMinimalIcon as LaptopMinimalCheck,
  ShieldCheck,
  Tablet,
  TvIcon as TvMinimal,
} from "lucide-react"
import { Card, CardContent } from "@/shared/ui"

const technologies = [
  {
    category: "Фронтенд",
    items: [
      {
        name: "Next.js",
        description: "Производительный фреймворк для React, идеально подходящий для продакшн-приложений",
      },
      {
        name: "TypeScript",
        description: "Расширение JavaScript с строгой типизацией, значительно улучшающее опыт разработки",
      },
      {
        name: "TailwindCSS",
        description: "Утилитарный CSS-фреймворк для быстрого и удобного создания интерфейсов",
      },
      {
        name: "React Hook Form",
        description: "Высокопроизводительные и гибкие формы с простой валидацией",
      },
      {
        name: "Zustand",
        description: "Компактное, быстрое и масштабируемое управление состоянием без лишней сложности",
      },
      {
        name: "Axios",
        description: "Эффективный HTTP-клиент с поддержкой промисов для браузера и Node.js",
      },
      {
        name: "shadcn/ui",
        description: "Готовые элегантные UI-компоненты, созданные на базе Radix UI и Tailwind CSS",
      },
    ],
  },
  {
    category: "Бэкенд",
    items: [
      {
        name: "Python",
        description: "Гибкий и мощный язык программирования для веб-разработки и анализа данных",
      },
      {
        name: "PostgreSQL",
        description: "Надёжная и масштабируемая объектно-реляционная СУБД с открытым исходным кодом",
      },
      {
        name: "FastAPI",
        description: "Современный и высокопроизводительный фреймворк для создания API на Python",
      },
    ],
  },
]

const projectFeatures = [
  {
    title: "Официальное подтверждение статуса продавца",
    description:
      "Каждый продавец проходит проверку, что гарантирует легальность и прозрачность всех сделок. Покупатели могут быть уверены в надежности партнеров.",
    icon: <BadgeCheck className="h-8 w-8 text-primary" />,
  },
  {
    title: "Удобный и интуитивно понятный интерфейс",
    description:
      "Простота использования, как на популярных маркетплейсах, делает процесс продажи и покупки легким и приятным.",
    icon: <TvMinimal className="h-8 w-8 text-primary" />,
  },
  {
    title: "Поддержка для самозанятых, ИП и малого бизнеса",
    description:
      "Мы создаем условия, которые помогают предпринимателям сосредоточиться на развитии бизнеса, а не на бюрократии.",
    icon: <BriefcaseBusiness className="h-8 w-8 text-primary" />,
  },
  {
    title: "Безопасность и прозрачность",
    description:
      "Все сделки защищены, а данные пользователей надежно хранятся. Мы заботимся о вашей конфиденциальности и безопасности.",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
  },
  {
    title: "Мобильность и доступность",
    description:
      "Платформа доступна с любого устройства, чтобы вы могли управля��ь своим бизнесом и совершать покупки в любое время и в любом месте.",
    icon: <Tablet className="h-8 w-8 text-primary" />,
  },
  {
    title: "Поддержка 24/7",
    description: "Наша команда всегда готова помочь вам с любыми вопросами и решить возникающие проблемы.",
    icon: <LaptopMinimalCheck className="h-8 w-8 text-primary" />,
  },
]

const TechnologyItem = ({
  name,
  description,
  index,
}: {
  name: string
  description: string
  index: number
}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center">
        <div className="mr-4 h-3 w-3 rounded-full bg-blue-500 dark:bg-white"></div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Компонент для анимированного появления элементов
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Секция с особенностями проекта */}
      <section id="features" className="w-full bg-muted/50 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Особенности нашего проекта</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Мы создаем платформу, которая делает жизнь проще, а бизнес — успешнее
              </p>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2" ref={ref}>
            {projectFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={controls}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                    <p className="flex-grow text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Технологический стек */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-center text-4xl font-bold">Наш технологический стек</h1>
          <div className="flex flex-col gap-12 md:flex-row">
            {technologies.map((category) => (
              <div key={category.category} className="flex-1">
                <h2 className="mb-6 text-2xl font-semibold">{category.category}</h2>
                <div className="relative border-l-2 border-blue-500 dark:border-white pl-6">
                  {category.items.map((tech, index) => (
                    <TechnologyItem key={tech.name} name={tech.name} description={tech.description} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Связаться с нами</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Мы всегда рады ответить на ваши вопросы и помочь вам.
              </p>
            </div>
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-blue-500 dark:text-white" />
                  <p className="text-sm">г. Рязань, ул. Примерная, 123</p>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-blue-500 dark:text-white" />
                  <p className="text-sm">info@example.ru</p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-blue-500 dark:text-white" />
                  <p className="text-sm">+7 (900) 123-45-67</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}