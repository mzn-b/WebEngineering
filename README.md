# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Let's get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* Use this base template to create your project repository.
* Submit your repository link once. Send me an invitation to your repository if it is set to private:
  > GitHub: leonardo1710
* Each playground must be submitted via a new branch in that repository (last commit within deadline will be graded).
  * Naming conventions of branch: <code>playground-1</code>, <code>playground-2</code>, ...
* Each playground has a total of 20 points available.

### Submission Deadlines
* [1st Playground](#1-js-playground): 23.09.2025
* [2nd Playground](#2-dependency--and-build-management-playground): 14.10.2025
* [3rd Playground](#3-accessibility--and-web-component-playground): 30.10.2025
* [4th Playground](#4-migrate-to-a-frontend-framework): 25.11.2025
* [5th Playground](#5-integrate-a-backend-framework): 17.12.2025

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:


# Coding Playground Description

## K.O. Criteria
* No JS Frameworks allowed to solve the playgrounds 1-4 (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to that!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## 1. JS Playground
The provided base project template contains bad coding and templating practices and bugs for you to fix. Take a look into the component files and get a grasp of the inner workings of the provided project. The app should provide the requirements described below. Some are implemented poorly or do not work at all. 

### App Requirements
* On page load the app requests the Wikipedia API to extract bear information from Wikipedia's [list of ursids](https://en.wikipedia.org/wiki/List_of_ursids). The page then renders the provided image, the common name, the scientific name and it's range.
  * the bears should be ordered in the same order and number (no duplicates) as in the corresponding Wiki page.
  * if there is no image available, the app should show a placeholder image.
* Users are able to toggle the comment section.
* Users are able to leave their name and a comment (both should not be empty).
* Users are able to search the web page contents using a search query, whereby only the html contents with tag <code>article</code> should be highlighted.

### Tasks
Fix application code and answer the questions:
* (4) Split the code into separate script files and make use of <b>JS modules</b>.
* (4) Fix the semantical issues in the code based on the provided requirements.
* (4) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (4) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (4) Eliminate the remaining bad coding practices that you can find. Take notes of why they are a bad practice and how you did fix it below. 

> **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**
> 
> Bad practice? Not using strict mode\
> Why is this bad? Allows silent errors, allows assigning to readonly values, allows duplicate parameter names, defaults this to window\
> Fix: Used strict mode in all files
> ```js
> 'use strict'
> ```
> 
> Bad practice? Vars used for creating variables\
> Why is this bad? Variable content can change (rebinding) unexpectedly \
> Fix? Replaced vars with consts where possible. (Important note: not immutable! → arrays could still get values added/removed, etc)
> ```js
> // Before
> var searchKey = this.q.value.trim();
> // After
> const searchKey = this.q.value.trim();
> ```
> 
> Bad practice? Using apply instead of spread syntax\
> Why is this bad? Outdated practice, less concise\
> Fix? Replace apply with spread operator
> ```js
> // Before
> node.replaceWith.apply(node, span.childNodes);
> // After
> node.replaceWith(...span.childNodes);
> ```
> 
> Bad practice? Using the "this" keyword\
> Why is this bad? undefined in strict mode, returns window in non strict mode -> just use window directly\
> Fix? Replace this with explicit values
> ```js
> // Before
> const searchKey = this.q.value.trim();
> // After
> const searchKey = e.currentTarget.q.value.trim();
> ```
>
> Bad practice? Not introducing variables\
> Why is this bad? Reduces code readability, reduces reusability\
> Fix? Introduce variables
> ```js
> // Before
> document.querySelector('.search').addEventListener('submit', function(e) {})
> // After
> const form = document.querySelector('.search');
> form.addEventListener('submit', (e) => {})
> ```
> 
> Bad practice? Using magic values\
> Why is this bad? Hard to understand without comments, gets confusing later\
> Fix? Use descriptive variables (either pre-existing or create new ones) for magic values
> ```js
> // Before
> if (node.nodeType === 3) { // Text node }
> // After
> if (node.nodeType === Node.TEXT_NODE) {}
> ```
> 
> Bad practice? Long functions with many responsibilities\
> Why is this bad? Reduces readability, reduces reusability, makes the code messy\
> Fix? Split into several functions
> ```js
> // Before
> document.querySelector('.search').addEventListener('submit', function(e) {
>    e.preventDefault();
>
>    document.querySelectorAll('.highlight').forEach(function(el) {
>      var parent = el.parentNode;
>      parent.replaceChild(document.createTextNode(el.textContent), el);
>      parent.normalize();
>    });
>
>    var searchKey = this.q.value.trim();
>    if (!searchKey) return;
>
>    var regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
>
>    function walk(node) {
>      if (node.nodeType === 3) { // Text node
>        var match = node.nodeValue.match(regex);
>        if (match) {
>          var span = document.createElement('span');
>          span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
>          node.replaceWith.apply(node, span.childNodes);
>        }
>      } 
>      else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'FORM') {
>        node.childNodes.forEach(walk);
>      }
>    }
>
>    walk(document.body);
>  });
> 
> // After
> form.addEventListener('submit', (e) => {
>    e.preventDefault();
>
>    clearHighlights(content);
>
>    const input = e.currentTarget.querySelector('[name="q"]');
>    const searchKey = input.value.trim();
>    if (!searchKey) return;
>
>    highlight(content, searchKey);
> });
>
> const clearHighlights = (root) => {
>   root.querySelectorAll('.highlight').forEach((el) => {
>   const text = document.createTextNode(el.textContent);
>   el.replaceWith(text);
>   });
>   root.normalize();
> }
>
> const getNodesToReplace = (walker, regex) => {
>   const nodesToReplace = [];
>
>   while (walker.nextNode()) {
>       const node = walker.currentNode;
>       if (regex.test(node.nodeValue)) {
>           nodesToReplace.push(node);
>       }
>   }
>
>   return nodesToReplace;
> }
>
> const highlight = (root, searchKey) => {
>   const regex = new RegExp(
>       `(${searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
>       'gi'
>   );
>
>   const walker = document.createTreeWalker(
>        root,
>        NodeFilter.SHOW_TEXT,
>        {
>            acceptNode(node) {
>                const parent = node.parentNode;
>                if (!parent) return NodeFilter.FILTER_REJECT;
>                const tag = parent.nodeName;
>                if (['SCRIPT', 'STYLE', 'FORM'].includes(tag)) {
>                    return NodeFilter.FILTER_REJECT;
>                }
>                if (parent?.classList.contains('highlight')) {
>                    return NodeFilter.FILTER_REJECT;
>                }
>                return NodeFilter.FILTER_ACCEPT;
>            }
>       }
>    );
>
>    const nodesToReplace = getNodesToReplace(walker, regex);
>
>    nodesToReplace.forEach(node => {
>        const parts = node.nodeValue.split(regex);
>        if (parts.length <= 1) {
>            return;
>        }
>
>        const fragment = document.createDocumentFragment();
>        parts.forEach((part, i) => {
>            if (i % 2 === 1) {
>                const mark = document.createElement('mark');
>                mark.className = 'highlight';
>                mark.textContent = part;
>               fragment.appendChild(mark);
>            } else {
>                fragment.appendChild(document.createTextNode(part));
>            }
>        });
>        node.replaceWith(fragment);
>    });
> };
> ```
> 
> Bad practice? Overwriting the DOM with innerHTML\
> Why is this bad? Allows XSS injection if input isn't sanitized\
> Fix? Use the built-in createElement method instead
> ```js
> // Before
> span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>')
> // After
> const mark = document.createElement('mark');
> mark.className = 'highlight';
> mark.textContent = part;
> fragment.appendChild(mark);
> ```
> 
> Bad practice? Relying on a string literal for display logic\
> Why is this bad? Very error prone (typos, etc)\
> Fix? Replace with boolean state
> ```js
> // Before
> showHideBtn.onclick = () => {
>   const showHideText = showHideBtn.textContent;
>   if (showHideText === 'Show comment') {
>       showHideBtn.textContent = 'Hide comments';
>       commentWrapper.style.display = 'block';
>   } else {
>       showHideBtn.textContent = 'Show comments';
>       commentWrapper.style.display = 'none';
>   }
> }; 
> // After
> showHideBtn.onclick = () => {
>   const isHidden = commentWrapper.classList.toggle('hidden');
>   showHideBtn.textContent = isHidden ? 'Show comments' : 'Hide comments';
> };
> ```
> 
> Bad practices? Setting a style on load of script file && using inline styles instead of classes\
> Why is this bad? Error prone, pointless resource usage && less reusability\
> Fix? Set the default style in the html or css directly && introduce more classes
> ```css
> /* Before */
> .comment-wrapper { display: block; } 
> /* After */
> .comment-wrapper { display: block; } 
> .hidden { display: none; } 
> ```
> ```js
> // Deleted
> commentWrapper.style.display = 'none';
> ```
> 
> Bad practice? Console logs in code\
> Why is this bad? Could contain sensitive information, not good for production code\
> Fix? Remove console logs
> 
> Bad practice? Assigning a function to form.onSubmit directly\
> Why is this bad? if another scripts sets the value this function get overwritten\
> Fix? Set an eventListener instead
> ```js
> // Before
> form.onsubmit = (e) => {}
> // After
> form.addEventListener('submit', (e) => {})
> ```
> 
> ### Not bad practices, just other fixes
>
> Using block returns for inline functions where not necessary (not bad, I just don't like it)
> ```js
> // Before
> (res) => {return res.json();}
> // After
> (res) => res.json()
> ```
> 
> Typos in the code
> ```js
> // Before
> const nameValue = nameField.valeu;
> // After
> const nameValue = nameField.value;
> ```


## 2. Dependency- and Build Management Playground
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). Additionally, refactor the comments section to be a web component using shadow dom and templates.

### Tasks
* (1) Integrate `npm` and a build management tool into your project.
* (5) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (3) Use ESLint and Prettier inside your project - rulesets can be found below.
* (2) Keep your builds clear and add dependencies to the right build.
* (2) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server.
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory.
  * `lint:fix`: runs and also fixes all issues found by ESLint.
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory.
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (2) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* Configure **2 Workflows** using GitHub Actions, one for development and one for deployment:
  * (2) Development Workflow should at least lint (optionally test) your code when developers push to a branch named `development`.
  * (3) Deployment Workflow is triggered when developers push into `production` branch. It should at least lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).

> 
> https://mzn-b.github.io/WebEngineering/
>
> 

**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

## 3.	Accessibility and Web Component Playground
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility of your app and write a summary of your reports below.
Additionally, refactor your project by encapsulating the comments section into a web component.

### Tasks
* Accessibility Checks:
  * (2) **Color**: Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.
  * (2) **Semantic HTML**: Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.
  * (2) **Audio**: The ``<audio>`` player isn't accessible to hearing impaired people — can you add some kind of accessible alternative for these users?
  * (2) **Forms**: 
    * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
    * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.
  * (2) **Comment Section**: The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?
  * (4) **The table**: The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

* (6) Create a web component for the "Add comment" section. Use te shadow DOM and <code>template</code> syntax to encapsulate all related styles inside the component. 


> 
> _Present your findings here..._
>
 

## 4. Migrate to a Frontend Framework
In this playground you will migrate your application to a frontend framework of your choice.

### Tasks
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...).
  * All previous features should still work.
  * The application still should use build and dependency management.
  * Make use of provided framework features for a clean project structure like components, templates, state,...
* Adapt your `npm scripts` if necessary.

## 5. Integrate a Backend Framework
In this playground you will use a backend framework of your choice and connect it over an API to your frontend application. Additionally, you will dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

### Tasks
* (3) Setup a backend framework of your choice.
* (3) Create an API your frontend will be connected to. Your backend should  request the bear data from presented Wikipedia API and serve it to your frontend.
* (2) Configure CORS to only allow requests from your frontend. 
* (2) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
    * Define ports and dependencies
    * Define corresponding stage (development, production)
    * Use environment variables if possible
* Your application should start with the following commands:
    * Development: `docker-compose -f docker-compose.yml up --build`
    * Production: `docker-compose -f docker-compose.prod.yml up --build`

---

<p>© 2025 Leon Freudenthaler (Hochschule Campus Wien). All rights reversed.</p>
