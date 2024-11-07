import { getConfigValue } from '../../scripts/configs.js';

function createHtmlSection(row, codeIndex) {
  const code = document.createElement('div');
  code.dataset.codeIndex = codeIndex;
  var scriptText = "";

  /* Use graphQL demo */
  fetch('https://api.giphy.com/v1/gifs/random?api_key=I9Se32B3bQUzWak93vX8A36WTVHTLxCa')
    .then(res => res.json())
    .then(res => myGreeting(res));
    
  function myGreeting(res) {
    const { data } = res; 

    const { url } = data.images.original;

    const img = document.createElement('img');
        img.src = url;
        //document.body.append( img );
  }

  QueryDemo();


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

export async function QueryDemo() {
  const headers = {
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  };

  const apiCall = new URL(await getConfigValue('commerce-endpoint'));

  fetch(apiCall, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `{
          country (
              id: "US"
          ) {
              id
              full_name_english
          }

          categories(
              filters: {
                  name: {
                      match: "Coffe"
                  }
              }
          ) {
              items {
                  name
                  products(
                      pageSize: 20,
                      currentPage: 1
                  ) {
                      items {
                          sku
                      }
                  }
              }
          }
      }`
    })
  })
    .then(res => res.json())
    .then(res => myResult(res));
    
  function myResult(res) {
    const { data } = res;
  }

  return data;
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

