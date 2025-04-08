// CSV-header
let queryResultsText = 'Placement,Domain,PageURL,Keyword\n';

// Hent søgeordet fra søgefeltet
const keyword = document.querySelector('[name="q"]').value;

// Vælg alle h3-elementer, der er inde i et anker inden for #rso
const results = document.querySelectorAll('#rso a h3');

// For hvert h3-element findes det tilhørende anker og URL'en udtrækkes
results.forEach((h3, index) => {
  const anchor = h3.closest('a');
  try {
    const fullpath = anchor.href;
    const url = new URL(fullpath);
    const domain = url.host;
    queryResultsText += (index + 1) + "," + domain + "," + fullpath + "," + keyword + "\n";
  } catch (err) {
    console.log('Unable to register result from: ' + (anchor ? anchor.innerHTML : h3.outerHTML));
  }
});

// Kopiér den genererede CSV-tekst til udklipsholderen
copyTextToClipboard(queryResultsText);

function copyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'lykkedes' : 'fejlede';
    alert('Kopieringen af resultatlisten ' + msg);
  } catch (err) {
    alert('Oops, unable to copy: ' + err);
  }
  document.body.removeChild(textArea);
}