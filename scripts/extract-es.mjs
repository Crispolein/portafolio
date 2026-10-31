import { readFileSync } from 'node:fs'

const es = JSON.parse(readFileSync(new URL('../src/locales/es/translation.json', import.meta.url), 'utf8'))

// Prints one line per string with 6 or more words.
function walk(value) {
  if (typeof value === 'string') {
    if (value.trim().split(/\s+/).length >= 6) console.log(value)
  } else if (Array.isArray(value)) {
    value.forEach(walk)
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach(walk)
  }
}

walk(es)
