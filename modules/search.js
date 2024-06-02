import { View } from './view.js';

const REPO_PER_REQUIRE = 5;
export class Search extends View {
	constructor() {
		super()
		this.searchInput.addEventListener('input', this.debounce(this.searchRepo.bind(this), 400))
	}

	async searchRepo() {
		if (this.searchInput.value.trim(' ') != '') {
			try {
				this.clearSearch()
				return await fetch(`https://api.github.com/search/repositories?q=${this.searchInput.value}&per_page=${REPO_PER_REQUIRE}`)
					.then(res => res.json())
					.then(data => data.items.forEach(data => this.createSearchItem(data)))
			} catch (error) {
				console.log(error)
			}
		}
		this.clearSearch()
	}

	debounce(callback, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				callback.apply(this, args)
			}, delay)
		}
	}
}