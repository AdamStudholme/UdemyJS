import { state } from '../model.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = `Error loading pagination.`;
  _message = '';

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotToPage = +btn.dataset.goto;
      handler(gotToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Pag1 and other pages
    if (currPage === 1 && numPages > 1) {
      return `<button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //Last page
    if (currPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>`;
    }
    //Other page
    if (currPage < numPages) {
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //Page 1 no other pages
    return '';
  }

  _generateMarkupPreview(page, direction) {
    const nextOrPrev = direction === left ? 'prev' : 'next';
    return `<button data-goto="${page}" class="btn--inline pagination__btn--${nextOrPrev}">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
      </svg>
    </button>`;
  }
}

export default new paginationView();
