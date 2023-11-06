/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, notification } from 'antd';
import { Seller, SellerStatus } from '../../models/interfaces';
import sellerService from '../../services/seller-service';
import config from '../../config';
import FileUpload from '../common/file-upload';

export default function SellerInfo(props) {
    const [form] = Form.useForm();
    const [item, setItem] = useState();
    const [isEdit, setEdit] = useState(true);

    useEffect(() => {
       setItem(props.item);
    }, [props.item]);

    useEffect(() => {
        item ? form.setFieldsValue(item) : form.resetFields();
    }, [item])

    const onFinish = async (model: Seller) => {
        model.id > 0 ? onUpdate(model) : onCreate(model);
    };
    
    const onCreate = async (model: Seller) => {
        try {
            await sellerService.post(model);
            notification.success({ message: 'Создано'});
            props.onCreated();
        }
        catch (e) {
            notification.error({ message: 'Упс... что-то пошло не так'});
        }
    };

    const onUpdate = async (model: Seller) => {
        try {
            await sellerService.update(model);
            notification.success({ message: 'Обновлено'});
            if (props.onCreated) props.onCreated();
        }
        catch(e) {
            notification.error({ message: 'Упс... что-то пошло не так'});
        }
    };

    return (
    <Card title={item?.id ? 'Редактирование' : 'Создание'}>
        <Form
            form={form}
            name="complex-form"
            onFinish={onFinish}
            disabled={!isEdit}
            initialValues={{ id: 0, status: SellerStatus.New }}
            style={{ minWidth: '50%', textAlign: 'left' }}
        >

            <Form.Item name="id" hidden>
                <Input hidden={true}/>
            </Form.Item>
            <Form.Item name="status" hidden>
                <Input hidden={true}/>
            </Form.Item>
            <Form.Item
                name="title"
                label="Название ресторана"
                rules={[{ required: true, message: 'Title is required' }]}
                >
                <Input placeholder="Please input" />
            </Form.Item>
            <Form.Item
                name="login"
                label="Логин страницы ресторана"
                rules={[{ required: true, message: 'Title is required'}]}>
                <Input placeholder={`${config.api}/{логин}`}/>
            </Form.Item>

            <Form.Item
                name="image"
                label="Заставка"
                rules={[{ required: false}]}>
                <FileUpload />
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

        {!isEdit &&
                <Button type="primary" onClick={() => setEdit(true)}>
                    Редактировать
                </Button>
            }
    </Card>
)}