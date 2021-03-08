'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* add class 'active' to the correct article */

    console.log('targetArticle:', targetArticle);
    targetArticle.classList.add('active');
  };

  /* NEW EXERCISE */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorListSelector = '.authors.list';

  const generateTitleLinks = function (customSelector = '') {
    console.log('customSelector:', customSelector);
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    // '.titles' [data-author="Marion Berry"]
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    let html = '';
    for (let article of articles) {
      /* get the article id */

      const articleId = article.getAttribute('id');
      // console.log('articleId:', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* create HTML of the link */

      html = html + linkHTML;
      console.log('html:', linkHTML);
    }
    /* insert link into titleList */
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    // console.log('links:', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  /* Module 7*/
  const calculateTagsParams = function (tags) {
    const params = {max: 0, min: 9999 };
    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      else if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );

    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function () {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags:', articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray:', articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    // let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };

  generateTags();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');
    console.log(event);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const articleTagsArray = document.querySelectorAll(
      'a[href="' + href + '"]'
    );
    /* START LOOP: for each found tag link */
    for (let articleTag of articleTagsArray) {
      /* add class active */
      articleTag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    console.log('links:', links);
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const calculateAuthorsParams = function (authors) {
    const params = {max: 0, min: 9999 };
    for (let author in authors) {
      if (authors[author] > params.max) {
        params.max = authors[author];
      }
      else if (authors[author] < params.min) {
        params.min = authors[author];
      }
      return params;
    }
  };

  const calculateAuthorClass = function (count, params) {
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
    return optCloudClassPrefix + classNumber;
  };

  const generateAuthors = function () {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find authors wrapper */
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthor:', articleAuthor);

      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* [NEW] add author to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* END LOOP: for each author */

      /* insert HTML of all the links into the authors wrapper */
      authorsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(optAuthorListSelector);

    /* [NEW] create variable for all links HTML code */
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);

    const allAuthorsData = {authors: []};

    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let articleAuthor in allAuthors) {
      allAuthorsData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor],
        className: calculateAuthorClass(allAuthors[articleAuthor], authorsParams)
      });
    }
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');
    console.log(event);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author', '');
    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll(
      'a.active[href^="#author"]'
    );
    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {
      /* remove class active */
      activeAuthor.classList.remove('active');
      /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const articleAuthors = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for (let articleAuthor of articleAuthors) {
      /* add class active */
      articleAuthor.classList.add('active');
      /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    /* find all links to authors */
    const links = document.querySelectorAll('a[href^="#author"]');
    console.log('links:', links);
    /* START LOOP: for each link */
    for (let link of links) {
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();

}
