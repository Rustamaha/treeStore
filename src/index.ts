import type { Id, Item, Items } from "./types/treeStore.types"

export default class TreeStore {
  items: Items = []
  
  constructor(items: Items) {
    this.items = items
  }

  getAll(): Items {
    return this.items
  }

  getItem(id: Id): Item | undefined {
    return this.items.find(item => item.id === id)
  }

  getChildren(id: Id): Items {
    let items: Items = []
    for(let i = 0; i < this.items.length; i+= 1) {
      if (this.items[i].parent === id) {
        items.push(this.items[i])
      }
    }
    return items
  }

  getAllChildren(id: Id): Items {
    const getAllChildren = (ids: Items = [], acc: Items = []): Items => {
      if (!ids.length) return acc
      let children: Items = []
      for (let i = 0; i < ids.length; i += 1) {
        const { id } = ids[i]
        const ch = this.getChildren(id)
        children = children.concat(ch)
      }
      if (!children.length) return acc
      return getAllChildren(children, acc.concat(children))
    }

    return getAllChildren([{ id }] as Items)
  }

  getAllParents(id: Id): Items {
    const item = this.getItem(id)
    if (!item) return []
    const getAllParents = (id: Id, acc: Items): Items => {
      if (!id) return acc
      let item
      for(let i = 0; i < this.items.length; i+= 1) {
        item = this.getItem(id)
        if (item) {
          acc.push(item)
          break
        }
      }
      if (item && item.parent !== 'root') {
        return getAllParents(item.parent, acc)
      }
      return acc
    }
   
    return getAllParents(item.parent, [])
  }
}
