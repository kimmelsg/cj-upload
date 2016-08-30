##navload

The easiest to use file upload wrapper ever made. A HOC that wraps anything and displays an upload dialog on click.

```
npm install react-navload --save
```

###Use case

You want to show a file upload prompt when you click on something, but don't want to add a file input, and trigger a click on it when you click something else.

###Example

```js

  <Uploader
    onFiles={files => //files object here}
    containerProps={{
      className: 'resume_import'
    }}
    uploadProps={{
      accept: '.pdf,.doc,.docx,.txt,.rtf',
    }}
  >
    <div>
      Click here to upload!
    </div>
  </Uploader>
```

###Doing an upload with fetch

```js

onFile={files => {
  let formData = new FormData()
  formData.append('resume', files[0])

  fetch(`https://upload.com`, {
    method: 'POST',
    body: formData,   
  })
  .then(res => console.log('Status', res))
  .catch(e => console.log('Error',e))
}}
```
