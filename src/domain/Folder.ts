import { AfazeresContainer } from './AfazeresContainer'

export interface Folder {
  id: string
  title: string
  color: string
  afazeresContainers: AfazeresContainer[]
}

export const deleteFolderFrom = (f: Folder) => (fs: Folder[]): Folder[] => fs.filter((_f) => _f.id !== f.id)
