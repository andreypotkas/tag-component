class Component {
  constructor() {
    this.currentTagList = [];
    this.isReadonlyMode = false;
    this.initElems();
    this.initHandlers();
  }

  initElems() {
    this.addingTagBtn = document.querySelector('.adding-tags-btn');
    this.addingTagInput = document.querySelector('.adding-tags-input');
    this.tagsContainer = document.querySelector('.tags-container');
    this.tagListToggler = document.querySelector('.toggler-tag-list');
    this.clearTagListBtn = document.querySelector('.clear-tag-list');
    this.setTagListToLsBtn = document.querySelector('.set-tag-list-ls');
    this.getTagListFromLsBtn = document.querySelector('.get-tag-list-ls');
    this.readonlyModeBtn = document.querySelector('.readonly-mode-btn');
  }

  initHandlers() {
    document.addEventListener('click', (event) => {
      const target = event.target;

      if (target.classList.contains('tag-remove-btn'))
        target.parentNode.remove();
    });
    this.addingTagBtn.onclick = () => this.renderTag(this.addingTagInput.value);
    this.tagListToggler.onchange = () => this.toggleTagListVisibility();
    this.clearTagListBtn.onclick = () => this.clearTagList();
    this.setTagListToLsBtn.onclick = () => this.setTagListToLs();
    this.getTagListFromLsBtn.onclick = () => this.getTagListFromLs();
    this.readonlyModeBtn.onchange = () => this.toggleReadonlyMode();
  }

  renderTag(tagContent) {
    const tag = this.createTag(tagContent);
    this.tagsContainer.append(tag);
    this.addingTagInput.value = '';
    this.currentTagList.push(tagContent);
  }

  createTag(content) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.innerHTML = `
      <div class="tag-content">${content}</div>
      <button class="tag-remove-btn">&#10006;</button>
    `;
    return tag;
  }

  toggleTagListVisibility() {
    this.tagsContainer.classList.contains('hide')
      ? this.tagsContainer.classList.remove('hide')
      : this.tagsContainer.classList.add('hide');
  }

  clearTagList() {
    this.tagsContainer.innerHTML = '';
    this.currentTagList = [];
  }

  getTagListFromLs() {
    const tagList = localStorage.getItem('tags').split(',');
    tagList.forEach((item) => {
      this.renderTag(item);
    });
  }

  setTagListToLs() {
    localStorage.setItem('tags', this.currentTagList);
  }

  toggleReadonlyMode() {
    this.isReadonlyMode
      ? this.disableReadonlyMode()
      : this.enableReadonlyMode();
  }

  enableReadonlyMode() {
    this.isReadonlyMode = true;
    document.querySelectorAll('button').forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
  }

  disableReadonlyMode() {
    this.isReadonlyMode = false;
    document.querySelectorAll('button').forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
}
export { Component };
