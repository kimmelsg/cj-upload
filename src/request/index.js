import registerListeners from './register-listeners';

export default ({ request, files, instance, progress }) =>
  new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    if (instance) instance(xhr);

    registerListeners({ xhr, resolve, progress });

    xhr.open(request.method || 'POST', request.url);
    xhr.withCredentials = request.withCredentials || false;

    if (request.headers) {
      Object.keys(request.headers).forEach(header =>
        xhr.setRequestHeader(header, request.headers[header]));
    }
    //send just the file if no fields or filename is set
    if (!request.fileName && !request.fields) return xhr.send(files[0]);

    var formData = new FormData();

    //append fields first, fixes https://github.com/expressjs/multer/issues/322
    if (request.fields) {
      Object.keys(request.fields).forEach(field =>
        formData.append(field, request.fields[field]));
    }

    Array.from(files).forEach(file =>
      formData.append(request.fileName || 'file', file));

    xhr.send(formData);
  });
