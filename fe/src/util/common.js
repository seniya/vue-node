function getSiteMenu () {
  return [
    {
      icon: 'mdi-bulletin-board',
      title: '게시판',
      act: true,
      subItems: [
        {
          title: 'anyone',
          to: { path: '/board/anyone' }
        },
        {
          title: 'test',
          to: { path: '/board/test' }
        },
        {
          title: '33 Javascript',
          to: { path: '/board/javascript33' }
        }
      ]
    },
    {
      icon: 'mdi-pen',
      title: '페이지테스트',
      act: true,
      subItems: [
        {
          title: '손님용 페이지',
          to: { path: '/test/lv3' }
        },
        {
          title: '일반유저용 페이지',
          to: { path: '/test/lv2' }
        },
        {
          title: '슈퍼유저용 페이지',
          to: { path: '/test/lv1' }
        },
        {
          title: '관리자용 페이지',
          to: { path: '/test/lv0' }
        }
      ]
    },
    {
      icon: 'mdi-seat-individual-suite',
      title: '게으름',
      act: true,
      subItems: [
        {
          title: '심플 쳇팅',
          to: { path: '/study/chat-simple' }
        }
      ]
    },
    {
      icon: 'mdi-cogs',
      title: '관리메뉴',
      subItems: [
        {
          title: '사용자관리',
          to: { path: '/manage/users' }
        },
        {
          title: '페이지관리',
          to: { path: '/manage/pages' }
        },
        {
          title: '사이트관리',
          to: { path: '/manage/sites' }
        },
        {
          title: '게시판관리',
          to: { path: '/manage/boards' }
        }
      ]
    }
  ]
}

function intToMnyFormat (int) {
  if (int === null) {
    return null
  }
  return String(int).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function checkEmailFormat (email) {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  if (!regExp.test(email)) {
    return false
  }
  return true
}

export { getSiteMenu, intToMnyFormat, checkEmailFormat }
