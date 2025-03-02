"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/shared/ui"
import { Slider } from "@/shared/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { Separator } from "@/shared/ui"
import { Badge } from "@/shared/ui"
import { Switch } from "@/shared/ui"
import { Label } from "@/shared/ui"
import { api } from "@/shared/api"

type Product = {
  id: string
  name: string
  price: number
  count: number
  category: string
  image: string
  date: string // Изменено с Date на string
}

const generateProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<any[]>("https://api-hack.energy-cerber.ru/product/")
    console.log("Data fetched successfully:", response.data)

    // Преобразуем данные с сервера в тип Product
    const products = response.data.map((item) => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      count: item.count,
      category: item.category,
      image: item.image || "https://placehold.co/300", // Заглушка для изображения
      date: item.created_at, // Используем created_at как date
    }))

    return products
  } catch (error) {
    console.error("Error fetching data:", error)
    return [] // Return empty array instead of throwing error
  }
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [showFilters, setShowFilters] = useState(true)

  // Фильтры
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [quantityRange, setQuantityRange] = useState<[number, number]>([0, 50])
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "price-asc" | "price-desc">("newest")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await generateProducts() // Вызываем функцию и ждем результат
        setProducts(data) // Обновляем состояние products
        setFilteredProducts(data) // Инициализируем filteredProducts
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error)
      }
    }

    loadProducts() // Вызываем функцию загрузки
    setMounted(true) // Устанавливаем mounted в true
  }, [])

  // Применение фильтров
  useEffect(() => {
    let filtered = [...products]

    // Фильтр по цене
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Фильтр по количеству
    filtered = filtered.filter((product) => product.count >= quantityRange[0] && product.count <= quantityRange[1])

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    console.log("Filtered products", filteredProducts)

    // Сортировка
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(filtered)
  }, [products, priceRange, quantityRange, sortBy, selectedCategories])

  // Получение уникальных категорий
  const categories = [...new Set(products.map((product) => product.category))]

  // Обработчик выбора категории
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Сброс фильтров
  const resetFilters = () => {
    setPriceRange([0, 10000])
    setQuantityRange([0, 50])
    setSortBy("newest")
    setSelectedCategories([])
  }

  // Обработчик изменения диапазона цены
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  // Обработчик изменения диапазона количества
  const handleQuantityRangeChange = (value: number[]) => {
    setQuantityRange([value[0], value[1]])
  }

  if (!mounted) return null

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Цена</h3>
        <div className="space-y-4">
          <Slider value={priceRange} min={0} max={10000} step={100} onValueChange={handlePriceRangeChange} />
          <div className="flex justify-between text-sm">
            <span>{priceRange[0]} ₽</span>
            <span>{priceRange[1]} ₽</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-2">Количество</h3>
        <div className="space-y-4">
          <Slider value={quantityRange} min={0} max={50} step={1} onValueChange={handleQuantityRangeChange} />
          <div className="flex justify-between text-sm">
            <span>{quantityRange[0]} шт.</span>
            <span>{quantityRange[1]} шт.</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-2">Категории</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Switch
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                id={`category-${category}`}
              />
              <Label htmlFor={`category-${category}`} className="ml-2">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Button onClick={resetFilters} variant="outline" className="w-full">
        Сбросить фильтры
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen pb-10">
      <main className="container mx-auto px-4 mt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Десктопные фильтры */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Фильтры</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <FilterControls />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold">Товары</h2>
                <p className="text-muted-foreground">Найдено {filteredProducts.length} товаров</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    // Приводим значение к типу "newest" | "oldest" | "price-asc" | "price-desc"
                    if (value === "newest" || value === "oldest" || value === "price-asc" || value === "price-desc") {
                      setSortBy(value)
                    }
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                    <SelectItem value="oldest">Сначала старые</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Выбранные фильтры */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(category)} />
                  </Badge>
                ))}

                <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="text-xs h-7">
                  Очистить все
                </Button>
              </div>
            )}

            {/* Сетка товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="wait">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: (index * 0.05) % 0.5, // Limit delay to prevent too long animations
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    layout
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-lg overflow-hidden border shadow-sm"
                  >
                    {/* Keep the existing product content */}
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="aspect-square relative overflow-hidden bg-muted">
                        <img
                          src={`https://api-hack.energy-cerber.ru/static/product_images/${product.id}.webp`}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{product.name}</h3>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-lg">{product.price} ₽</p>
                          <p className="text-sm text-muted-foreground">{product.count} шт.</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Добавлен: {new Date(product.date).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
                <Button onClick={resetFilters} variant="outline" className="mt-4">
                  Сбросить фильтры
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}