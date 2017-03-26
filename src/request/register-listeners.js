export default ({ xhr, progress, resolve }) => {
  xhr.upload.addEventListener('progress', event => {
    if (!progress) return;
    progress(Math.round(event.loaded / event.total * 100));
  });

  xhr.addEventListener('load', () => {
    let response;
    try {
      response = JSON.parse(xhr.response);
    } catch (e) {
      response = xhr.response;
    }
    resolve({ response, error: xhr.status === 500, status: xhr.status });
  });

  xhr.addEventListener('error', () => {
    resolve({ error: true, status: xhr.status });
  });

  xhr.addEventListener('abort', () => {
    resolve({ abort: true });
  });
};
