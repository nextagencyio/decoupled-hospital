import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'
import { GET_HOMEPAGE_DATA, GET_FEATURED_SERVICES } from '@/lib/queries'

export const revalidate = 3600
export const dynamic = 'force-dynamic'


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Metropolitan Medical Center - Exceptional Care for Every Patient',
    description: 'Comprehensive, patient-centered healthcare backed by cutting-edge technology and a team of world-class physicians.',
    keywords: ['Hospital', 'Healthcare', 'Medical', 'Doctors', 'Emergency', 'Surgery'],
  }
}

export default async function Home() {
  const configStatus = checkConfiguration()
  if (!configStatus.isConfigured) return <SetupGuide missingVars={configStatus.missingVars} />

  const client = getClient()

  let homepageContent = null
  let featuredServices: any[] = []

  try {
    const data = await client.raw(GET_HOMEPAGE_DATA)
    homepageContent = data?.nodeHomepages?.nodes?.[0] || null
  } catch (error) {
    console.error('Error fetching homepage:', error)
  }

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  try {
    const servicesData = await client.raw(GET_FEATURED_SERVICES)
    featuredServices = servicesData?.nodeServices?.nodes || []
  } catch (error) {
    console.error('Error fetching featured services:', error)
  }

  return <HomepageRenderer homepageContent={homepageContent} featuredServices={featuredServices} />
}
