
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '../Home'
import { beforeEach, it, expect, vi } from 'vitest'

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url?.toString().includes('/api/products')) {
      return Promise.resolve({ json: () => Promise.resolve({ products: [{ id: '1', name: 'Test', price: 10, description: 'x' }] }) })
    }
    if (url?.toString().includes('/api/vendors')) {
      return Promise.resolve({ json: () => Promise.resolve({ vendors: [{ id: '1', name: 'Acme' }] }) })
    }
    return Promise.resolve({ json: () => Promise.resolve({}) })
  }) as any
})

it('renders products and vendors', async ()=>{
  render(<Home />)
  await waitFor(()=> expect(screen.getByText(/Featured Products/i)).toBeInTheDocument())
  expect(screen.getByText('Test')).toBeInTheDocument()
  expect(screen.getByText('Acme')).toBeInTheDocument()
})
