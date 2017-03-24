[![CircleCI](https://circleci.com/gh/navjobs/upload.svg?style=svg)](https://circleci.com/gh/navjobs/upload)

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

Use `<UploadField />` inside of this component to pass the files to it and handle the upload.

```js
import { Uploader } from '@navjobs/upload'

<Uploader
  request={{
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
