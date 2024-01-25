class QuickOrderForm extends SearchForm {
  constructor() {
    super();
    this.quickOrderList = this.closest('quick-order-list');
    this.quickOrderListId = this.quickOrderList.dataset.id;
    window.quickOrderSearchEnabled = true;
    window.quickOrderSearchQuery = '';
  }

  updateSections() {
    const searchTerm = this.getQuery();
    const sectionsParam = this.getSectionsToRender()
      .map((section) => section.section)
      .join(',');

    fetch(`/search?q=${encodeURIComponent(searchTerm)}&sections=${encodeURIComponent(sectionsParam)}`)
      .then((response) => response.text())
      .then((responseText) => {
        const parsedSections = JSON.parse(responseText);
        this.renderSections(parsedSections);
      });
  }

  onChange() {
    super.onChange();
    window.quickOrderSearchQuery = this.getQuery();
    this.updateSections();
  }

  onFormReset(event) {
    super.onFormReset(event);
    this.updateSections();
  }

  renderSections(parsedSections) {
    this.quickOrderList.renderSections(
      {
        sections: parsedSections,
      },
      this.getSectionsToRender()
    );
  }

  getSectionsToRender() {
    return [
      {
        id: this.quickOrderListId,
        section: this.quickOrderListId,
        selector: '.js-contents',
      },
      {
        id: this.quickOrderListId,
        section: this.quickOrderListId,
        selector: '.total-items',
      },
    ];
  }

  getSectionInnerHTML(html, selector) {
    return this.quickOrderList.getSectionInnerHTML(html, selector);
  }

  getQuery() {
    return this.input.value.trim();
  }
}

customElements.define('quick-order-form', QuickOrderForm);
