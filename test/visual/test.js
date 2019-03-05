gemini.suite('vaadin-pdf-viewer', function(rootSuite) {
  function wait(actions, find) {
    return actions
      .waitForJSCondition(function(window) {
        return window.webComponentsAreReady;
      }, 90000);
  }

  function goToAboutBlank(actions, find) {
    // Firefox stops responding on socket after a test, workaround:
    return actions.executeJS(function(window) {
      window.location.href = 'about:blank'; // just go away, please!
    });
  }

  rootSuite
    .before(wait)
    .after(goToAboutBlank);

  ['lumo', 'material'].forEach(theme => {
    gemini.suite(`pdf-viewer-${theme}`, function(suite) {
      suite
        .setUrl(`/pdf-viewer.html?theme=${theme}`)
        .setCaptureElements('#pdf-viewer')
        .capture(`vaadin-pdf-viewer`);
    });

    gemini.suite(`pdf-viewer-small-${theme}`, function(suite) {
      suite
        .setUrl(`/pdf-viewer-small.html?theme=${theme}`)
        .setCaptureElements('#pdf-viewer-small')
        .capture(`vaadin-pdf-viewer`);
    });
  });

});
