export default ({ xhr, progress, resolve }) => {
  xhr.upload.addEventListener('progress', event => {
    if (!progress) return false;
    progress(Math.round(event.loaded / event.total * 100));
  });

  xhr.addEventListener('load', () => {
    let response;
    try {
      response = JSON.parse(xhr.response);
    } catch (e) {
      response = xhr.response;
    }
    var headers = request.getAllResponseHeaders();
    var arr = headers.trim().split(/[\r\n]+/);
    var headerMap = {};
    arr.forEach(function (line) {
      var parts = line.split(': ');
      var header = parts.shift();
      var value = parts.join(': ');
      headerMap[header] = value;
    });
    
    resolve({
      response,
      error: xhr.status < 200 || xhr.status >= 300,
      status: xhr.status,
      headers: headerMap
    });
  });

  xhr.addEventListener('error', error => {
    resolve({ error, status: xhr.status, response: xhr.response });
  });

  xhr.addEventListener('abort', aborted => {
    resolve({ aborted });
  });
};
