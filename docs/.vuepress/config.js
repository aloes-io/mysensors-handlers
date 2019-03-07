module.exports = {
  title: 'MySensors Handlers',
  base: '/mysensors-handlers/',
  dest: 'public',
  themeConfig: {
    logo: '/logo.png',
    repo: 'https://framagit.org/aloes/mysensors-handlers',
    repoLabel: 'Git',
    docsDir: 'docs',
    nav: [{text: 'mySensors', link: '/mysensors/'}],
    sidebar: [['/readme/', 'Readme'], ['/mysensors/', 'mySensors']],
    serviceWorker: {
      updatePopup: true, // Boolean | Object, default to undefined.
      // If set to true, the default text config will be:
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    },
  },
};
