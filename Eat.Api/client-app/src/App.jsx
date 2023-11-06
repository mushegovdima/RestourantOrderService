import { Content, Header } from 'antd/es/layout/layout';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';

export default function App() {
  return (
    <div className="App ">
      <Header>
        <Row className="d-flex" justify={'space-between'}>
          <Col>
            <a href='/admin/sellers'>Рестораны</a>
          </Col>
            <a href='/profile/0'>Профиль</a>
          <Col>
          </Col>
        </Row>
      </Header>
      <Content>
          <Outlet />
      </Content>
    </div>
  );
}
