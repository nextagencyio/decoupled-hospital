'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ServicesPreview from './ServicesPreview'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Stethoscope, Heart, Shield, Clock, Users, Award, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const commitmentItems = [
  { icon: Stethoscope, title: 'Expert Physicians', description: 'Board-certified specialists across 50+ medical disciplines providing world-class care.' },
  { icon: Heart, title: 'Patient-First Care', description: 'Every decision is guided by what is best for our patients and their families.' },
  { icon: Shield, title: 'Safety & Quality', description: 'Nationally recognized for patient safety with top accreditations and certifications.' },
  { icon: Clock, title: '24/7 Emergency', description: 'Round-the-clock emergency services with rapid response teams always standing by.' },
  { icon: Users, title: 'Community Health', description: 'Dedicated to improving the health and wellness of the communities we serve.' },
  { icon: Award, title: 'Award-Winning', description: 'Consistently ranked among the top hospitals for clinical excellence and innovation.' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80&fit=crop', alt: 'Hospital corridor' },
  { src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80&fit=crop', alt: 'Medical team' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&fit=crop', alt: 'Medical equipment' },
  { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80&fit=crop', alt: 'Doctor with patient' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <ServicesPreview homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Our Commitment Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary-950 mb-4">Our Commitment to You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Metropolitan Medical Center is built on a foundation of excellence, compassion, and innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitmentItems.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary-950 mb-4">Our Facilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities designed with patient comfort and clinical excellence in mind.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img) => (
              <div key={img.alt} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Large 5-Column Footer */}
      <footer className="bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* About Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <Stethoscope className="w-5 h-5 text-primary-300" />
                </div>
                <span className="text-lg font-bold text-white">Metropolitan Medical</span>
              </div>
              <p className="text-primary-300 text-sm mb-4 leading-relaxed">
                Providing exceptional healthcare with compassion and innovation since 1952.
              </p>
              <div className="space-y-2 text-sm text-primary-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>100 Medical Center Drive<br />Metropolis, ST 10001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Departments Column */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Departments</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><Link href="/departments" className="hover:text-white transition-colors">All Departments</Link></li>
                <li><a href="/departments" className="hover:text-white transition-colors">Cardiology</a></li>
                <li><a href="/departments" className="hover:text-white transition-colors">Neurology</a></li>
                <li><a href="/departments" className="hover:text-white transition-colors">Orthopedics</a></li>
                <li><a href="/departments" className="hover:text-white transition-colors">Pediatrics</a></li>
                <li><a href="/departments" className="hover:text-white transition-colors">Oncology</a></li>
              </ul>
            </div>

            {/* Patients Column */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Patients</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><Link href="/providers" className="hover:text-white transition-colors">Find a Doctor</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Patient Portal</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Insurance Info</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Medical Records</a></li>
              </ul>
            </div>

            {/* Visitors Column */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Visitors</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><a href="/about" className="hover:text-white transition-colors">Campus Map</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Visiting Hours</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Parking Info</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Gift Shop</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Dining Options</a></li>
              </ul>
            </div>

            {/* Emergency Column */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Emergency</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><a href="/contact" className="hover:text-white transition-colors">ER Services</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Urgent Care</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Trauma Center</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Air Ambulance</a></li>
              </ul>
              <div className="mt-4 p-3 bg-accent-500/20 border border-accent-500/30 rounded-lg">
                <p className="text-accent-300 text-xs font-bold">Emergency: 911</p>
                <p className="text-accent-200 text-xs">24/7 Emergency Room</p>
              </div>
            </div>
          </div>

          {/* Newsletter Row */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-bold mb-1">Stay Informed</h4>
                <p className="text-primary-300 text-sm">Get health tips, news, and updates delivered to your inbox.</p>
              </div>
              <NewsletterForm />
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-400">
            <p>&copy; {new Date().getFullYear()} Metropolitan Medical Center. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/about" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/about" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="/about" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="px-4 py-2.5 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-primary-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 w-full md:w-64"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-primary-600 text-white rounded-r-lg hover:bg-primary-500 transition-colors font-bold text-sm whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
