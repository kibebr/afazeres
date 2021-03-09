import { Afazer } from './Afazer'

export interface Container {
  id: string
  title: string
  afazeres: Record<string, Afazer>
  refParent: string
}

export const changeTitle = (s: string) => (c: Container): Container => ({ ...c, title: s })

export const addAfazer = (a: Afazer) => (c: Container): Container => ({
  ...c,
  afazeres: {
    ...c.afazeres,
    [a.id]: a
  }
})
