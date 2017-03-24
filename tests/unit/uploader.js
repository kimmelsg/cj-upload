import UploadField from '../../src/upload-field';
import Uploader from '../../src/uploader';

test('Triggers upload', async () => {
  let progressValue = 0;
  let wasCompleted = false;

  const output = mount(
    <Uploader
      request={{
        url: 'http://test.dev',
        method: 'POST',
      }}
      uploadOnSelection={true}
      onComplete={() => wasCompleted = true}
    >
      {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
        if (progress) progressValue = progress;
        return (
          <div>
            <UploadField onFiles={onFiles}>
              <div>
                Click here and select a file!
              </div>
            </UploadField>
            {progress ? `Progress: ${progress}` : null}
            {complete ? 'Complete!' : null}
            {canceled ? 'Canceled!' : null}
            {failed ? 'Failed!' : null}
          </div>
        );
      }}
    </Uploader>
  );

  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'test ' }] } });

  let completed = await new Promise(resolve =>
    setTimeout(() => resolve(wasCompleted), 500));
  expect(progressValue).toEqual(50);

  expect(completed).toEqual(true);
});
