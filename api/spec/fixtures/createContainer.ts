import { Container } from '../../lib/domain/Container'
import { nanoid } from 'nanoid'

export const createContainer = (_?: Partial<Container>): Container => ({
  id: nanoid(),
  name: 'New container',
  emoji: ':)',
  afazeres: {},
  ..._
})
