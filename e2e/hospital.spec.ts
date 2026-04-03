import { test, expect } from '@playwright/test'

test.describe('Hospital Homepage', () => {
  test('renders hero section with title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    const title = await page.locator('h1').textContent()
    expect(title).toBeTruthy()
  })

  test('renders stats section', async ({ page }) => {
    await page.goto('/')
    // Stats section has numbers like 50,000+ or 300+
    await expect(page.getByText('50,000+')).toBeVisible()
  })

  test('renders featured services section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Our Medical Services').first()).toBeVisible()
  })

  test('renders footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Metropolitan Medical').first()).toBeVisible()
  })
})

test.describe('Departments Page', () => {
  test('lists departments', async ({ page }) => {
    await page.goto('/departments')
    await expect(page.locator('h1')).toContainText('Departments')
    await expect(page.getByText('Cardiology').first()).toBeVisible()
    await expect(page.getByText('Oncology').first()).toBeVisible()
  })

  test('department detail page loads', async ({ page }) => {
    await page.goto('/departments/cardiology')
    await expect(page.locator('h1')).toContainText('Cardiology')
  })
})

test.describe('Providers Page', () => {
  test('lists providers', async ({ page }) => {
    await page.goto('/providers')
    await expect(page.locator('h1')).toContainText('Providers')
    await expect(page.getByText('Dr. James Chen').first()).toBeVisible()
  })

  test('provider detail page loads', async ({ page }) => {
    await page.goto('/providers/dr-james-chen')
    await expect(page.locator('h1')).toContainText('Dr. James Chen')
  })
})

test.describe('Services Page', () => {
  test('lists services', async ({ page }) => {
    await page.goto('/services')
    await expect(page.locator('h1')).toContainText('Services')
    await expect(page.getByText('Cardiac Surgery').first()).toBeVisible()
  })

  test('service detail page loads', async ({ page }) => {
    await page.goto('/services/cardiac-surgery')
    await expect(page.locator('h1')).toContainText('Cardiac Surgery')
  })
})

test.describe('News Page', () => {
  test('lists news articles', async ({ page }) => {
    await page.goto('/news')
    await expect(page.locator('h1')).toContainText('News')
    await expect(page.getByText('Heart Failure Program').first()).toBeVisible()
  })

  test('news detail page loads', async ({ page }) => {
    await page.goto('/news/new-heart-program')
    await expect(page.locator('h1')).toContainText('Heart Failure Program')
  })
})

test.describe('Navigation', () => {
  test('header links work', async ({ page }) => {
    await page.goto('/')
    // Click Find a Doctor link
    await page.getByRole('link', { name: 'Find a Doctor' }).first().click()
    await expect(page).toHaveURL('/providers')
  })
})
