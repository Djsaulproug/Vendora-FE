
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import VendorDashboard from '../VendorDashboard'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, it, expect, vi } from 'vitest'

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url?.toString().includes('/api/vendors/1')) {
      return Promise.resolve({ json: () => Promise.resolve({ id: '1', name: 'Acme' }) })
    }
    if (url?.toString().includes('/api/products?vendorId=1')) {
      return Promise.resolve({ json: () => Promise.resolve({ products: [{ id: '1', name: 'Prod', price: 5, description: 'd' }] }) })
    }
    return Promise.resolve({ json: () => Promise.resolve({}) })
  }) as any
})

it('shows vendor products', async () => {
  render(
    <MemoryRouter initialEntries={['/vendor/1']}>
      <Routes>
        <Route path="/vendor/:vendorId" element={<VendorDashboard />} />
      </Routes>
    </MemoryRouter>
  )
  await waitFor(() => expect(screen.getByText(/Acme/i)).toBeInTheDocument())
  expect(screen.getByText('Prod')).toBeInTheDocument()
})
