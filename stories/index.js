import React from 'react';
import Welcome from './Welcome';
import Uploader from '../src/uploader';
import UploadField from '../src/upload-field';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs';

storiesOf('NavJobs Upload', module).add('Welcome', () => (
  <Welcome showApp={linkTo('Button')} />
));

const field = storiesOf('Field', module);

field.addDecorator(withKnobs);

field.add('Renders', () => (
  <WithNotes
    notes="Make any child element a clickable file upload by wrapping it inside of UploadField"
  >
    <UploadField onFiles={action('files')}>
      <div>
        {text('children', 'Click here and select a file to see files logged.')}
      </div>
    </UploadField>
  </WithNotes>
));

field.add('Triggers hover on children', () => {
  const hoverColor = text('hover color', 'grey');
  return (
    <UploadField onFiles={action('files')}>
      {hover => (
        <div
          style={{
            backgroundColor: hover ? hoverColor : 'white',
          }}
        >
          {text(
            'children',
            'Click here and select a file to see files logged.'
          )}
        </div>
      )}
    </UploadField>
  );
});

const uploader = storiesOf('Uploader', module);

uploader.addDecorator(withKnobs);

uploader.add('Renders', () => {
  const uploadOnSelection = boolean('uploadOnSelection', false);
  return (
    <Uploader
      request={{
        url: text(
          'url',
          'https://api.navjobs.io/account/auth/register/candidate'
        ),
        method: 'POST',
        fields: {
          full_name: 'Testing extra fields',
        },
        headers: {
          Authorization: 'Bearer: Test',
        },
      }}
      uploadOnSelection={uploadOnSelection}
    >
      {({ onFiles, startUpload, progress, complete, canceled, failed }) => (
        <div>
          <UploadField onFiles={onFiles}>
            <div>
              {text('children', 'Click here and select a file!')}
            </div>
          </UploadField>
          {progress ? `Progress: ${progress}` : null}
          {complete ? 'Complete!' : null}
          {canceled ? 'Canceled!' : null}
          {failed ? 'Failed!' : null}
          {uploadOnSelection
            ? null
            : <div onClick={startUpload}>Upload Files</div>}
        </div>
      )}
    </Uploader>
  );
});
