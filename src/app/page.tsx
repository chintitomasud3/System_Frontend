import React from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12', {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const posts: Post[] = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <main className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            JSONPlaceholder
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light">
            Discover posts fetched from the JSONPlaceholder API, rendered dynamically with Next.js and styled with modern Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/20 hover:border-slate-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-cyan-400 text-sm font-bold shadow-inner">
                    {post.id}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Post
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-cyan-300 transition-colors duration-300 capitalize line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                  {post.body}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-slate-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">U{post.userId}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-300">User {post.userId}</span>
                  </div>
                  <button className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/btn">
                    Read more 
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
