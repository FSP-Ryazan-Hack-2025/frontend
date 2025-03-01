"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

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
  const isInView = useInView(ref, { once: true})

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
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Проблема и Решение */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="mb-8 text-center text-4xl font-bold">Проблема и Решение</h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1} className="p-6 rounded-lg border border-blue-500 dark:border-white">
              <h2 className="mb-6 text-2xl font-semibold">Проблема:</h2>
              <div className="relative border-l-2 border-blue-500 dark:border-white pl-6">
                <div className="mb-4">
                  <p className="mb-2">
                    Самозанятые, ИП и малый бизнес сталкиваются с трудностями в продвижении своих товаров и услуг на локальном рынке. 
                    Отсутствие доступных и эффективных инструментов делает их продукты менее заметными для потенциальных клиентов.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">
                    Популярные платформы, такие как Авито, не обеспечивают официального подтверждения статуса продавца, что снижает 
                    доверие покупателей и увеличивает риски нелегальных сделок.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">
                  Крупные маркетплейсы, например, Wildberries, предлагают сложные условия для входа и высокие комиссии, что делает 
                их недоступными для большинства малых предприятий и самозанятых.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="p-6 rounded-lg border border-blue-500 dark:border-white">
              <h2 className="mb-6 text-2xl font-semibold">Решение:</h2>
              <div className="relative border-l-2 border-blue-500 dark:border-white pl-6">
                <div className="mb-4">
                  <p className="mb-2">
                    Мы создаем специализированное приложение для самозанятых, ИП и ООО, которое сочетает в себе удобство популярных 
                    маркетплейсов, таких как Авито, с официальным подтверждением статуса предпринимателя.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">
                    Это решение обеспечит покупателям уверенность в легальности сделок, защиту их прав, 
                    а продавцам — простой и доступный способ продвижения своих товаров и услуг без лишних сложностей.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">
                    Ожидаемый результат: Укрепление местной экономики, рост продаж для малого бизнеса и удобный доступ к качественным 
                    товарам и услугам для покупателей.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="mb-8 text-center text-4xl font-bold">Преимущества нашего решения</h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1} className="p-6 rounded-lg border border-blue-500 dark:border-white">
              <h2 className="mb-6 text-2xl font-semibold text-center">Бизнес</h2>
              <div className="relative border-l-2 border-blue-500 dark:border-white pl-6">
                <div className="mb-4">
                  <p className="mb-2">Расширение рынка сбыта для местных производителей.</p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Увеличение узнаваемости брендов.</p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Создание новых рабочих мест.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="p-6 rounded-lg border border-blue-500 dark:border-white">
              <h2 className="mb-6 text-2xl font-semibold text-center">Жители</h2>
              <div className="relative border-l-2 border-blue-500 dark:border-white pl-6">
                <div className="mb-4">
                  <p className="mb-2">Удобный доступ к широкому ассортименту товаров.</p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Безопасные транзакции с использованием современных технологий.</p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Возможность оценки и отзыва о товарах и услугах.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="p-6 rounded-lg border border-blue-500 dark:border-white">
              <h2 className="mb-6 text-2xl font-semibold text-center">Регион</h2>
              <div className="relative border-l-2 border-blue-500 dark:border-white pl-6">
                <div className="mb-4">
                  <p className="mb-2">Развитие цифровой экономики региона.</p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Анализ данных для дальнейшего развития платформы.</p>
                </div>
                <div className="mb-4">
                  <p className="mb-2">Повышение инвестиционной привлекательности.</p>
                </div>
              </div>
            </AnimatedSection>
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