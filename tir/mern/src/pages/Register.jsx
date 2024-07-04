import React from 'react';
import { Row, Col, Form, Input, Button, Anchor } from 'antd';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';


function Register() {


    const dispatch = useDispatch();

    function onFinish(values){
        dispatch(userRegister(values))
        console.log(values);
    }

    return (
        <div  >
            <Row gutter={16} style={{
                marginTop: 100
            }}>
                <Col lg={8}></Col>
                <Col lg={8} className='login'>
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>Register</h1>
            <hr />
            <Form.Item name='fullName' label='Full Name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='contactPhone' label='Contact Phone' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='address' label='Address' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='role' label='Role' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
                        <button type="primary" style={{
                            marginBottom: 4
                        }} >Register</button>
                        <br></br>
                        <Anchor
                            items={[
                                {
                                    key: 'login',
                                    href: '/login',
                                    title: 'Click here to login',
                                }
                            ]}
                        />
                    </Form>
                </Col>

            </Row>
        </div>
    )
}

export default Register;