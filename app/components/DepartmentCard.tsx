import Link from 'next/link'
import { DrupalDepartment } from '@/lib/types'
import ResponsiveImage from './ResponsiveImage'
import { ArrowRight, Building2 } from 'lucide-react'

interface DepartmentCardProps {
  item: DrupalDepartment
}

export default function DepartmentCard({ item }: DepartmentCardProps) {
  return (
    <Link
      href={item.path || '#'}
      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-700 to-primary-900">
        {(item as any).image?.url ? (
          <ResponsiveImage
            src={(item as any).image.url}
            alt={(item as any).image.alt || item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={(item as any).image.variations}
            targetWidth={400}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 text-white/30 text-4xl font-bold">{item.title?.charAt(0)}</div>
          </div>
        )}
      </div>

      <div className="p-6 relative">
        <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-primary-100 border-4 border-white flex items-center justify-center shadow-sm">
          <Building2 className="w-5 h-5 text-primary-700" />
        </div>
        <div className="pt-4">
          {(item as any).phone && (
            <p className="text-sm text-primary-700 font-medium mb-2">{(item as any).phone}</p>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
            {item.title}
          </h3>

          {(item as any).body?.processed && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {(item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 150)}
            </p>
          )}

          <div className="flex items-center text-primary-700 font-medium group-hover:gap-2 transition-all text-sm">
            Learn more
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
