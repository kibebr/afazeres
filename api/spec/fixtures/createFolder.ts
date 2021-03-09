import { nanoid } from 'nanoid'
import { Folder } from '../../lib/domain/Folder'

export const createFolder = (_?: Partial<Folder>): Folder => ({
  id: nanoid(),
  emoji: ':cool:',
  name: 'My sample folder',
  containers: {},
  ..._
})
