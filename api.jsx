export async function random() {
  let data = await fetch("https://api.jikan.moe/v4/random/anime");
  data = await data.json();
  return data.data;
}
export async function genre(type) {
  let data = await fetch(`https://api.jikan.moe/v4/genres/${type}`);
  data = await data.json();
  return data.data;
}
export async function season(params = "") {
  const url = "https://api.jikan.moe/v4/seasons/now?sfw" + "&" + params;
  let data = await fetch(url);
  data = await data.json();
  return data;
}
export async function anime(params = "", type) {
  const url = "https://api.jikan.moe/v4/" + type + "?sfw" + "&" + params;
  let data = await fetch(url);
  data = await data.json();
  return data;
}
export async function top(params = "", type) {
  const url = "https://api.jikan.moe/v4/top/" + type + "?sfw" + "&" + params;
  let data = await fetch(url);
  data = await data.json();
  return data;
}
