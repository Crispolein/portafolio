import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('smoke', () => {
  it('renders a level 1 heading', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0)
  })
})
