'use strict';

const {
  createTab,
  createPanel,
  configureCopyButton,
  setFontFamily
} = require('./utils');
const $ = window.$;

const $title = $('.package-title h1');
const $tabs = $('.install-tabs .nav-tabs');
const $panels = $('.install-tabs .tab-content');
const pkg = getPackageInfo();

// Monospace fontsack from:
// https://css-tricks.com/snippets/css/font-stacks/
const fonts = [
  'Consolas',
  'Menlo',
  'Monaco',
  // linux fonts
  'DejaVu Sans Mono',
  'Bitstream Vera Sans Mono',
  'Liberation Mono',
  'Nimbus Mono L',
  // fallback
  'Courier New',
  'monospace'
];
setInstallationSriptFont(fonts);

addInstallationInstructions({
  id: 'paket-cli',
  label: 'Paket CLI',
  script: `paket add ${pkg.name} --version ${pkg.version}`,
  active: true
});

function setInstallationSriptFont(fonts) {
  return setFontFamily('.tab-pane .install-script', fonts);
}

function addInstallationInstructions(options = {}) {
  const { position, active = false } = options;
  const $newPanel = createPanel($panels, options);
  insertAt($newPanel, $panels, position);
  configureCopyButton(options.id);
  const $newTab = createTab($tabs, options);
  insertAt($newTab, $tabs, position);
  if (active) $newTab.find('[role=tab]').tab('show');
}

function getPackageInfo() {
  const title = $title.text().trim();
  const [name, version] = title.split(/\s+/g);
  return { name, version };
}

function insertAt($el, $dest, position = 0) {
  if (!position) return $dest.append($el);
  return $dest.children().eq(position - 1).before($el);
}
