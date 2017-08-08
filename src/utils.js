'use strict';

const $ = window.$;
const cloneFirst = $collection => $collection.children().first().clone();
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

function createTab($tabs, options = {}) {
  const { id, label, title } = options;
  const $tab = cloneFirst($tabs);
  const $anchor = $tab.children('a');

  // Adjust label and title.
  const anchorTitle = title ||
    `Switch to tab panel which contains package installation command for ${label}`;
  $anchor.text(label);
  $anchor.attr({ href: `#${id}`, 'aria-controls': id, title: anchorTitle });

  // Set tab state.
  $anchor.attr('aria-expanded', false);
  $anchor.attr('aria-selected', false);
  $tab.removeClass('active');

  return $tab;
}

function createPanel($panels, options = {}) {
  const { id, label, script, prompt = true } = options;
  const $panel = cloneFirst($panels);
  const $copyButton = $panel.find('.copy-button button');
  const $installScript = $panel.find('.install-script');

  $panel.attr('id', id);
  $copyButton
    .attr('id', `${id}-button`)
    .attr('aria-label', `Copy the ${label} command`);
  $installScript
    .attr('id', `${id}-text`)
    .children('span').text(script);

  // Add embedded style for displaying prompt sign.
  if (prompt) {
    const prompt = `#${id} .install-script span::before { content: "> "; }`;
    $('<style/>').text(prompt).appendTo(document.head);
  }

  // Set panel state.
  $panel.removeClass('active');

  return $panel;
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
