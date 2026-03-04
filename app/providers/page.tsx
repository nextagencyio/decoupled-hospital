import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_PROVIDERS } from '@/lib/queries'
import { ProvidersData } from '@/lib/types'
import Header from '../components/Header'
import ProviderCard from '../components/ProviderCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Providers | Metropolitan Medical Center',
  description: 'Browse our providers.',
}

async function getProviders() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ProvidersData>({
      query: GET_PROVIDERS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeProviders?.nodes || []
  } catch (error) {
    console.error('Error fetching providers:', error)
    return []
  }
}

export default async function ProvidersPage() {
  const items = await getProviders()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Our Providers
            </h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Meet our team of board-certified physicians and specialists.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Providers Yet</h2>
              <p className="text-gray-500">
                Providers will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <ProviderCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
