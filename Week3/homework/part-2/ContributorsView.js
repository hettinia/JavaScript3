'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      
      // empty the conatainer from its old data
      this.container.textContent = '';

      // create section title
      const ul = createAndAppend('ul', this.container, {
      text: 'Contributions',
      class: 'contributors-ul' 
      });

      // create the contributors list
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
  }

  window.ContributorsView = ContributorsView;
}
