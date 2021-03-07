import { User } from '../domain/User'
import { fetchUser } from '../services/UserService'
import { string, object, array } from 'zod'

const AfazerV = object({
  id: string(),
  content: string()
})

const ContainerV = object({
  id: string(),
  title: string(),
  afazeres: array(AfazerV)
})

const FolderV = object({
  id: string(),
  title: string(),
  color: string(),
  containers: array(ContainerV)
})

const UserV = object({
  username: string(),
  folders: array(FolderV)
})

export const getUser = async (): Promise<User> => await fetchUser().then(UserV.parse)
