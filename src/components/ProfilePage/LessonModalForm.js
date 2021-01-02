import React, { useState } from 'react';
import { Button, Modal, Header, Form } from 'semantic-ui-react';
import axios from 'axios';
import { baseURI, port } from '../../config';

const LessonModalForm = props => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [codeContent, setCodeContent] = useState('');

  const handleClick = () => {
    axios({
      method: 'POST',
      url: `${baseURI}:${port}/users/${props.user}/lesson/create-lesson`,
      data: {
        title: fileName,
        description: description,
        code: codeContent
      }
    }).then(r => {
      console.log(r);
      setOpen(!open);
      props.onAdd();
    })
      .catch(err => console.log(err))
  }

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
