import registerListeners from './register-listeners';

export default ({ request, files, instance }, progress) =>
  new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    instance(xhr);

    registerListeners({ xhr, resolve, progress });

    xhr.open(request.method || 'POST', request.url);

    if (request.headers) {
      Object.keys(request.headers).forEach(header =>
        xhr.setRequestHeader(header, request.headers[header]));
    }

    var formData = new FormData();
    Array.from(files).forEach(file =>
      formData.append(request.fileName || 'file', file));

    if (request.fields) {
      Object.keys(request.fields).forEach(field =>
        formData.append(field, request.fields[field]));
    }

    xhr.send(formData);
  });
