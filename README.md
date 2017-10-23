[![CircleCI](https://circleci.com/gh/navjobs/upload.svg?style=svg)](https://circleci.com/gh/navjobs/upload)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/upload/badge.svg?branch=master)](https://coveralls.io/github/navjobs/upload?branch=master)

## @navjobs/upload

## v4

I'm working on a v4 soon that simplfies the api and removes the children-as-a-function paradigm to something more extendable. Also revamping the test suit. It'll be a complete rewrite.

## What
A set of React components for handling file uploads. If you simply want to turn any component into a file upload dialog, wrap it in our `<UploadField/>` component that exposes the files after selection. Need to process a file upload and receive the upload progress? Wrap `<UploadField/>` with `<Uploader/>`. You can see examples inside [our storybook](/stories/index.js).

## Why this?

- Any component can be an upload dialog. Wrap it in `<UploadField/>`. This means you have ultimate styling control.
- Simple component API for upload progress. Pass headers, extra fields, anything.
- Zero dependencies (other than React!)

## Install

```
yarn add @navjobs/upload
```

## In this library

- [UploadField](#uploadfield) gives access to files after drag and drop / clicking on the area wrapped
- [Uploader](#uploader) triggers an xhr upload to a url with file progress
- [SignedUploader](#signed-uploader) same as above, but helps generate a [signed url](https://cloud.google.com/storage/docs/access-control/signed-urls) from your api.
- [Imperative api](#imperative-api) that lets you trigger a file upload with progress outside of react.

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
    // use credentials for cross-site requests
    withCredentials: false,
  }}
  onComplete={({ response, status }) => /*do something*/}
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

### Signed Uploader

This is a useful component for generating signed urls on your backend for a service like  [AWS](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html) or [Google Cloud](https://cloud.google.com/storage/docs/access-control/signed-urls).
The workflow generally involes hitting your own api, then uploading to the url that your api returns. After the fact, you hit your api again to say that the upload is finished.

```js
import { SignedUploader } from '@navjobs/upload'


<SignedUploader
  //grab this url from your api
  beforeRequest={() => new Promise(resolve => resolve({ url: 'http://storage.googlecloud.com' }))}
  request={({ before, files }) => ({
      url: before.url,
      method: 'PUT',
      headers: {
        'Content-Type': files[0].type
      }
    })}
  afterRequest={({ before, status }) => new Promise(resolve => {
    resolve('finished the upload!');
  })}
>

```

### Imperative API

If you need to upload files and recieve progress, but can't wrap an `Uploader` around where you receive the files, feel free to use this:

```js
import { UploadRequest } from '@navjobs/upload'

async uploadFiles() {
  let { response, error, aborted } = await UploadRequest(
    {
      request: {
        url: 'blah' //same as above request object
      },
      files, //files array
      progress: value => console.log('progress!', value)
    }  
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
