"use strict";
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log("Link was clicked!");
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* add class 'active' to the clicked link */

    console.log("clickedElement:", clickedElement);
    clickedElement.classList.add("active");

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(".post");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log("articleSelector:", articleSelector);

    /* articleSelector = "#article-1" */
    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log("targetArticle:", targetArticle);

    /* add class 'active' to the correct article */

    console.log("targetArticle:", targetArticle);
    targetArticle.classList.add("active");
  };

  /* NEW EXERCISE */
  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list";

  function generateTitleLinks() {
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = "";

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    let html = "";
    for (let article of articles) {
      /* get the article id */

      const articleId = article.getAttribute("id");
      console.log("articleId:", articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      console.log("article:", articleId, articleTitle);

      /* create HTML of the link */

      html = html + linkHTML;
      console.log("html:", linkHTML);
    }
    /* insert link into titleList */
    titleList.innerHTML = html;
  }
  generateTitleLinks();
  const links = document.querySelectorAll(".titles a");
  console.log("links:", links);

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

/* Module 7*/
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("tags");
    console.log("articleTags:", articleTags);
    /* split tags into array */
    /* START LOOP: for each tag */
    /* generate HTML of the link */
    /* add generated code to html variable */
    /* END LOOP: for each tag */
  }
  /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article: */
}

generateTags();
