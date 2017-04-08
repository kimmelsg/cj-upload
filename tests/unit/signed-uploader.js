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

  await sleep(20);
  expect(progressValue).toEqual(50);

  expect(completedValue).toEqual('finished after');
  expect(afterRequestGetsBefore).toEqual({ test: 'awesome' });
  expect(requestGetsBefore).toEqual({ test: 'awesome' });
  expect(completedStatus).toEqual(200);
});

// test('Triggers upload with headers and extra fields', async () => {
//   let progressValue = 0;
//   let wasCompleted = false;
//   let statusCode = false;
//
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://test.dev',
//         method: 'POST',
//         headers: {
//           Authorization: 'Fake!!!',
//         },
//         fields: {
//           test: 'test value',
//         },
//       }}
//       uploadOnSelection={true}
//       onComplete={() => wasCompleted = true}
//     >
//       {(
//         { onFiles, startUpload, progress, complete, canceled, failed, status }
//       ) => {
//         if (progress) progressValue = progress;
//         if (status) statusCode = status;
//         return (
//           <UploadField onFiles={onFiles}>
//             <div>
//               Click here and select a file!
//             </div>
//           </UploadField>
//         );
//       }}
//     </Uploader>
//   );
//
//   output
//     .find('input')
//     .simulate('change', { target: { files: [{ name: 'test ' }] } });
//
//   await sleep(15);
//   expect(progressValue).toEqual(50);
//   expect(headers[0].value).toEqual('Fake!!!');
//   expect(fields.find(field => field.name === 'test').value).toEqual(
//     'test value'
//   );
//
//   expect(wasCompleted).toEqual(true);
//   expect(statusCode).toEqual(200);
// });
//
// test('doesnt upload unless upload button is clicked', async () => {
//   let progressValue = 0;
//   let wasCompleted = false;
//
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://test.dev',
//         method: 'POST',
//       }}
//       uploadOnSelection={false}
//       onComplete={() => wasCompleted = true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         if (progress) progressValue = progress;
//         return (
//           <div>
//             <UploadField onFiles={onFiles}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//             <div id="start" onClick={startUpload} />
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output
//     .find('input')
//     .simulate('change', { target: { files: [{ name: 'test ' }] } });
//
//   expect(progressValue).toEqual(0);
//
//   expect(wasCompleted).toEqual(false);
//
//   output.find('#start').simulate('click');
//
//   await sleep(15);
//   expect(progressValue).toEqual(50);
//
//   expect(wasCompleted).toEqual(true);
// });
//
// test('does nothing if no files are selected', async () => {
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://test.dev',
//         method: 'POST',
//       }}
//       uploadOnSelection={false}
//       onComplete={() => wasCompleted = true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         if (progress) progressValue = progress;
//         return (
//           <div>
//             <UploadField onFiles={onFiles}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//             <div id="start" onClick={startUpload} />
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output.find('#start').simulate('click');
// });
//
// test('returns failed on bad request', async () => {
//   let didFail;
//
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://fail.dev',
//         method: 'POST',
//       }}
//       uploadOnSelection={true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         if (failed) didFail = true;
//
//         return (
//           <div>
//             <UploadField onFiles={onFiles}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output
//     .find('input')
//     .simulate('change', { target: { files: [{ name: 'test ' }] } });
//
//   await sleep(15);
//
//   expect(didFail).toEqual(true);
// });
//
// test('returns canceled on aborted request', async () => {
//   let didAbort;
//
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://abort.dev',
//         method: 'POST',
//       }}
//       uploadOnSelection={true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         if (canceled) didAbort = true;
//         return (
//           <div>
//             <UploadField onFiles={onFiles}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output
//     .find('input')
//     .simulate('change', { target: { files: [{ name: 'test ' }] } });
//
//   await sleep(15);
//
//   expect(didAbort).toEqual(true);
// });
//
// test('defaults to a post request', async () => {
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://test.dev',
//       }}
//       uploadOnSelection={true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         return (
//           <div>
//             <UploadField onFiles={onFiles}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output
//     .find('input')
//     .simulate('change', { target: { files: [{ name: 'test ' }] } });
// });
//
// test('returns files after selection', async () => {
//   let returnsFiles = false;
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://test.dev',
//       }}
//       uploadOnSelection={true}
//     >
//       {({ onFiles, files }) => {
//         if (files) returnsFiles = true;
//         return (
//           <div>
//             <UploadField onFiles={onFiles}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output
//     .find('input')
//     .simulate('change', { target: { files: [{ name: 'test ' }] } });
//
//   expect(returnsFiles).toEqual(true);
//   await sleep(15);
// });
//
// test('Handle multiple file upload', async () => {
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://test.dev',
//       }}
//       uploadOnSelection={true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         return (
//           <div>
//             <UploadField onFiles={onFiles} uploadProps={{ multiple: true }}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output.find('input').simulate('change', {
//     target: { files: [{ name: 'test' }, { name: 'second file' }] },
//   });
//
//   await sleep(15);
//   expect(aborted).toEqual(false);
//
//   output.unmount();
//   expect(aborted).toEqual(false); //request alreaady completed, should not have aborted
//   expect(fields[0].value.name).toEqual('test');
//   expect(fields[1].value.name).toEqual('second file');
// });
//
// test('Handle unmount mid request', async () => {
//   const output = mount(
//     <Uploader
//       request={{
//         url: 'http://inprogress.dev',
//       }}
//       uploadOnSelection={true}
//     >
//       {({ onFiles, startUpload, progress, complete, canceled, failed }) => {
//         return (
//           <div>
//             <UploadField onFiles={onFiles} uploadProps={{ multiple: true }}>
//               <div>
//                 Click here and select a file!
//               </div>
//             </UploadField>
//           </div>
//         );
//       }}
//     </Uploader>
//   );
//
//   output.find('input').simulate('change', {
//     target: { files: [{ name: 'test' }, { name: 'second file' }] },
//   });
//
//   await sleep(15);
//   expect(aborted).toEqual(false);
//   output.unmount();
//   expect(aborted).toEqual(true);
// });
