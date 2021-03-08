import { Container } from './Container'
import shortid from 'shortid'

export interface Folder {
  id: string
  title: string
  color: string
  containers: Record<string, Container>
}

export const deleteFolderFrom = (f: Folder) => (fs: Record<string, Folder>): Record<string, Folder> => {
  const { [f.id]: omit, ...res } = fs
  return res
}

export const addContainerTo = (c: Container) => (f: Folder): Folder => ({
  ...f,
  containers: {
    c,
    ...f.containers
  }
})

export const createContainer = (f: Folder): Folder => {
  const id = shortid.generate()
  return {
    ...f,
    [id]: {
      id,
      title: 'New container',
      afazeres: {},
      refParent: f.id
    }
  }
}
