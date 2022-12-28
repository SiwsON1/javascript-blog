{
  'use strict';
  /*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    /*console.log('Link was clicked!');
    console.log(event); */

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    /*console.log('clickedElement:', clickedElement);*/
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags',
    optTitleListSelector = '.titles',
    optTagsListSelector = '.tags .list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optArticleAuthorSelector = '.post-author';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector =''){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('ID');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      html = html + linkHTML;
    }

    /* insert link into titleList */
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');


    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }


  }

  generateTitleLinks();

// eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags){
    let params = {};
    params.max = 0;
    params.min = 9999;
    for(let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.max);
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }

    return params;
  }

  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;

  }

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){
      const tagsList = article.querySelector(optArticleTagsSelector);

      let htmlTag = '';
      const tags = article.getAttribute('data-tags');

      const splitTags = tags.split(' ');

      for(let splitTag of splitTags){
        const tagHTML = '<li><a href="#tag-' + splitTag + '">' +  splitTag  + '</a></li>';

        htmlTag = htmlTag + tagHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[splitTag]) {
          /* [NEW] add tag to allTags object */
          allTags[splitTag] = 1;
        }else {
          allTags[splitTag]++;
        }
      }
      tagsList.innerHTML = htmlTag;
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      console.log('TO tagi' + tag);
      /* [NEW] generate code of a link and add it to allTagsHTML */

      const tagLinkHTML = '<li><a href="#tag-' + tag + '"class="' + calculateTagClass(allTags[tag], tagsParams) + '">' +  tag  + '</a></li>';
      allTagsHTML += tagLinkHTML;

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList*/

    tagList.innerHTML = allTagsHTML;

    console.log('TO KODY HTML' + allTagsHTML);


  }

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
    console.log('Tag was clicked!');
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      activeTag.classList.remove('active');
      /* remove class active */

    /* END LOOP: for each active tag link */
    }


    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let hrefTag of hrefTags){
      hrefTag.classList.add('active');
      console.log(hrefTag);
    }
    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log('zakończona');


  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){

    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');
    console.log(links);
    /* START LOOP: for each link */
    for(let link of links){
      link.addEventListener('click', tagClickHandler);
    }
    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  }

  addClickListenersToTags();




// eslint-disable-next-line no-inner-declarations
  function generateAuthors(){
    console.log('generowanie autorów dziala')
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){
      const tagsList = article.querySelector(optArticleAuthorSelector);

      let htmlTag = '';
      const tags = article.getAttribute('data-author');
      const tagHTML = '<li><a href="#tag-' + tags + '">' +  tags + '</a></li>';
      htmlTag = htmlTag + tagHTML;
      tagsList.innerHTML = htmlTag;
    }


  }

  generateAuthors();

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event){

    console.log('author was clicked!');
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log( 'hrefy wyglądaja tak' + href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log( 'tagi wyglądaja tak' + tag);

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log( 'aktywne tagi' + activeTags);

    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      activeTag.classList.remove('active');
      /* remove class active */

    /* END LOOP: for each active tag link */
    }


    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let hrefTag of hrefTags){
      hrefTag.classList.add('active');
      console.log(hrefTag);
    }
    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + tag + '"]');
    console.log('zakończona');
  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors(){

    /* find all links to tags */
    const links = document.querySelectorAll('.post-author a');
    console.log(links);
    /* START LOOP: for each link */
    for(let link of links){
      link.addEventListener('click', authorClickHandler);
    }
    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
  }

  addClickListenersToAuthors();




}
