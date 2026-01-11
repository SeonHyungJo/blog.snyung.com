type MENU = {
  name: string;
  url: string;
};

export const TOP_MENU: MENU[] = [
  {
    name: "전체",
    url: "/",
  },
  {
    name: "개발",
    url: "/posts",
  },
  {
    name: "투자",
    url: "/invest",
  },
  {
    name: "아티클",
    url: "/articles",
  },
  {
    name: "소개",
    url: "/snyung",
  },
];

type SOCIAL_TYPE = "mail" | "github" | "facebook" | "book";

type SOCIAL = {
  type: SOCIAL_TYPE;
  url: string;
  iconPath: string;
};

export const SOCIAL_LINK: SOCIAL[] = [
  {
    type: "mail",
    url: "mailto:seonhyung.jo@gmail.com",
    iconPath: "/images/common/social/social-mail.png",
  },
  {
    type: "github",
    url: "https://github.com/SeonHyungJo",
    iconPath: "/images/common/social/social-github.png",
  },
  {
    type: "facebook",
    url: "https://www.facebook.com/ImDevloper",
    iconPath: "/images/common/social/social-facebook.png",
  },
  {
    type: "book",
    url: "https://seonhyungjo.github.io/Javascript-Book/",
    iconPath: "/images/common/social/social-book.png",
  },
];
