import { Folder } from './Folder'

export interface User {
  username: string
  folders: { [key: string]: Folder }
}
