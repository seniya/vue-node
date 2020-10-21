const SITE_MENU = [
  {
    icon: 'mdi-bulletin-board',
    title: '블로그',
    act: true,
    lv: 3,
    subItems: [
      {
        title: '33 Javascript',
        to: { path: '/board/javascript33' }
      },
      {
        title: '개발이야기',
        to: { path: '/board/devTalk' }
      }
    ]
  },
  {
    icon: 'mdi-seat-individual-suite',
    title: '게으름',
    lv: 3,
    subItems: [
      {
        title: '심플 쳇팅',
        to: { path: '/study/chat-simple' }
      },
      {
        title: '노말 쳇팅',
        to: { path: '/study/chat-normal' }
      },
      {
        title: '간단 그림판',
        to: { path: '/study/paint-simple' }
      },
      {
        title: '그림 맞추기-입장',
        to: { path: '/study/paint-game-ready' }
      }
    ]
  },
  {
    icon: 'mdi-pen',
    title: '페이지테스트',
    act: true,
    lv: 0,
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
      },
      {
        title: '테스트',
        to: { path: '/study/chat-normal-test' }
      },
      {
        title: '그림 맞추기-게임',
        to: { path: '/study/paint-game-in' }
      }
    ]
  },
  {
    icon: 'mdi-cogs',
    title: '관리메뉴',
    lv: 0,
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

export { SITE_MENU }
