## navload

The easiest to use file upload wrapper ever made. A HOC that overlays a file input on top of any content.

1. Get around having to style a file upload button
2. Works in IE and Edge, doesn't trigger a click via js

## Todo

- Trigger a hover event on the underlying component for better user experience!

## Install

```
npm install react-navload --save
```


### Example

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

### Doing an upload with fetch

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
