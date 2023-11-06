/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card, Form, Input, notification } from 'antd';
import {  User } from '../../models/interfaces';
import userService from '../../services/user-service';

export default function ProfileInfo() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [item, setItem] = useState();
    const [isEdit, setEdit] = useState(true);

    const loadItem = async () => {
        setLoading(true)
        if(id > 0) {
            const user = await userService.get(id);
            setItem(user);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadItem(id);;
    }, [id])

    useEffect(() => {
        item ? form.setFieldsValue(item) : form.resetFields();
    }, [item])

    const onFinish = async (model: User) => {
        model.id > 0 ? onUpdate(model) : onCreate(model);
    };
    
    const onCreate = async (model: User) => {
        try {
            const resp = await userService.post(model);
            setItem(resp)
            notification.success({ message: 'Создано'});
        }
        catch (e) {
            notification.error({ message: 'Упс... что-то пошло не так'});
        }
    };

    const onUpdate = async (model: User) => {
        try {
            const resp = await userService.update(model);
            setItem(resp)
            notification.success({ message: 'Обновлено'});
        }
        catch(e) {
            notification.error({ message: 'Упс... что-то пошло не так'});
        }
    };

    return (
    <Card title={item?.id ? 'Редактирование' : 'Создание'}
        loading={loading}
        extra={!isEdit && <Button type="primary" onClick={() => setEdit(true)}>Редактировать</Button>}>
        <Form
            form={form}
            name="complex-form"
            onFinish={onFinish}
            disabled={!isEdit}
            initialValues={{ id: 0 }}
            style={{ minWidth: '50%', textAlign: 'left' }}
        >

            <Form.Item name="id" hidden>
                <Input hidden={true}/>
            </Form.Item>
            <Form.Item name="status" hidden>
                <Input hidden={true}/>
            </Form.Item>

            <Form.Item
                name="email"
                label="Почта"
                rules={[{ required: true, message: 'Email is required', type: "email" }]}
                >
                <Input placeholder="Please input" type='email' disabled={item?.id > 0}/>
            </Form.Item>

            <Form.Item
                name="name"
                label="Ваше ФИО"
                rules={[{ required: true, message: 'ФИО обязательно' }]}
                >
                <Input placeholder="Please input"/>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Телефон"
                rules={[{ required: true, message: 'Поле обязательно' }]}
                >
                <Input placeholder="Please input"/>
            </Form.Item>

            {isEdit &&
                <div style={{textAlign: 'center'}}>
                    <Button type="dashed" onClick={() => setEdit(false)}>
                        Отмена
                    </Button>
                    <Button type="primary" htmlType="submit" className='ml-2'>
                        {item?.id > 0 ? 'Обновить' : 'Создать'}
                    </Button>
                </div>
            }
        </Form>
    </Card>
)}