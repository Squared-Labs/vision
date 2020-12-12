fetch('package.json')
  .then(response => response.json())
  .then(data => {
  	// Do something with your data
    document.getElementById("inner").rows[0].cells[1].innerHTML = `v${data.version} (API v${data.metadata.api})`;
    window.api.information.getMetadata().then(e => {
    document.getElementById("inner").rows[1].cells[1].innerHTML = e.revision;
    document.getElementById("inner").rows[2].cells[1].innerHTML = `Node.js ${e.version.node} (V8 engine; Electron v${e.version.electron})`;
    document.getElementById("inner").rows[3].cells[1].innerHTML = `${data.metadata.packagedate}`;
    if (e.flags.branch !== "production") {
      document.getElementById("inner").rows[0].cells[1].innerHTML = `v${data.version} (API v${data.metadata.api}) [DEVELOPMENT BUILD]`;
    }
    });
  });