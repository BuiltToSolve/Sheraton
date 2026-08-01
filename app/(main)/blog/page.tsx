import { PageHero } from '@/components/page-hero';
import { blogPosts } from '@/lib/data';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog - Samrat Sheraton',
  description: 'Read the latest news, tips, and stories from Samrat Sheraton.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Our Blog"
        breadcrumb="Blog"
        image="https://images.pexels.com/photos/14036253/pexels-photo-14036253.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-20 lg:py-28 bg-cream section-pattern">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border"
              >
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-dark transition-colors group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
