import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Layout({ children }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center text-xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-200">
                Godown
              </Link>
            </div>
            <div className="flex items-center">
              {session ? (
                <button 
                  onClick={() => signOut()} 
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200">
                  Sign out
                </button>
              ) : (
                <button 
                  onClick={() => signIn()} 
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200">
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg mt-4">
        <div className="p-5">{children}</div>
      </main>
    </div>
  )
}
