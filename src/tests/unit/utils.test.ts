import { expect, it } from 'vitest'
import { cleanEmptyValues } from '@/utils/cleanEmptyValues'

it('function cleanEmptyValues should remove values: null, undefined, [], {}, ""', () => {
  const TEST_OBJECT = {
    a: null,
    b: undefined,
    c: [],
    d: {},
    e: 'e',
    f: '',
    g: 0,
    h: 10,
    i: true,
    j: false,
    k: { l: null, m: undefined, n: [], o: {}, p: '' },
    r: { s: null, t: undefined, u: [], v: {}, w: '', x: 0, y: 10, z: 'z' },
  }
  const EXPECTED_OBJECT = {
    e: 'e',
    g: 0,
    h: 10,
    i: true,
    j: false,
    r: { x: 0, y: 10, z: 'z' },
  }

  const initSavedObj = structuredClone(TEST_OBJECT)
  const result = cleanEmptyValues(TEST_OBJECT)

  expect(TEST_OBJECT).toEqual(initSavedObj)
  expect(result).toEqual(EXPECTED_OBJECT)
})
