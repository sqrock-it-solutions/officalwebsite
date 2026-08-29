// components/blogs/BlogContent.tsx
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { 
  Search, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Cpu,
  Code,
  Megaphone,
  Briefcase,
  Palette,
  Rocket,
  Zap,
  Globe,
  Users,
  Lightbulb,
  Code2,
  Terminal,
  Laptop,
  Monitor,
  MonitorCog,
  Server,
  Database,
  Braces,
  FileCode,
  Binary,
  GitBranch,
  GitMerge,
  Bug,
  Settings,
  Cog,
  Wrench,
  Building,
  Building2,
  Store,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  ChartNoAxesColumn,
  ChartNoAxesCombined,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  CircleDollarSign,
  Radio,
  Mail,
  MessageSquare,
  MessageCircle,
  Share2,
  Target,
  Crosshair,
  MousePointer,
  MousePointerClick,
  BadgePercent,
    Layers,
  Shapes,
  Crop,
  Images,
  Frame,
  Ruler,
  Scissors,

  // Technology
  Wifi,
  WifiHigh,
  Cloud,
  CloudCog,
  CloudUpload,
  CloudDownload,
  Smartphone,
  Tablet,
  Router,
  Network,
  HardDrive,
  MemoryStick,
  Microchip,
  CircuitBoard,
  Bot,
  Brain,
  Sparkles,
  WandSparkles,

  // People / Team
  User,
  UserPlus,
  UserCheck,
  UserRound,
  UserRoundPlus,
  Contact,
  ContactRound,
  Accessibility,
  Handshake,

  // Education
  BookOpen,
  Book,
  GraduationCap,
  School,
  Library,
  Notebook,
  NotebookPen,
  PenLine,
  Presentation,
  PresentationIcon,
  LibraryBig,

  // Security
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  LockKeyhole,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  Scan,
  BadgeCheck,

  // Communication
  Phone,
  PhoneCall,
  Video,
  VideoIcon,
  AtSign,
  Inbox,
  MessageSquareText,
  MessagesSquare,
  MailCheck,

  // Files / Content
  File,
  FileText,
  FilePlus,
  FileCheck,
  FileEdit,
  Folder,
  FolderOpen,
  FolderPlus,
  ClipboardCheck,
  ClipboardList,
  List,
  ListChecks,

  // Analytics
  Activity,
  Gauge,
  ChartLine,
  ChartBar,
  ChartPie,
  BarChart,
  AreaChart,
  LineChart,
  Percent,
  Sigma,

  // Services
  Headphones,
  Headset,
  LifeBuoy,
  HeartHandshake,
  CircleHelp,
  CircleCheck,
  CheckCircle,
  Badge,
  Award,
  Trophy,
  Star,

  // Web / UI
  Layout,
  LayoutDashboard,
  PanelsTopLeft,
  Sidebar,
  Menu,
  Grid2X2,
  Rows3,
  Columns3,
  Component,
  Blocks,
  SquareStack,

  // Time / Workflow
  Timer,
  Calendar,
  CalendarDays,
  CalendarCheck,
  Workflow,
  ListTodo,
  Check,
  CheckCheck,

  // Misc
  Home,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  MoreVertical,
  ArrowUpRight,
  ExternalLink,
  Link,
  Link2,
  MapPin,
  Compass,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  Gift,
  Package,
  Truck,
  Plane,
  Camera,
  Music,
  Video as VideoIcon2,
  Gamepad2,
  WifiOff,
  Power,
  Battery,
  Sun,
  Moon,
  Sparkle,
  Flame,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Tag,
  Tags,
  Newspaper,
  NewspaperIcon,
  Paintbrush,
  Paintbrush2,
  PenTool,
  Pencil,
  PencilLine,
  Brush,
  Factory
} from 'lucide-react'
import { subscribeToNewsletter, type BlogPostWithReadTime } from '@/app/blog/actions'
import { Share } from 'next/font/google'

// --- Types ---
interface Category {
  id: number
  name: string
  slug: string
  icon: string
  color: string
  count: number
}

interface PopularPost {
  title: string
  date: string
  image: string
  slug: string
}

interface BlogContentProps {
  initialPosts: BlogPostWithReadTime[]
  initialPopularPosts: PopularPost[]
  initialCategories: Category[]
  initialTotalPages: number
  initialCurrentPage: number
  initialSearch: string
  initialCategorySlug: string
}

