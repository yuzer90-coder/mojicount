const textInput = document.getElementById("textInput");

const totalCount = document.getElementById("totalCount");
const noSpaceCount = document.getElementById("noSpaceCount");
const lineCount = document.getElementById("lineCount");
const newlineCount = document.getElementById("newlineCount");

const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");

// 文字数を数える
function countCharacters() {
  const text = textInput.value;

  // 絵文字などもできるだけ正しく1文字として数える
  const segmenter = new Intl.Segmenter("ja", {
    granularity: "grapheme"
  });

  const characters = [...segmenter.segment(text)].length;

  // 空白・改行を除いた文字数
  const charactersWithoutSpaces = [
    ...segmenter.segment(text.replace(/\s/g, ""))
  ].length;

  // 改行数
  const newlines = (text.match(/\n/g) || []).length;

  // 行数（空欄なら0行）
  const lines = text === "" ? 0 : newlines + 1;

  // 画面に反映
  totalCount.textContent = characters;
  noSpaceCount.textContent = charactersWithoutSpaces;
  lineCount.textContent = lines;
  newlineCount.textContent = newlines;
}

// 入力するたびにカウント
textInput.addEventListener("input", countCharacters);

// コピー
copyButton.addEventListener("click", async () => {
  const text = textInput.value;

  if (text === "") {
    alert("コピーする文章がありません。");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert("文章をコピーしました！");
  } catch (error) {
    alert("コピーできませんでした。HTTPS接続で開いているか確認してください。");
  }
});

// クリア
clearButton.addEventListener("click", () => {
  textInput.value = "";
  countCharacters();
});

// 最初の表示
countCharacters();
