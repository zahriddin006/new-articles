// form and call the elements within the form
let elSortForm = $(".js-sort-form");
let elSearchInput = $(".js-search-input", elSortForm);
let elArticlesSelect = $(".js-articles-select", elSortForm);
let elSearchBtn = $(".js-search-btn", elSortForm);

// Search Result
let elSearchResultList = $(".js-search-result-list");

// call the contents of the modal and item template
let elArticleTemplate = $(".js-article-template").content;
let elModalTemplate = $("#modal-template").content;

// API LINK
let FETCH_API = `https://newsapi.org/v2/everything?q=Rossia&from=2022-05-02&sortBy=publishedAt&apiKey=d72a82c8c0e04b67a1e597b254951eb2`;

// Invoke articles - Maqolalarnilarni chaqirib olish
let callArticles = function(newsArticleApi) {
  fetch(newsArticleApi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    renderArticles(data);
  })
}
callArticles(FETCH_API);

// search and sort data
elSortForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  
  let searchInputValue = elSearchInput.value.trim();
  let selectedOptionValue = elArticlesSelect.value;
  
  let FetchApiValue = function(api){
    if(!searchInputValue == ""){
      let api = `https://newsapi.org/v2/everything?q=${searchInputValue}&from=2022-05-02&sortBy=${selectedOptionValue}&apiKey=d72a82c8c0e04b67a1e597b254951eb2`;
      return api;
    } else{
      api = FETCH_API;
      return api;
    }
  }
  
  callArticles(FetchApiValue(FETCH_API));
})

// render articles
let renderArticles = function(useData){
  elSearchResultList.innerHTML = "";

  let elResultFragment = document.createDocumentFragment();

  useData.articles.forEach(function(article){
    let articleTemplate = elArticleTemplate.cloneNode(true);
    let modalTemplate = elModalTemplate.cloneNode(true);

    $(".article-poster", articleTemplate).src = article.urlToImage;
    $(".article-poster", articleTemplate).alt = article.title;
    $(".article-title", articleTemplate).textContent = article.title;
    $(".article-author", articleTemplate).textContent = article.author;
    $(".article-description", articleTemplate).textContent = article.description;
    $(".article-Time", articleTemplate).textContent = article.publishedAt.split("T").splice(0, 1);
    $(".js-url-link", articleTemplate).href = article.url;
    $(".js-article-modal-opener", articleTemplate).setAttribute("data-bs-target", `#contentModal${article.publishedAt.split(":").shift()}`);

    $(".more-modal", modalTemplate).id = `contentModal${article.publishedAt.split(":").shift()}`;
    $(".modal-title", modalTemplate).textContent = article.title;
    $(".content", modalTemplate).textContent = article.content;
    articleTemplate.appendChild(modalTemplate);
    elResultFragment.appendChild(articleTemplate);
  })
  elSearchResultList.appendChild(elResultFragment);
}

