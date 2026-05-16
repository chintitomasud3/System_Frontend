import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  }
}

export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const users: User[] = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <main className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-green-600">
            Users Directory
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light">
            Here is an example of a separate route fetching users from JSONPlaceholder.
          </p>
          <div className="mt-8">
            <a href="/" className="inline-block px-6 py-3 rounded-full bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 hover:text-white transition-colors border border-slate-700">
              &larr; Back to Home
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-teal-500/20 hover:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{user.name}</h2>
                  <p className="text-sm text-teal-400">@{user.username}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-400">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
