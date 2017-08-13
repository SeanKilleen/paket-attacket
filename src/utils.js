'use strict';

const $ = window.$;
const quote = str => str.match(/\s+/) ? `"${str}"` : str;

module.exports = {
  setFontFamily,
  createTab,
  createPanel,
  configureCopyButton
};

function setFontFamily(selector, fonts = []) {
  const fontFamily = fonts.map(it => quote(it)).join(',');
  const fontStyle = `${selector} { font-family: ${fontFamily} !important; }`;
  $('<style/>').text(fontStyle).appendTo(document.head);
}

function createTab(options = {}) {
  const { id, label, title } = options;
  const anchorTitle = title ||
    `Switch to tab panel which contains package installation command for ${label}`;

  return $(`
    <li role="presentation">
      <a
        href="#${id}"
        aria-expanded="false"
        aria-selected="false"
        aria-controls="${id}"
        role="tab"
        data-toggle="tab"
        title="${anchorTitle}">
        ${label}
      </a>
    </li>`);
}

function createPanel(options = {}) {
  const { id, label, script, prompt = true } = options;

  // Add embedded style for displaying prompt sign.
  if (prompt) {
    const prompt = `#${id} .install-script span::before { content: "> "; }`;
    $('<style/>').text(prompt).appendTo(document.head);
  }

  return $(`
    <div role="tabpanel" class="tab-pane" id="${id}">
      <div>
        <div class="install-script" id="${id}-text">
          <span>${script}</span>
        </div>
        <div class="copy-button">
          <button
            id="${id}-button"
            class="btn btn-default btn-warning"
            type="button"
            data-toggle="popover"
            data-placement="bottom"
            data-content="Copied."
            aria-label="Copy the ${label} command">
            <span class="ms-Icon ms-Icon--Copy" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>`);
}

function configureCopyButton(id) {
  const $btn = $(`#${id}-button`);
  const $cmd = $(`#${id}-text`);

  $btn.popover({ trigger: 'manual' });
  $btn.click(() => {
    const text = $cmd.text().trim();
    window.nuget.copyTextToClipboard(text, $btn);
    $btn.popover('show');
    setTimeout(() => $btn.popover('destroy'), 1000);
  });
}
