function createHtmlSection(row, codeIndex) {
  const code = document.createElement('div');
  code.dataset.codeIndex = codeIndex;
  var scriptText = "";

  /* Use graphQL demo */
  const resp   = fetch('https://api.giphy.com/v1/gifs/random?api_key=I9Se32B3bQUzWak93vX8A36WTVHTLxCa');
  const { data } = resp.json(); 

  const { url } = data.images.original;

  const img = document.createElement('img');
        img.src = url;
        document.body.append( img );
  /* END: Use graphQL demo */

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    const codeBy = column.querySelectorAll('p');
    var allText = "";

    if(colIdx === 1) {
      let extraColumn = document.createElement('div');
      extraColumn.classList.add('section-code');

      if(codeBy.length > 1) {
        codeBy.forEach(function(paragraph) {
          allText += paragraph.textContent + " ";
        });
      } else {
        allText = codeBy[0].textContent;
      }

      if(codeIndex == 0) {
        extraColumn.setAttribute('id', 'code');
        extraColumn.innerHTML = allText.trim().replace(/‘|’/g, '"');
      } else if(codeIndex == 1) {
        extraColumn.setAttribute('id', 'css');
        extraColumn.innerHTML = "<style>"+ allText.trim().replace(/‘|’/g, '"'); +"</style>";
      } else if(codeIndex == 2) {
        extraColumn.setAttribute('id', 'script');
        scriptText = allText.trim();
      }

      code.append(extraColumn);
    }
  
  });

  return [code,scriptText];
}

export default function decorate(block) {
	const rows = block.querySelectorAll(':scope > div');
  var codeEnd = "";

	const container = document.createElement('div');
  	container.classList.add('html-container');
  	block.prepend(container);

  	rows.forEach((row, idx) => {
      const [code,scriptText] = createHtmlSection(row, idx);
      container.append(code);
      if(scriptText != "") {
        codeEnd = scriptText.replace(/‘|’/g, '"');
      }
      row.remove();
    });

    var script = document.createElement('script');
    script.innerHTML = codeEnd;
    document.body.appendChild(script);

}

