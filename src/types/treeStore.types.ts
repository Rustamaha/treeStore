export type Id = string | number

export type Item = {
  id: Id
  parent: Id
  [key: string]: Id | null
}

export type Items = Array<Item>