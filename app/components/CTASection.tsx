'use client'

import { DrupalHomepage } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Ready to Schedule an Appointment?'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Book Appointment'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'Contact Us'

  return (
    <section className="bg-primary-800 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
        {description ? (
          <div className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg" dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Our team of specialists is here to provide you with the best possible care. Reach out today to get started.
          </p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-900 rounded-lg hover:bg-gray-100 transition-colors font-bold">
            {primaryLabel}
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <a href="/about" className="px-8 py-4 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors font-bold">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
