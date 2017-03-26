[![CircleCI](https://circleci.com/gh/navjobs/upload.svg?style=svg)](https://circleci.com/gh/navjobs/upload)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/upload/badge.svg?branch=master)](https://coveralls.io/github/navjobs/upload?branch=master)

## @navjobs/upload

A set of React components for handling file uploads. If you simply want to turn any component into a file upload dialog, wrap it in our `<UploadField/>` component that exposes the files after selection. Need to process a file upload and receive the upload progress? Wrap `<UploadField/>` with `<Uploader/>`. You can see examples inside [our storybook](/stories/index.js).


## Why this?

- Any component can be an upload dialog. Wrap it in `<UploadField/>`. This means you have ultimate styling control.
- Simple component API for upload progress. Pass headers, extra fields, anything.
- Zero dependencies (other than React!)

## Install

```
yarn add @navjobs/upload
```


### UploadField

```js
import { UploadField } from '@navjobs/upload'

  <UploadField
    onFiles={files => //files object here}
    containerProps={{
      className: 'resume_import'
    }}
    uploadProps={{
      accept: '.pdf,.doc,.docx,.txt,.rtf',
    }}
  >
    <div>
      Click here to upload! This can be an image,
      or any component you can dream of.
    </div>
  </UploadField>
```

### Uploader

Use `<UploadField />` inside of this component; pass the files to it and handle the upload!

```js
import { Uploader } from '@navjobs/upload'

<Uploader
  request={{
    fileName: 'file',
    url: 'https://upload.com',
    method: 'POST',
    fields: {
      //extra fields to pass with the request
      full_name: 'Testing extra fields',
    },
    headers: {
      //custom headers to send along
      Authorization: 'Bearer: Test',
    },
  }}
  onComplete={() => /*do something*/}
  //upload on file selection, otherwise use `startUpload`
  uploadOnSelection={true}
>
  {({ onFiles, progress, complete }) => (
    <div>
      <UploadField onFiles={onFiles}>
        <div>
          Click here to select a file!
        </div>
      </UploadField>
      {progress ? `Progress: ${progress}` : null}
      {complete ? 'Complete!' : null}
    </div>
  )}
</Uploader>
```

### Imperative API

If you need to upload files and recieve progress, but can't wrap an `Uploader` around where you receive the files, feel free to use this:

```js
import { UploadRequest } from '@navjobs/upload'

async uploadFiles() {
  let { response, error, abort } = await UploadRequest(
    {
      request: {
        url: 'blah' //same as above request object
      },
      files, //files array
    },
    progress => console.log('progress!', progress)
  )
  //do something with response
}
```


## FAQ

**Q:** Part of the component I'm wrapping isn't cursor pointer?

**A:** You may need to set

```css
::-webkit-file-upload-button { cursor:pointer; }
```
In your css. For some reason file uploads aren't always pointer.

## License

This project is licensed under the terms of the [MIT](/LICENSE.md) license.
