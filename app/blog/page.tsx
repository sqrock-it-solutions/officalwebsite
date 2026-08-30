// app/blog/page.tsx
import BlogContent from '@/components/blogs/BlogContent'
import BlogHero from '@/components/blogs/bloghero'
import { getPublishedBlogs, getPopularPosts, getCategoriesWithCount } from './actions'
import { Suspense } from 'react'

// Loading component
function BlogSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full aspect-[4/3] bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-gray-50 rounded-2xl p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-5"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>
}) {
  const params = await searchParams
  
  const page = parseInt(params.page || '1')
  const search = params.search || ''
  const categorySlug = params.category || 'all'

  // Fetch data in parallel
  const [blogsResult, popularPosts, categories] = await Promise.all([
    getPublishedBlogs({
      page,
      limit: 6,
      search,
      categorySlug,
    }),
    getPopularPosts(3),
    getCategoriesWithCount(),
  ])

  return (
    <div>
      <BlogHero />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent
          initialPosts={blogsResult.blogs}
          initialPopularPosts={popularPosts}
          initialCategories={categories as any}
          initialTotalPages={blogsResult.totalPages}
          initialCurrentPage={page}
          initialSearch={search}
          initialCategorySlug={categorySlug}
        />
      </Suspense>
    </div>
  )
}