const { inputRequired } = require("./templates/utils");

const POST_TYPES = [
  {
    "type": "일반적인 글",
    "value": "posts",
  },
  {
    "type": "투자관련 글",
    "value": "investing",
  },
  {
    "type": "위스키관련 글",
    "value": "homebar",
  },
  {
    "type": "내가 알리고 싶은 글",
    "value": "articles",
  },
];

const COMMON_PROMPT = [
  {
    type: "input",
    name: "title",
    message: "제목을 입력해주세요: ",
    validate: inputRequired("title"),
  },
  {
    type: "list",
    name: "postType",
    message: "작성하려는 글의 유형을 선택해주세요: ",
    choices: POST_TYPES,
  },
  {
    type: "input",
    name: "tags",
    message: "태그를 입력해주세요(선택, 다수일 경우 ,콤마로 구분)",
  },
];

module.exports = plop => {
  plop.setGenerator("post", {
    prompts: [...COMMON_PROMPT],
    actions: data => {
      data.createdDate = new Date().toISOString().split("T")[0];
      data.path = data.createdDate + "--" + data.title;

      if (data.tags) {
        data.tags = `\ntags: [${data.tags.split(",")}]`;
      } else {
        data.tags = "\ntags: []";
      }

      return [
        {
          type: "add",
          path: "./{{postType}}/{{path}}.mdx",
          templateFile: "templates/post-mdx.template",
        },
      ];
    },
  });
};