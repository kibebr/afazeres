import { EmojiDomainError } from './Emoji'
import { AfazerDomainError } from './Afazer'
import { FolderDomainError } from './Folder'
import { ContainerDomainError } from './Container'
import { UserDomainError } from './User'

export type DomainError = {
  readonly tag: 'DomainError'
  readonly error: UserDomainError | AfazerDomainError | FolderDomainError | ContainerDomainError | EmojiDomainError
}
