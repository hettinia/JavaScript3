'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

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

  function renderRepoDetails(repo, ul) {
    // create repositories list
    const li = createAndAppend('li', ul, { class: 'repoList' });
    const div = createAndAppend('div', li, { class: 'repository' });
    // create Repository table
    const table = createAndAppend('table', div);

    // create Repository title row
    const tr1 = createAndAppend('tr', table);
    createAndAppend('td', tr1, { text: 'Repository:', class: 'title' });
    const td = createAndAppend('td', tr1);
    createAndAppend('a', td, {
			href: repo.html_url,
			text: repo.name,
			target: '_blank'
		});

    // create Description row
    const tr2 = createAndAppend('tr', table);
    createAndAppend('td', tr2, { text: 'Description:', class: 'title' });
    createAndAppend('td', tr2, { text: repo.description });

    // create Fork row
    const tr3 = createAndAppend('tr', table);
    createAndAppend('td', tr3, { text: 'Forks:', class: 'title' });
    createAndAppend('td', tr3, { text: repo.forks });

    // create Updated row
    const tr4 = createAndAppend('tr', table);
    createAndAppend('td', tr4, { text: 'Updated:', class: 'title' });
    createAndAppend('td', tr4, { text: repo.updated_at });
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      // create the page header
      createAndAppend('div', root, {
        text: 'HYF Repositories',
        class: 'head',
      });

      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root, {class: 'repoUl'});
      // sorting the repositories form A to Z
      repos.sort((currentRepo, nextRepo) => currentRepo.name.localeCompare(nextRepo.name));
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
