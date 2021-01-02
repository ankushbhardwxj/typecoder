import React, { useState } from 'react';
import { Button, Modal, Header, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { baseURI, port } from '../../config';

const LessonModalForm = props => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [codeContent, setCodeContent] = useState('');

  const handleClick = () => {
    axios({
      method: 'POST',
      url: `${baseURI}:${port}/users/${props.user}/lesson/create-lesson`,
      data: {
        title: fileName,
        description: description,
        code: codeContent,
        author: props.user,
        language: language
      }
    }).then(r => {
      console.log(r);
      setOpen(!open);
      props.onAdd();
    })
      .catch(err => console.log(err))
  }
  const languageOptions = [
    { text: 'Python', value: 'python' },
    { text: 'C/C++', value: 'c' },
    { text: 'Java', value: 'java' },
    { text: 'Javascript', value: 'js' },
    { text: 'TypeScript', value: 'ts' },

  ];

  return (
    <React.Fragment>
      <Modal
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          <Button secondary>
            Add new lesson
          </Button>
        }
      >
        <Header icon='file code' content='Add a New Lesson' />
        <Modal.Content>
          <Form>
            <Form.Input
              fluid label='Name of Lesson File'
              onChange={e => setFileName(e.target.value)}
              placeholder='Enter Lesson Name' />
            <Form.Input
              fluid
              label='Description'
              onChange={e => setDescription(e.target.value)}
              placeholder='Description/Credit Info' />
            <Form.TextArea
              label='Code'
              onChange={e => setCodeContent(e.target.value)}
              placeholder='Copy & Paste some code here' />
            <Dropdown
              placeholder='Select Language'
              onChange={e => setLanguage(e.target.value)}
              search selection
              options={languageOptions}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Form.Button secondary onClick={handleClick}>Submit</Form.Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  )
}

export default LessonModalForm;
