
queryResultsText = 'Placement,Domain,PageURL,Keyword\n';
var keyword = document.querySelector('[name="q"]').value;
var q = document.querySelectorAll('.g');
q.forEach(function (item, index) {
  var fullpath;
  try {
    if (item.tagName == 'DIV') {
      fullpath = item.querySelector('h3').closest('a').href;
    } else {
      fullpath = item.querySelector('a').href;
    }
    let url = new URL(fullpath);
    let domain = url.host;
    queryResultsText += index + 1 + "," + domain + "," + url + "," + keyword + "\n";
  } catch (err) {
    console.log('unable to register result from:' + item.innerHTML);
  }
});
copyTextToClipboard(queryResultsText);
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'lykkedes' : 'Fejlede';
    alert('Kopieringen af resultatlisten ' + msg);
  } catch (err) {
    alert('Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}