// Static icon mapping - FIXED!
const iconMap: Record<string, React.ElementType> = {
  // Development
  Cpu,
  Code,
  Code2,
  Terminal,
  Factory,
  Laptop,
  Monitor,
  MonitorCog,
  Server,
  Database,
  Braces,
  FileCode,
  Binary,
  GitBranch,
  GitMerge,
  Bug,
  Settings,
  Cog,
  Wrench,

  // Business
  Briefcase,
  Building,
  Building2,
  Store,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  ChartNoAxesColumn,
  ChartNoAxesCombined,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  CircleDollarSign,

  // Marketing
  Megaphone,
  Radio,
  Mail,
  Send,
  MessageSquare,
  MessageCircle,
  Share2,
  Target,
  Crosshair,
  MousePointer,
  MousePointerClick,
  BadgePercent,
  Tag,
  Tags,
  Newspaper,
  NewspaperIcon,

  // Design
  Palette,
  Paintbrush,
  Paintbrush2,
  PenTool,
  Pencil,
  PencilLine,
  Brush,
  Layers,
  Shapes,
  Crop,
  Image,
  Images,
  Frame,
  Ruler,
  Scissors,

  // Technology
  Rocket,
  Zap,
  Globe,
  Wifi,
  WifiHigh,
  Cloud,
  CloudCog,
  CloudUpload,
  CloudDownload,
  Smartphone,
  Tablet,
  Router,
  Network,
  HardDrive,
  MemoryStick,
  Microchip,
  CircuitBoard,
  Bot,
  Brain,
  Sparkles,
  WandSparkles,

  // People / Team
  Users,
  User,
  UserPlus,
  UserCheck,
  UserRound,
  UserRoundPlus,
  Contact,
  ContactRound,
  Accessibility,
  Handshake,

  // Education
  Lightbulb,
  BookOpen,
  Book,
  GraduationCap,
  School,
  Library,
  Notebook,
  NotebookPen,
  PenLine,
  Presentation,
  PresentationIcon,
  LibraryBig,

  // Security
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  LockKeyhole,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  Scan,
  BadgeCheck,

  // Communication
  Phone,
  PhoneCall,
  Video,
  VideoIcon,
  AtSign,
  Inbox,
  MessageSquareText,
  MessagesSquare,
  MailCheck,

  // Files / Content
  File,
  FileText,
  FilePlus,
  FileCheck,
  FileEdit,
  Folder,
  FolderOpen,
  FolderPlus,
  ClipboardCheck,
  ClipboardList,
  List,
  ListChecks,

  // Analytics
  Activity,
  Gauge,
  ChartLine,
  ChartBar,
  ChartPie,
  BarChart,
  AreaChart,
  LineChart,
  Percent,
  Sigma,

  // Services
  Headphones,
  Headset,
  LifeBuoy,
  HeartHandshake,
  CircleHelp,
  CircleCheck,
  CheckCircle,
  Badge,
  Award,
  Trophy,
  Star,

  // Web / UI
  Layout,
  LayoutDashboard,
  PanelsTopLeft,
  Sidebar,
  Menu,
  Grid2X2,
  Rows3,
  Columns3,
  Component,
  Blocks,
  SquareStack,

  // Time / Workflow
  Clock,
  Timer,
  Calendar,
  CalendarDays,
  CalendarCheck,
  Workflow,
  ListTodo,
  Check,
  CheckCheck,

  // Misc
  Home,
  Search,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  MoreVertical,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Link,
  Link2,
  MapPin,
  Compass,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  Gift,
  Package,
  Truck,
  Plane,
  Camera,
  Music,
  Gamepad2,
  WifiOff,
  Power,
  Battery,
  Sun,
  Moon,
  Sparkle,
  Flame,
  Circle,
  Square,
  Triangle,
  Hexagon,
};

