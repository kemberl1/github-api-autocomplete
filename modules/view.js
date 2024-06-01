

export class View {

	constructor() {
		this.app = document.querySelector('.container')

		this.title = this.createElement('h1', 'title')
		this.title.textContent = 'GitHub API Autocomplete';

		this.searchInput = this.createElement('input', 'search-input', 'text', 'Search for repositories...')
		this.searchResults = this.createElement('ul', 'search-results')
		this.repoList = this.createElement('ul', 'repo-list')


		this.app.append(this.title)
		this.app.append(this.searchInput)
		this.app.append(this.searchResults)
		this.app.append(this.repoList)
	}

	createElement(elementTag, elementClass, inputType, inputPlaceholder) {
		const element = document.createElement(elementTag)
		if (elementClass) {
			element.classList.add(elementClass)
		}
		if (elementTag === 'input') {
			element.type = inputType;
			element.placeholder = inputPlaceholder;
		}
		return element;
	}

	createSearchItem(item) {
		const repoItem = this.createElement('li', 'repo-item');
		repoItem.textContent = item.name;
		this.searchResults.append(repoItem)
		repoItem.addEventListener('click', () => {
			this.createRepoList(item)})
	}

	createRepoList(repo) {
		const repoInfo = this.createElement('li', 'repo-list__item');
		repoInfo.insertAdjacentHTML('afterbegin',
			`<span>Name: ${repo.name}<br>
		 Owner: ${repo.owner.login}<br>
		 Stars: ${repo.stargazers_count}
		 </span>`
		)
		this.repoList.append(repoInfo)

		const removeBtn = this.createElement('button', 'remove-btn');
		removeBtn.textContent = '✖';
		this.repoList.addEventListener('click', (event) => {
      this.handleRemove(event);
    });

		repoInfo.append(removeBtn);
		this.repoList.append(repoInfo);
		this.clearSearch()
		this.searchInput.value = ''
		
		return repoInfo;
	}

	clearSearch() {
		this.searchResults.textContent = '';
	}

	 handleRemove(event) {
    if (event.target.classList.contains('remove-btn')) {
      const item = event.target.closest('.repo-list__item');
      item.remove();
    }
  }
}
