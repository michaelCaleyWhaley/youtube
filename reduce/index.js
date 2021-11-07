// import objectExample from "./challenges/objectExample.js";
import arrayExample from "./challenges/arrayExample.js";

// const objectData = {
//   video: false,
//   image: true,
//   gif: true,
//   webp: false,
//   js: true,
//   json: false,
//   jsx: undefined,
//   css: "test",
// };
// const result = objectExample(objectData);
// console.log(`result: `, result);

const arrayData = [
  { src: "https://www.placecage.com/c/200/300", type: "jpeg" },
  { src: "https://www.placecage.com/gif/200/300", type: "gif" },
  { src: "https://www.placecage.com/g/200/300", type: "jpeg" },
  { src: "https://www.placecage.com/200/300", type: "jpeg" },
  { src: "https://www.stevensegallery.com/200/300", type: "video" },
  { src: "https://www.stevensegallery.com/200/300", type: "video" },
  { src: "https://www.stevensegallery.com/g/200/300", type: "jpeg" },
  { src: "https://www.placecage.com/gif/200/300", type: "gif" },
];
const result = arrayExample(arrayData);
console.log(`result: `, result);
