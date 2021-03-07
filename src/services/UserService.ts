export const fetchUser = async (): Promise<unknown> => await Promise.resolve({
  username: 'kibe',
  folders: [{
    id: '10',
    title: 'Health stuff',
    color: 'bg-green-400',
    containers: [{
      id: '12',
      title: 'Important',
      afazeres: [{ id: '13', content: 'Go to the medic tomorrow.' }, { id: '14', content: 'Register for the NHS.' }]
    }]
  }, {
    id: '14',
    title: 'Sports',
    color: 'bg-red-400',
    containers: [{
      id: '13',
      title: 'Football',
      afazeres: [{ id: '43', content: 'Practice for the GK course' }, { id: '16', content: 'Practice new dribles' }]
    }]
  }]
})
