import registerListeners from './register-listeners';

export default ({ request, files }, progress) => new Promise(resolve => {
  const xhr = new XMLHttpRequest();
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
