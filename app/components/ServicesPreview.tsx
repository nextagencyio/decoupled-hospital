'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_FEATURED_SERVICES } from '@/lib/queries'
import { DrupalHomepage, DrupalService } from '@/lib/types'
import { ArrowRight, Stethoscope } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface ServicesPreviewProps {
  homepageContent?: DrupalHomepage | null
}

interface FeaturedServicesData {
  nodeServices: { nodes: DrupalService[] }
}

export default function ServicesPreview({ homepageContent }: ServicesPreviewProps) {
  const { data, loading, error } = useQuery<FeaturedServicesData>(GET_FEATURED_SERVICES)
  const services = data?.nodeServices?.nodes || []
  const sectionTitle = homepageContent?.featuredServicesTitle || 'Our Medical Services'

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary-950 mb-4">{sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl" />
                <div className="p-6 pt-10"><div className="h-6 bg-gray-200 rounded w-3/4 mb-3" /><div className="h-4 bg-gray-200 rounded w-full" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || services.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-primary-950 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive medical services delivered with compassion and the latest in medical technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.id} href={service.path || `/services/${service.id}`} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary-700 to-primary-900">
                {service.image?.url ? (
                  <ResponsiveImage src={service.image.url} alt={service.image.alt || service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" variations={service.image.variations} targetWidth={400} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><Stethoscope className="w-16 h-16 text-white/50" /></div>
                )}
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-primary-100 border-4 border-white flex items-center justify-center shadow-sm">
                  <Stethoscope className="w-5 h-5 text-primary-700" />
                </div>
                <div className="pt-4">
                  {service.department && service.department.length > 0 && (
                    <div className="text-sm text-primary-700 font-medium mb-2">{service.department[0].name}</div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">{service.title}</h3>
                  <div className="flex items-center text-primary-700 font-medium group-hover:gap-2 transition-all text-sm">
                    Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services" className="inline-flex items-center px-8 py-4 bg-primary-800 text-white rounded-lg hover:bg-primary-900 transition-colors font-bold">
            View All Services <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
