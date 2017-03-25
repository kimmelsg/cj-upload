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
    resolve({ response });
  });

  xhr.addEventListener('error', () => {
    resolve({ error: true });
  });

  xhr.addEventListener('abort', () => {
    resolve({ abort: true });
  });
};
