import shortid from 'shortid'

export interface Afazer {
  id: string
  content: string
}

export const createAfazer = (obj: Partial<Afazer>): Afazer => ({
  id: shortid(),
  content: 'Empty content',
  ...obj
})
