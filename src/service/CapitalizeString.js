export function capitalizeString(category) {
  var newStr = category.replace(/-/g, " ");
  const words = newStr.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}
