import { describe, expect, it } from 'vitest'
import es from './es/translation.json'
import en from './en/translation.json'
import { cases } from '../data/cases'

type Json = unknown

// Flattens a JSON tree into [path, string] pairs; arrays contribute their length.
function walk(value: Json, path: string, strings: [string, string][], shape: string[]) {
  if (typeof value === 'string') {
    strings.push([path, value])
    shape.push(path)
  } else if (Array.isArray(value)) {
    shape.push(`${path}[len=${value.length}]`)
    value.forEach((v, i) => walk(v, `${path}[${i}]`, strings, shape))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k, strings, shape)
  } else {
    shape.push(`${path}:${typeof value}`)
  }
}

function flatten(json: Json) {
  const strings: [string, string][] = []
  const shape: string[] = []
  walk(json, '', strings, shape)
  return { strings, shape }
}

const esFlat = flatten(es)
const enFlat = flatten(en)
const PHONE = /\+?56\s?9|\b9\s?\d{4}\s?\d{4}\b/

describe('locales', () => {
  it('es and en have identical keys and array lengths', () => {
    expect(enFlat.shape).toEqual(esFlat.shape)
  })

  it('es has no forbidden punctuation or "90 %"', () => {
    const bad = esFlat.strings.filter(([, s]) => /[—;()]/.test(s) || s.includes('90 %'))
    expect(bad).toEqual([])
  })

  it('no string in any language contains a phone number', () => {
    const bad = [...esFlat.strings, ...enFlat.strings].filter(([, s]) => PHONE.test(s))
    expect(bad).toEqual([])
  })

  it('every case has complete copy in es and en with 4 shot alts', () => {
    for (const lng of [es, en] as Record<string, any>[]) {
      for (const c of Object.values(cases)) {
        const node = c.keyPrefix.split('.').reduce((o, k) => o?.[k], lng as any)
        expect(node, c.keyPrefix).toBeDefined()
        expect(node.shots).toHaveLength(c.shots)
        expect(node.facts).toHaveLength(4)
        expect(node.nodes).toHaveLength(5)
        expect(node.steps).toHaveLength(3)
        expect(node.decisions).toHaveLength(3)
        expect(node.resultLog.length).toBeGreaterThanOrEqual(2)
        for (const k of ['tag', 'title', 'sub', 'shotsLabel', 'pipelineAria', 'result']) expect(node[k], k).toBeTruthy()
        c.aiNodes.forEach((i) => expect(node.nodes[i]).toBeDefined())
      }
    }
  })
})
