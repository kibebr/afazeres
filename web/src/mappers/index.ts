import { User } from '../domain/User'
import { fetchUser } from '../services/UserService'
import { string, object, record } from 'zod'

const AfazerV = object({
  id: string(),
  content: string()
})

const ContainerV = object({
  id: string(),
  title: string(),
  refParent: string(),
  afazeres: record(AfazerV)
})

const FolderV = object({
  id: string(),
  title: string(),
  color: string(),
  containers: record(ContainerV)
})

const UserV = object({
  username: string(),
  folders: record(FolderV)
})

export const getUser = async (): Promise<User> => await fetchUser().then(UserV.parse)
