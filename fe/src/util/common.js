function getSiteMenu () {
  return [
    {
      icon: 'mdi-view-dashboard',
      title: '현황',
      act: true,
      subItems: [
        {
          title: '오늘',
          to: {
            path: '/'
          }
        }
      ]
    },
    {
      icon: 'mdi-chat',
      title: '끄적끄적',
      act: true,
      subItems: [
        {
          icon: 'home',
          title: 'anyone',
          to: {
            path: '/board/anyone'
          }
        },
        {
          icon: 'home',
          title: 'test',
          to: {
            path: '/board/test'
          }
        }
      ]
    },
    {
      icon: 'mdi-pen',
      title: '레벨테스트',
      act: true,
      subItems: [
        {
          icon: 'mdi-home',
          title: '손님용 페이지',
          to: {
            path: '/test/lv3'
          }
        },
        {
          icon: 'mdi-paw',
          title: '일반유저용 페이지',
          to: {
            path: '/test/lv2'
          }
        },
        {
          icon: 'mdi-pan',
          title: '슈퍼유저용 페이지',
          to: {
            path: '/test/lv1'
          }
        },
        {
          icon: 'mdi-parachute',
          title: '관리자용 페이지',
          to: {
            path: '/test/lv0'
          }
        }
      ]
    },
    {
      icon: 'mdi-cogs',
      title: '관리메뉴',
      subItems: [
        {
          icon: 'mdi-face',
          title: '사용자관리',
          to: {
            path: '/manage/users'
          }
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: '페이지관리',
          to: {
            path: '/manage/pages'
          }
        },
        {
          icon: 'mdi-sitemap',
          title: '사이트관리',
          to: {
            path: '/manage/sites'
          }
        },
        {
          icon: 'mdi-bulletin-board',
          title: '게시판관리',
          to: {
            path: '/manage/boards'
          }
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
