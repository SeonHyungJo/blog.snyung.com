type MENU = {
  name: string;
  url: string;
}

export const TOP_MENU: MENU[] = [
  {
    name: 'Posts',
    url: '/posts'
  },
  {
    name: 'Series',
    url: '/series'
  },
  {
    name: 'Snippets',
    url: '/snippets'
  },
  {
    name: 'Archives',
    url: '/archives'
  },
]


type SOCIAL_TYPE = 'mail' | 'github' | 'facebook' | 'book'

type SOCIAL = {
  type: SOCIAL_TYPE;
  url: string;
  iconPath: string
}

export const SOCIAL_LINK: SOCIAL[] = [
  {
    type: 'mail',
    url: 'mailto:seonhyung.jo@gmail.com',
    iconPath: '/images/common/social/social-mail.png'
  },
  {
    type: 'github',
    url: 'https://github.com/SeonHyungJo',
    iconPath: '/images/common/social/social-github.png'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/ImDevloper',
    iconPath: '/images/common/social/social-facebook.png'
  },
  {
    type: 'book',
    url: 'https://seonhyungjo.github.io/Javascript-Book/',
    iconPath: '/images/common/social/social-book.png'
  },
]