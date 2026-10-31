import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import CasePage from './CasePage'
import { cases } from '../data/cases'
import i18n from '../i18n'

afterEach(cleanup)

describe('cases data', () => {
  it('maps slugs to keys, AI nodes and the other case', () => {
    expect(cases['cv-optimizer']).toMatchObject({ keyPrefix: 'case.cvOptimizer', aiNodes: [2], next: 'job-hunter' })
    expect(cases['job-hunter']).toMatchObject({ keyPrefix: 'case.jobHunter', aiNodes: [3], next: 'cv-optimizer' })
  })
})

describe('CasePage', () => {
  it.each(['cv-optimizer', 'job-hunter'] as const)('renders h1 and pipeline for %s', (slug) => {
    const prefix = cases[slug].keyPrefix
    render(<CasePage slug={slug} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(i18n.t(`${prefix}.title`))
    expect(screen.getByRole('img', { name: i18n.t(`${prefix}.pipelineAria`) })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('tabindex', '-1')
  })

  it('links to the next case and back', () => {
    render(<CasePage slug="cv-optimizer" />)
    expect(screen.getByRole('link', { name: /Job Hunter Platform/ })).toHaveAttribute('href', '/proyectos/job-hunter')
    expect(screen.getByRole('link', { name: /Proyectos/ })).toHaveAttribute('href', '/')
  })

  it('returns null for an unknown slug', () => {
    const { container } = render(<CasePage slug="nope" />)
    expect(container).toBeEmptyDOMElement()
  })
})
