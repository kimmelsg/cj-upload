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
    resolve({
      response,
      error: xhr.status < 200 || xhr.status >= 300,
      status: xhr.status,
    });
  });

  xhr.addEventListener('error', error => {
    resolve({ error, status: xhr.status, response: xhr.response });
  });

  xhr.addEventListener('abort', aborted => {
    resolve({ aborted });
  });
};
