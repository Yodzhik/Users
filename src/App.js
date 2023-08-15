import { Card, Container, Button, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';
import { useEffect } from 'react';
import FlexBox from './flexBox';

function App() {

  const [users, setUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const [value, setValue] = useState('')
  const [choosed, setChoosed] = useState([])

  const chooseUser = (user) => {
    if (!choosed.some(u => u.id === user.id)) {
      if (choosed.length > 0) {
        let firstPos = users.some(u => u.id === choosed[0].id)
        let actPos = users.some(u => u.id === user.id)
      if (firstPos === actPos) {
        setChoosed(prev => [...prev, user])
      }
    } else {
      setChoosed(prev => [...prev, user])
    }
    } else {
      setChoosed(prev => prev.filter(u => u.id !== user.id))
    }
  }

  useEffect(() => {
    console.log(choosed)
  }, [
    choosed
  ])

  const addUsers = () => {
    if (users.some(u => u.id === choosed[0].id)) {
      console.log('1')
      setSavedUsers([...savedUsers, ...choosed])
      setUsers(users.filter(f => !choosed.some(c => c.id === f.id)))
    }
    if (!users.some(u => u.id === choosed[0].id)) {
      console.log('2')
      setUsers([...users, ...choosed])
      setSavedUsers(savedUsers.filter(f => !choosed.some(c => c.id === f.id)))
    }
    setChoosed([])
  }

  const save = (id) => {
    setSavedUsers(prev => [...prev, users.find(f => f.id === id)])
    setUsers(prev => prev.filter(f => f.id !== id))
  }

  const deleteUser = (id) => {
    setUsers(prev => [...prev, savedUsers.find(f => f.id === id)])
    setSavedUsers(prev => prev.filter(f => f.id !== id))
  }

  const searchUsers = users.filter(users => {
    return users.name.toLowerCase().includes(value.toLowerCase())
  })



  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <br />
      <div className='my-2 w-100 d-flex justify-content-between'>
      <Form.Control style={{}} type="text" onChange={(event) => setValue(event.target.value)} />
      {choosed.length > 0 &&
        <Button variant={users.some(u => choosed[0].id === u.id) ? 'success' : 'danger'} onClick={addUsers}>{users.some(u => choosed[0].id === u.id) ? 'Добавить' : 'Удалить'}</Button>
      }
      </div>
      <Container>

        <Row >
          <Col className='d-flex flex-column'>
            {searchUsers.sort((a, b) => a.id - b.id).map((el) =>
              <Card className='mb-4' border="info" style={{ width: '18rem' }}>
                <Card.Header className={'d-flex justify-content-between'}>
                  <div>
                    <h3>{el.name}</h3>
                    <h6>{el.company.name}</h6>
                  </div>
                  <Form>
                      <div className="mb-3">
                        <Form.Check type={'checkbox'} checked={choosed.some(u => u.id === el.id)} onChange={() => chooseUser(el)} />
                      </div>
                  </Form>
                </Card.Header>
                <Card.Body>
                  <p className={'mb-2'}> <i className="bi bi-telephone-fill"></i>  {el.phone}</p>
                  <p className={'mb-2'}><i className="bi bi-envelope-fill"></i> {el.email}</p>
                  <p className={'mb-2'}><i className="bi bi-signpost-fill"></i> {el.address.street}</p>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => save(el.id)} variant="outline-info">Add</Button>
                </Card.Footer>
              </Card>
            )}
          </Col>
          <Col className='d-flex flex-column'>
            {savedUsers.sort((a, b) => a.id - b.id).map((el) =>
              <Card className='mb-4' border="info" style={{ width: '18rem' }}>
                <Card.Header className={'d-flex justify-content-between'}>
                  <div>
                    <h3>{el.name}</h3>
                    <h6>{el.company.name}</h6>
                  </div>
                  <Form>
                      <div className="mb-3">
                        <Form.Check type={'checkbox'} checked={choosed.some(u => u.id === el.id)} onChange={() => chooseUser(el)} />
                      </div>
                  </Form>
                </Card.Header>
                <Card.Body>
                  <p className={'mb-2'}> <i className="bi bi-telephone-fill"></i>  {el.phone}</p>
                  <p className={'mb-2'}><i className="bi bi-envelope-fill"></i> {el.email}</p>
                  <p className={'mb-2'}><i className="bi bi-signpost-fill"></i> {el.address.street}</p>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => deleteUser(el.id)} variant="outline-info">Delete</Button>
                </Card.Footer>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
}

export default App;
