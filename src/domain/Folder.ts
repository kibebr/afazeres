import { Container } from './Container'

export interface Folder {
  id: string
  title: string
  color: string
  containers: Container[]
}

export const deleteFolderFrom = (f: Folder) => (fs: Folder[]): Folder[] => fs.filter((_f) => _f.id !== f.id)

export const addContainerTo = (c: Container) => (f: Folder): Folder => ({ ...f, containers: f.containers.concat(c) })
