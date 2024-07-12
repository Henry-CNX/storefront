function createHtmlSection(row, codeIndex) {
  const code = document.createElement('div');
  code.dataset.codeIndex = codeIndex;

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(`section-${colIdx === 0 ? 'tag-explanatory' : 'content-explanatory'}`);
    code.append(column);
  });
  let extraColumn = document.createElement('div');
  extraColumn.classList.add('section-code-explanatory');

  const codeBy = code.querySelectorAll('.section-content-explanatory p');
  var allText = "";
  var scriptText = "";

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
  } else {
    extraColumn.setAttribute('id', 'script');
    scriptText = allText.trim();
  }
  
  code.append(extraColumn);
  
  return [code,scriptText];
}

export default function decorate(block) {
	const rows = block.querySelectorAll(':scope > div');
  var codeEnd = "";

	const container = document.createElement('div');
  	container.classList.add('html-container-explanatory');
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

