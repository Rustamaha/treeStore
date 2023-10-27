import TreeStore from '../src/index'
import type { Id, Item, Items } from "../src/types/treeStore.types"
import { describe, expect, test } from '@jest/globals'

const items: Items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
]

describe('testing TreeStore', () => {
  test('getAll input tree', () => {
    const ts = new TreeStore(items)
    expect(ts.getAll()).toEqual(items)
  })

  test('getItem take one element from tree', () => {
    const ts = new TreeStore(items)
    expect(ts.getItem(2)).toEqual({ id: 2, parent: 1, type: 'test' })
    expect(ts.getItem(9)).toBeUndefined
  })

  test('getChildren get parent children', () => {
    const ts = new TreeStore(items)
    expect(ts.getChildren(2)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' }
    ])
    expect(ts.getChildren(9)).toEqual([])
  })

  test('getAllChildren get parent children, also children of this children if they have', () => {
    const ts = new TreeStore(items)
    expect(ts.getAllChildren(2)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null }
    ])
    expect(ts.getAllChildren(9)).toEqual([])
  })

  test('getAllParents get parent children', () => {
    const ts = new TreeStore(items)
    expect(ts.getAllParents(7)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' }
    ])
    expect(ts.getAllParents(9)).toEqual([])
  })
})