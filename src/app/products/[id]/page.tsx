"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Heart, Share2, Truck, ShieldCheck, RefreshCw, Minus, Plus } from "lucide-react"

import { Button } from "@/shared/ui"
import { Separator } from "@/shared/ui"
import { Badge } from "@/shared/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui"
import { api } from "@/shared/api"

type Product = {
  id: number
  name: string
  price: number
  count: number
  description: string
  seller_inn: number
  category: string
  created_at: string
  transactions: {
    id: string
    seller_inn: string
    buyer_id: number
    buy_count: number
    product_id: number
    amount: number
    created_at: string
  }[]
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  // Функция для загрузки данных о товаре
  const fetchProduct = async () => {
    try {
      const response = await api.get<Product>(`https://api-hack.energy-cerber.ru/product/${params.id}`)
      console.log("Product data fetched successfully:", response.data)
      setProduct(response.data)
    } catch (error) {
      console.error("Error fetching product data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const incrementQuantity = () => {
    if (product && quantity < product.count) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка товара...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <p className="text-muted-foreground mb-6">К сожалению, запрашиваемый товар не существует или был удален.</p>
          <Button onClick={() => router.push("/")}>Вернуться на главную</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <Button variant="ghost" className="mb-6 pl-0" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к товарам
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Изображение товара */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-muted rounded-lg overflow-hidden"
        >
          <img
            src= {`https://api-hack.energy-cerber.ru/static/product_images/${product.id}.webp`}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
          />
        </motion.div>

        {/* Информация о товаре */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-muted-foreground">
                  Артикул: {product.id}P{product.id * 1000}
                </p>
                <p className="text-muted-foreground">•</p>
                <p className="text-muted-foreground">В наличии: {product.count} шт.</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-3xl font-bold">{product.price} ₽</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="font-medium mb-2">Описание</h2>
            <p className="text-muted-foreground">
              {product.description ||
                `Подробное описание товара "${product.name}". Здесь представлены все характеристики и особенности данного продукта. Товар высокого качества, произведен с использованием современных технологий и материалов.`}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.count}
                className="h-10 w-10 rounded-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Добавить в корзину
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10">
              <Heart className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Доставка</p>
                <p className="text-xs text-muted-foreground">1-3 рабочих дня</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Гарантия</p>
                <p className="text-xs text-muted-foreground">12 месяцев</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Возврат</p>
                <p className="text-xs text-muted-foreground">14 дней</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Описание</TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div className="space-y-2">
                {product.description}
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="pt-4">
              <div className="space-y-4">
                <p>Доставка осуществляется следующими способами:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Курьерская доставка по городу - 300 ₽</li>
                  <li>Самовывоз из магазина - бесплатно</li>
                  <li>Почта России - от 250 ₽</li>
                  <li>СДЭК - от 350 ₽</li>
                </ul>
                <p>Срок доставки зависит от выбранного способа и обычно составляет 1-5 рабочих дней.</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">У этого товара пока нет отзывов</p>
                <Button variant="outline">Оставить отзыв</Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.1,
                }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-lg overflow-hidden border shadow-sm"
              >
                <Link href={`/products/${relatedProduct.id}`}>
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <Badge variant="outline">{relatedProduct.category}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg">{relatedProduct.price} ₽</p>
                      <p className="text-sm text-muted-foreground">{relatedProduct.count} шт.</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

