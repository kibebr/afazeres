import React from 'react'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as PersonIcon } from '../../assets/icons/person.svg'
import { EnlargedButton } from './EnlargedButton'

interface NavbarProps {
  onClickSearch: () => unknown
  onClickPerson: () => unknown
}

export const Navbar = ({ onClickSearch, onClickPerson }: NavbarProps): JSX.Element => (
  <nav className='flex flex-row w-full items-center'>
    <EnlargedButton classes='bg-blue-450'>
      Afazeres
    </EnlargedButton>
    <div className='flex flex-row items-center ml-auto space-x-2'>
      <button onClick={onClickSearch} className='hover:bg-gray-200 transition-colors rounded-md p-2'>
        <SearchIcon className='w-5 h-5' />
      </button>
      <button onClick={onClickPerson} className='hover:bg-gray-200 transition-colors rounded-md p-1'>
        <PersonIcon className='w-7 h-7' />
      </button>
    </div>
  </nav>
)
