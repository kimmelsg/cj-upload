import UploadField from '../../src/upload-field';
import Uploader from '../../src/signed-uploader';

test('Triggers upload', async () => {
  let progressValue = 0;
  let completedValue = false;
  let completedStatus = false;
  let requestGetsBefore = false;
  let afterRequestGetsBefore = false;

  const output = mount(
    <Uploader
      beforeRequest={() => new Promise(resolve => resolve({ test: 'awesome' }))}
      request={({ before }) => {
        requestGetsBefore = before;
        return {
          url: 'http://test.dev',
          method: 'POST',
        };
      }}
      uploadOnSelection={true}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          afterRequestGetsBefore = before;
          completedStatus = status;
          resolve('finished after');
        })}
    >
      {({ onFiles, progress, complete, after, before }) => {
        if (progress) progressValue = progress;
        if (after) completedValue = after;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
          </div>
        );
      }}
    </Uploader>
  );

  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  await sleep(50);
  expect(progressValue).toEqual(50);

  expect(completedValue).toEqual('finished after');
  expect(afterRequestGetsBefore).toEqual({ test: 'awesome' });
  expect(requestGetsBefore).toEqual({ test: 'awesome' });
  expect(completedStatus).toEqual(200);
});

test('Triggers error', async () => {
  let completedValue = false;

  const output = mount(
    <Uploader
      beforeRequest={() => new Promise(resolve => resolve({ test: 'awesome' }))}
      request={({ before }) => {
        return {
          url: 'http://fail.dev',
          method: 'POST',
        };
      }}
      uploadOnSelection={true}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve('finished after');
        })}
    >
      {({ onFiles, progress, complete, after, before, error }) => {
        if (error) completedValue = error;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
          </div>
        );
      }}
    </Uploader>
  );

  expect(completedValue).toEqual(false);
  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  await sleep(20);

  expect(completedValue).toEqual(true);
});

test('Triggers abort', async () => {
  let completedValue = false;

  const output = mount(
    <Uploader
      beforeRequest={() => new Promise(resolve => resolve({ test: 'awesome' }))}
      request={({ before }) => {
        return {
          url: 'http://abort.dev',
          method: 'POST',
        };
      }}
      uploadOnSelection={true}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve('finished after');
        })}
    >
      {({ onFiles, progress, complete, after, before, aborted }) => {
        if (aborted) completedValue = aborted;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
          </div>
        );
      }}
    </Uploader>
  );

  expect(completedValue).toEqual(false);
  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  await sleep(20);

  expect(completedValue).toEqual(true);
});

test('Triggers error before request', async () => {
  let completedValue = false;

  const output = mount(
    <Uploader
      beforeRequest={() =>
        new Promise((resolve, reject) => reject({ error: 'awesome' }))}
      request={({ before }) => {
        return {
          url: 'http://inprogress.dev',
          method: 'POST',
        };
      }}
      uploadOnSelection={true}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve('finished after');
        })}
    >
      {({ onFiles, progress, complete, after, before, error }) => {
        if (error) completedValue = error;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
          </div>
        );
      }}
    </Uploader>
  );

  expect(completedValue).toEqual(false);
  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  await sleep(20);

  expect(completedValue).toEqual({ error: 'awesome' });
});

test('Triggers empty error before request', async () => {
  let completedValue = false;

  const output = mount(
    <Uploader
      beforeRequest={() => new Promise((resolve, reject) => reject())}
      request={({ before }) => {
        return {
          url: 'http://inprogress.dev',
          method: 'POST',
        };
      }}
      uploadOnSelection={true}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve('finished after');
        })}
    >
      {({ onFiles, progress, complete, after, before, error }) => {
        if (error) completedValue = error;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
          </div>
        );
      }}
    </Uploader>
  );

  expect(completedValue).toEqual(false);
  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  await sleep(20);

  expect(completedValue).toEqual(true);
});

test('starts upload with startUpload', async () => {
  let completedValue = false;

  const output = mount(
    <Uploader
      beforeRequest={() => new Promise(resolve => resolve({ test: 'awesome' }))}
      request={({ before }) => {
        return {
          url: 'http://test.dev',
          method: 'POST',
        };
      }}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve('finished after');
        })}
    >
      {({ onFiles, progress, complete, startUpload }) => {
        if (complete) completedValue = complete;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
            <div id="upload" onClick={startUpload} />
          </div>
        );
      }}
    </Uploader>
  );

  output.find('#upload').simulate('click');
  await sleep(20);
  expect(completedValue).toEqual(false);

  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  await sleep(20);

  expect(completedValue).toEqual(false);
  output.find('#upload').simulate('click');
  await sleep(50);
  output.unmount();
  expect(aborted).toEqual(false);
  expect(completedValue).toEqual(true);
});

test('Handle unmount mid request', async () => {
  const output = mount(
    <Uploader
      beforeRequest={() => new Promise(resolve => resolve({ test: 'awesome' }))}
      request={() => ({
        url: 'http://inprogress.dev',
      })}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve('finished after');
        })}
      uploadOnSelection={true}
    >
      {({ onFiles, startUpload, progress, complete, canceled, error }) => {
        return (
          <div>
            <UploadField onFiles={onFiles} uploadProps={{ multiple: true }}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
          </div>
        );
      }}
    </Uploader>
  );

  output.find('input').simulate('change', {
    target: { files: [{ name: 'test' }, { name: 'second file' }] },
  });

  await sleep(20);
  expect(aborted).toEqual(false);
  output.unmount();
  expect(aborted).toEqual(true);
});
