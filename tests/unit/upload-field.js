import UploadField from '../../src/upload-field';

test('Renders children with input overlaid', () => {
  const output = shallow(
    <UploadField>
      <div>hi!</div>
    </UploadField>
  );

  expect(output.props().children[0].props.children).toEqual('hi!');
  expect(output.props().children[1].props.type).toEqual('file');
});

test('Renders with upload props', () => {
  const output = shallow(
    <UploadField uploadProps={{ accept: '.jpg' }}>
      <div>hi!</div>
    </UploadField>
  );

  expect(output.props().children[1].props.accept).toEqual('.jpg');
});

test('Renders with container props', () => {
  const output = shallow(
    <UploadField containerProps={{ className: 'test' }}>
      <div>hi!</div>
    </UploadField>
  );
  expect(output.props().className).toEqual('test');
});

test('Calls onFiles when file is selected', done => {
  const output = shallow(
    <UploadField
      onFiles={files => {
        expect(files[0].name).toEqual('fake file');
        done();
      }}
      containerProps={{ className: 'test' }}
    >
      <div id="test">hi!</div>
    </UploadField>
  );

  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'fake file' }] } });
});

test('Doesnt break without onFiles when file is selected', () => {
  const output = shallow(
    <UploadField containerProps={{ className: 'test' }}>
      <div id="test">hi!</div>
    </UploadField>
  );

  output
    .find('input')
    .simulate('change', { target: { files: [{ name: 'fake file' }] } });
});

test('Triggers hover', async () => {
  let hovering;

  const output = mount(
    <UploadField containerProps={{ className: 'test' }}>
      {hover => {
        hovering = hover;
        return <p>hi!</p>;
      }}
    </UploadField>
  );
  output.find('div').simulate('mouseenter');
  await sleep(50);

  expect(hovering).toEqual(true);

  output.find('div').simulate('mouseleave');

  expect(hovering).toEqual(false);
});

test('Doesnt change state if not callback child', async () => {
  let hovering;

  const output = mount(
    <UploadField containerProps={{ className: 'test' }}>
      <p>hi!</p>
    </UploadField>
  );
  output.find('div').simulate('mouseenter');
  await sleep(50);

  expect(output.state()).toEqual({});

  output.find('div').simulate('mouseleave');
  await sleep(50);

  expect(output.state()).toEqual({});
});
