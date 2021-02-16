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

  function generateTitleLinks(customSelector = "") {
    /* remove contents of titleList */

    const titleList = document.querySelector(
      optTitleListSelector + customSelector
    );

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

    const links = document.querySelectorAll(".titles a");
    console.log("links:", links);

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  }
  generateTitleLinks();

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
      const articleTags = article.getAttribute("data-tags");
      console.log("articleTags:", articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split("data-tags");
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log("tag:", tag);
        /* generate HTML of the link */
        const linkHTML =
          '<li><a href="#tag-' +
          articleTags +
          '"><span>' +
          articleTagsArray +
          "</span></a></li>";
        console.log("tag:", articleTags, articleTagsArray);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }

  generateTags();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log("Tag was clicked!");
    console.log(event);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log("href:", href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace("#tag-", "");
    /* find all tag links with class active */
    document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove("active");
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let articleTag of articleTagsArray) {
      /* add class active */
      targetArticleTag.classList.add("active");
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll("data-tags");
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener("click", tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
}