// --- Filter Button Component ---
const FilterButton: React.FC<{ label: string; active?: boolean; onClick: () => void }> = ({ 
  label, 
  active = false, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-[#0a0a0a] text-white shadow-md'
          : 'bg-white border border-gray-200 text-[#0a0a0a] hover:bg-gray-50 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  )
}

// --- Blog Card Component ---
const BlogCard: React.FC<{ post: BlogPostWithReadTime }> = ({ post }) => {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>
        <h3 className="text-lg font-bold text-[#0a0a0a] mb-2 leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mb-6 line-clamp-2">{post.excerpt}</p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <Clock size={14} />
            {post.readTime}
          </span>
          <button 
            onClick={() => window.location.href = `/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm font-bold text-[#0a0a0a] hover:text-gray-600 transition-colors group"
          >
            Read More
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  )
}

// --- Main Component ---
const BlogContent: React.FC<BlogContentProps> = ({
  initialPosts,
  initialPopularPosts,
  initialCategories,
  initialTotalPages,
  initialCurrentPage,
  initialSearch,
  initialCategorySlug,
}) => {
  // All posts (never changes)
  const [allPosts] = useState<BlogPostWithReadTime[]>(initialPosts)
  const [popularPosts] = useState<PopularPost[]>(initialPopularPosts)
  const [categories] = useState<Category[]>(initialCategories)
  
  // Filter states
  const [activeCategorySlug, setActiveCategorySlug] = useState(initialCategorySlug || 'all')
  const [searchTerm, setSearchTerm] = useState(initialSearch || '')
  const [currentPage, setCurrentPage] = useState(initialCurrentPage || 1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null)

  const postsPerPage = 6

  // Client-side filtering - NO REFRESH!
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = activeCategorySlug === 'all' || post.categorySlug === activeCategorySlug
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.author?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [allPosts, activeCategorySlug, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage
    const end = start + postsPerPage
    return filteredPosts.slice(start, end)
  }, [filteredPosts, currentPage])

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategorySlug, searchTerm])

  // Handle filter change with smooth transition
  const handleFilterChange = (slug: string) => {
    if (slug === activeCategorySlug) return
    setIsTransitioning(true)
    setActiveCategorySlug(slug)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  // Handle page change with smooth scroll
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    setIsTransitioning(true)
    setCurrentPage(page)
    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    const result = await subscribeToNewsletter(newsletterEmail)
    setNewsletterStatus(result)
    if (result.success) {
      setNewsletterEmail('')
      setTimeout(() => setNewsletterStatus(null), 3000)
    }
  }

  // Get active category name for display
  const activeCategoryName = activeCategorySlug === 'all' 
    ? 'All Articles' 
    : categories.find(c => c.slug === activeCategorySlug)?.name || 'All Articles'

  // Get all filter labels
  const filterLabels = [
    { label: 'All Articles', slug: 'all' },
    ...categories.map(c => ({ label: c.name, slug: c.slug }))
  ]

  // Get icon component - FIXED!
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName]
    return IconComponent ? <IconComponent size={16} /> : <Cpu size={16} />
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Top Bar */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 mb-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filterLabels.map((filter) => (
            <FilterButton
              key={filter.slug}
              label={filter.label}
              active={activeCategorySlug === filter.slug}
              onClick={() => handleFilterChange(filter.slug)}
            />
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-200 rounded-lg pl-4 pr-10 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-6">
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        {activeCategorySlug !== 'all' && ` in ${activeCategoryName}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Content Area */}
        <div className="lg:col-span-9">
          {/* Blog Grid */}
          <div 
            id="blog-grid"
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {paginatedPosts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No posts found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
              </div>
            ) : (
              paginatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-md'
                        : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 space-y-8">
          {/* Widget 1: About Our Blog */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <h2 className="font-bold text-lg text-[#0a0a0a] mb-3">About Our Blog</h2>
            <p className="text-sm text-gray-600 mb-5">
              Insights, stories, and expert perspectives on technology, business, and the digital world.
            </p>
            <button className="w-full bg-[#0a0a0a] text-white py-3 rounded-lg text-sm font-bold flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors">
              Learn More
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Widget 2: Categories */}
          <div>
            <h2 className="font-bold text-lg mb-4">Categories</h2>
            <ul className="space-y-3">
              <li
                className={`flex justify-between items-center group cursor-pointer transition-all duration-200 ${
                  activeCategorySlug === 'all' ? 'bg-gray-50 -mx-2 px-2 py-1 rounded-lg' : ''
                }`}
                onClick={() => handleFilterChange('all')}
              >
                <span className={`flex items-center gap-3 text-sm font-semibold transition-colors ${
                  activeCategorySlug === 'all' ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] group-hover:text-gray-600'
                }`}>
                  <span className="w-4 h-4 rounded-full bg-gray-400"></span>
                  All Articles
                </span>
                <span className={`text-xs transition-colors ${
                  activeCategorySlug === 'all' ? 'text-[#0a0a0a] font-bold' : 'text-gray-400'
                }`}>
                  {allPosts.length}
                </span>
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`flex justify-between items-center group cursor-pointer transition-all duration-200 ${
                    activeCategorySlug === category.slug ? 'bg-gray-50 -mx-2 px-2 py-1 rounded-lg' : ''
                  }`}
                  onClick={() => handleFilterChange(category.slug)}
                >
                  <span className={`flex items-center gap-3 text-sm font-semibold transition-colors ${
                    activeCategorySlug === category.slug ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] group-hover:text-gray-600'
                  }`}>
                    {getIcon(category.icon)}
                    {category.name}
                  </span>
                  <span className={`text-xs transition-colors ${
                    activeCategorySlug === category.slug ? 'text-[#0a0a0a] font-bold' : 'text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Widget 3: Popular Posts */}
          <div>
            <h2 className="font-bold text-lg mb-4">Popular Posts</h2>
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 items-center group cursor-pointer"
                  onClick={() => window.location.href = `/blog/${post.slug}`}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0a0a0a] line-clamp-2 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h4>
                    <span className="text-xs text-gray-400 mt-1 block">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 4: Newsletter */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex p-3 bg-white/10 rounded-full mb-4">
              <Send size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Stay in the Loop</h3>
            <p className="text-sm text-gray-400 mb-5">
              Get the latest posts delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white px-4 py-2.5 rounded-l-lg text-sm w-full text-black outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gray-800 px-4 rounded-r-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              {newsletterStatus && (
                <p className={`text-xs ${newsletterStatus.success ? 'text-green-400' : 'text-red-400'} animate-fadeIn`}>
                  {newsletterStatus.message}
                </p>
              )}
            </form>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default BlogContent