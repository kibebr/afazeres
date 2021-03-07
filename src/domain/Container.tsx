import { Afazer } from './Afazer'

export interface Container {
  id: string
  title: string
  afazeres: Afazer[]
}

export const createContainer = (): Container => ({
  id: '10',
  title: 'New container',
  afazeres: []
})
