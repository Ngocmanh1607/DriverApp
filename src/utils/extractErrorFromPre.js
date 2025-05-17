export default function extractErrorMessageFromHTML(htmlText) {
  const match = htmlText.match(/Error:\s*(.*?)<br>/);
  return match ? match[1] : 'Đã xảy ra lỗi không rõ!';
}
