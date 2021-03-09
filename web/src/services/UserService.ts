export const fetchUser = async (): Promise<unknown> => await Promise.resolve({
  username: 'kibe',
  folders: {
    10: {
      id: '10',
      title: 'Health stuff',
      color: 'bg-green-400',
      containers: {
        13: {
          id: '13',
          title: 'Football',
          refParent: '10',
          afazeres: {
            4323: {
              id: '4323',
              content: 'Go to the doctor on Thursday'
            },
            1231: {
              id: '1231',
              content: 'Register for the NHS'
            }
          }
        }
      }
    },
    14: {
      id: '14',
      title: 'Sports',
      color: 'bg-red-400',
      containers: {
        131414: {
          id: '131414',
          title: 'Most important',
          refParent: '14',
          afazeres: {
            43: {
              id: '43',
              content: 'Practice for'
            },
            16: {
              id: '16',
              content: 'Just practice'
            }
          }
        }
      }
    }
  }
})
