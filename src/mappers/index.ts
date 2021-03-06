import { User } from '../domain/User'
import { fetchUser } from '../services/UserService'
import { string, object, array } from 'zod'

const userResponseV = object({
  username: string(),
  folders: array(object({
    id: string(),
    name: string(),
    color: string(),
    afazeresContainers: array(object({
      content: string()
    }))
  }))
})

export const getUser = async (): Promise<User> => await fetchUser().then(userResponseV.parse)
