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
      return this._generateMarkupPreview(currPage + 1, 'right');
    }
    //Last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupPreview(currPage - 1, 'left');
    }
    //Other page
    if (currPage < numPages) {
      return (
        this._generateMarkupPreview(currPage - 1, 'left') +
        this._generateMarkupPreview(currPage + 1, 'right')
      );
    }
  }

  _generateMarkupPreview(page, direction) {
    const nextOrPrev = direction === 'left' ? 'prev' : 'next';
    return `<button data-goto="${page}" class="btn--inline pagination__btn--${nextOrPrev}">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
      </svg>
    </button>`;
  }
}

export default new paginationView();
