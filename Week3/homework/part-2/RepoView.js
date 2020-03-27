'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      
      // empty the conatainer from its old data
      this.container.textContent = '';

      // create Repository table
      const table = createAndAppend('table', this.container);

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
  }

  window.RepoView = RepoView;
}
