(function() {
  function getEnvironment() {
    var hour = new Date().getHours();
    // var hour = 12;
    return (hour >= 19 || hour < 6) ? "dark" : "light";
  }

  function addStylesheet(name) {
    link = document.createElement('link');
    link.href = window.location.origin + '/assets/css/' +
      getEnvironment() + '/' + name + '.css';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';

    document.getElementsByTagName('head')[0].appendChild(link);
  }

  addStylesheet('solarized');
  addStylesheet('theme');
})();
