function createHtmlSection(row, codeIndex) {
  const code = document.createElement('div');
  code.dataset.codeIndex = codeIndex;

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(`section-${colIdx === 0 ? 'tag' : 'content'}`);
    code.append(column);
  });
  let extraColumn = document.createElement('div');
  extraColumn.classList.add('section-code');
  if(codeIndex == 0) {
  	extraColumn.innerHTML = "<div class='title-head'>Hello World</div>";
  } else if(codeIndex == 1) {
  	extraColumn.innerHTML = "<style>.title-head {background: pink;font-weight: bold;font-size: 24px;text-align: center;padding: 24px;}</style>";
  } else {
  	extraColumn.innerHTML = "Open the inspector and validate that the message exists in the console";
  	console.log('Hello World script');
  }
  
  code.append(extraColumn);

  const labeledBy = code.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    code.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return code;
}

export default function decorate(block) {
	const rows = block.querySelectorAll(':scope > div');

	const container = document.createElement('div');
  	container.classList.add('html-container');
  	block.prepend(container);

  	rows.forEach((row, idx) => {
	    const code = createHtmlSection(row, idx);
	    container.append(code);

	    row.remove();
	});

}

