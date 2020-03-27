'use strict';

{
  // root div declaration
  const root = document.getElementById('root');

  // this function will fetch JSON data using async/await and axios
  async function fetchJSON(url) {

    try {

      const response = await axios.get(url);
      // throw the error if exists
      if (!response.statusText) {
        throw new Error(`Network error: ${response.status},${response.statusText}`);
      }
      const resData = await response.data;
      // return the fetched data
      return resData;

    } 
    catch (error) {
      // catch the error if exists
      printError(error);
  
    }
  }

  // this function create and append elements
  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  // this function render the selected Repository details
  function renderRepoDetails(repo, repoContainer) {
    // create Repository table
    const table = createAndAppend('table', repoContainer);

    // create Repository title row
    const titleTr = createAndAppend('tr', table);
    createAndAppend('td', titleTr, { text: 'Repository:', class: 'title' });
    const td = createAndAppend('td', titleTr);
    createAndAppend('a', td, {
			href: repo.html_url,
			text: repo.name,
			target: '_blank'
		});

    // create Description row
    const descriptionTr = createAndAppend('tr', table);
    createAndAppend('td', descriptionTr, { text: 'Description:', class: 'title' });
    createAndAppend('td', descriptionTr, { text: repo.description });

    // create Fork row
    const forksTr = createAndAppend('tr', table);
    createAndAppend('td', forksTr, { text: 'Forks:', class: 'title' });
    createAndAppend('td', forksTr, { text: repo.forks });

    // create Updated row
    const updatedTr = createAndAppend('tr', table);
    createAndAppend('td', updatedTr, { text: 'Updated:', class: 'title' });
    createAndAppend('td', updatedTr, { text: repo.updated_at });
  }

  // this function render the Contributions details
  async function renderContributorsDetails(repo, contributorsContainer) {
    // create section title
    const ul = createAndAppend('ul', contributorsContainer, {
      text: 'Contributions',
      class: 'contributors-ul' 
    });

    // fetch contributors data 
    try {
      const contributors = await fetchJSON(repo.contributors_url);
      // create contributors list
      contributors.forEach( Contributor => {
        const li = createAndAppend('li', ul, { class: 'Contributor-li' });
        const ContributorDiv = createAndAppend('div', li, { class: 'Contributor-div' });

        // create contributor image
        createAndAppend('img', ContributorDiv, { 
          class: 'contributors-img',
          src: Contributor.avatar_url, 
        });

        // create contributor name
        createAndAppend('a', ContributorDiv, { 
          class: 'contributors-a',
          text: Contributor.login,
          href: Contributor.html_url,
          target: '_blank', 
        });

        // create contributors number
        createAndAppend('span', ContributorDiv, { 
          class: 'contributors-span',
          text: Contributor.contributions, 
        });
      });
    }
    catch(err) {
      // catch the error if exists
      printError(err);
    }
  }

  // this function removes all childs of passed element
  function removeElems(elem) {
    while (elem.lastElementChild) {
      elem.removeChild(elem.lastElementChild);
    }
  }

  // this function print the catched error to window
  function printError(err) {
    createAndAppend('div', root, {
      text: err.message,
      class: 'alert-error',
    });
  }

  // this is the main function
  async function main(url) {
    // fetch Repositories data 
    try {
      const repos = await fetchJSON(url);
      // declare the DOM elements for list and containers
      const reposList = document.getElementById('repos-List');
      const repoContainer = document.querySelector('.repo-container');
      const contributorsContainer = document.querySelector('.contributors-container');

      // sorting the repositories form A to Z
      repos.sort((currentRepo, nextRepo) => currentRepo.name.localeCompare(nextRepo.name));

      // filling the dropdown list with sorted repositories titles
      repos.forEach(repo => {
        createAndAppend('option', reposList, { text: repo.name, value: repo.name });
      });

      // display information about the first repository
      renderRepoDetails(repos[0], repoContainer);
      renderContributorsDetails(repos[0], contributorsContainer);

      // refreshed for the newly selected repository when the user changes the selection
      reposList.addEventListener('change', () => {
        // empty the containers from old data when the user changes the selection
        removeElems(repoContainer);
        removeElems(contributorsContainer);
        // find the selected repository and render the details
        let currentRepo = repos.filter( repo => repo.name == reposList.value );
        renderRepoDetails(currentRepo[0], repoContainer);
        renderContributorsDetails(currentRepo[0], contributorsContainer);
      });
      
    }
    catch(err) {
       // catch the error if exists
       printError(err);
    }
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
