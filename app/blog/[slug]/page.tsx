// app/blog/[slug]/page.tsx
import { getBlogBySlug, getRelatedBlogs } from "./actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react";
import { format } from "date-fns";

// Types
interface Category {
  id: string;
  name: string;
  color?: string | null;
}

interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  shortDescription?: string | null;
  featuredImage?: string | null;
  author?: string | null;
  categoryId: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

interface BlogWithCategory {
  blog: Blog;
  category: Category | null;
}

interface RelatedBlogItem {
  blog: Blog;
  category: Category | null;
}

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  try {
    const { slug } = await params;
    const blogData = await getBlogBySlug(slug);
    
    if (!blogData) {
      return {
        title: "Blog Not Found",
      };
    }

    const { blog } = blogData;

    return {
      title: blog.title,
      description: blog.shortDescription || blog.content.substring(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.shortDescription || blog.content.substring(0, 160),
        images: blog.featuredImage ? [blog.featuredImage] : [],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: "Blog",
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  console.log("Fetching blog with slug:", slug);
  
  const blogData = await getBlogBySlug(slug);
  
  console.log("Blog data received:", blogData ? "Found" : "Not found");

  if (!blogData) {
    console.log("Blog not found, showing 404");
    notFound();
  }

  const { blog, category } = blogData;
  
  let relatedBlogs: RelatedBlogItem[] = [];
  try {
    const fetchedRelated = await getRelatedBlogs(blog.categoryId, blog.slug);
    let relatedBlogs = Array.isArray(fetchedRelated) ? fetchedRelated : [];
  } catch (error) {
    console.error("Error fetching related blogs:", error);
  }

  const formattedDate = blog.createdAt
    ? format(new Date(blog.createdAt), "MMMM dd, yyyy")
    : "Date not available";

  // Calculate read time safely
  const readTime = blog.content ? Math.ceil(blog.content.length / 1000) : 1;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {category && (
              <div className="mb-4">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{
                    backgroundColor: category.color || "#3b82f6",
                  }}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category.name}
                </span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
              {blog.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{blog.author}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {blog.featuredImage && (
              <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {blog.shortDescription && (
              <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-blue-500 pl-4 md:pl-6 italic">
                {blog.shortDescription}
              </div>
            )}

            {/* Blog Content with proper styling */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Author Section */}
            {blog.author && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {blog.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Author
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map(({ blog: relatedBlog, category: relatedCategory }) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {relatedBlog.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedBlog.featuredImage}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      {relatedCategory && (
                        <span
                          className="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 text-white"
                          style={{
                            backgroundColor: relatedCategory.color || "#3b82f6",
                          }}
                        >
                          {relatedCategory.name}
                        </span>
                      )}
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {relatedBlog.shortDescription || (relatedBlog.content ? relatedBlog.content.substring(0, 100) : '')}
                      </p>
                      <div className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                        Read More →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      
    </div>
  );
}