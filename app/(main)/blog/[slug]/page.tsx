import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} - Samrat Sheraton`,
    description: post.excerpt,
  };
}

export default function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold text-white px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white max-w-3xl mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                {post.excerpt}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Samrat Sheraton has long been celebrated as a destination where luxury meets comfort. The experience begins the moment you step through our grand entrance, where the warm glow of crystal chandeliers and the gentle hum of ambient music set the tone for what lies ahead.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every detail at Samrat is meticulously curated to create an atmosphere of refined elegance. From the hand-selected furnishings in each room to the locally sourced ingredients in our restaurant, our commitment to quality is evident in every aspect of your stay.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our dedicated team of hospitality professionals is available around the clock to ensure that your every need is met. Whether it is arranging a special celebration, recommending local attractions, or simply ensuring your room is perfectly prepared, we take pride in anticipating and exceeding your expectations.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Hotel features an array of world-class amenities, including a state-of-the-art fitness center, a luxurious spa, and multiple dining venues. Each facility is designed to provide guests with an unparalleled experience of relaxation and indulgence.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                As we look to the future, Samrat Sheraton remains committed to redefining luxury hospitality. We continue to innovate and elevate our offerings, always with the guest experience at the heart of everything we do. We invite you to join us and discover why Samrat is more than a hotel — it is a destination.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Tag className="w-4 h-4 text-gold" />
              <span className="text-sm text-muted-foreground">Tags:</span>
              <span className="text-sm text-navy">{post.category}</span>
              <span className="text-sm text-navy">Hotel</span>
              <span className="text-sm text-navy">Luxury</span>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </div>
          </div>

          <div className="mt-20 max-w-5xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-navy mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-4 bg-cream rounded-2xl p-5 hover:shadow-lg transition-all"
                >
                  <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-gold-dark font-medium mb-1">{p.category}</span>
                    <h4 className="font-heading font-bold text-navy group-hover:text-gold-dark transition-colors leading-snug">
                      {p.title}
                    </h4>
                    <span className="text-xs text-muted-foreground mt-2">{p.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
