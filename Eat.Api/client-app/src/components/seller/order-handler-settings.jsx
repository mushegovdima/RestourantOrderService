/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useImperativeHandle } from 'react';
import { Form, Input, notification, Row, Button, Space, Switch, Drawer, List, ColorPicker, Select, Divider } from 'antd';
import { TagOutlined, UpOutlined, DownOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import orderService from '../../services/order-service';
import { OrderHandlerSettings, OrderHandlerResponse, OrderHandlerIds } from '../../models/order-service';

export default function OrderHandlerSettingsEditor(props) {
    const [seller, setSeller] = useState();
    const [form] = Form.useForm();
    const [settings, setSettings] = useState();
    const [handlers, setHandlers] = useState([])
    const selectedHandlerId = Form.useWatch('handlerId', form);

    const loadSettings = async () => {
        if (!seller) return;
        const settings = await orderService.getOrderSettings(seller.id);
        setSettings(settings || { id: 0, sellerId: seller?.id });
    };

    const loadHandlers = async () => {
        if (!seller) return;
        const handlers = await orderService.getOrderHandlers();
        setHandlers(handlers);
    };

    const tags = handlers?.map((x) => { return { value: x.id, label: x.title }}) || []


    const onFinish = async (model: OrderHandlerSettings) => {
        try {
            await orderService.postOrderSettings(model);

            notification.success({ message: 'Успешно'});
            if (props.onUpdate) props.onUpdate();
        }
        catch(error) {
            notification.error('Что-то пошло не так...');
        }
    };

    const getDescriptionForHandler = () => {
        switch (selectedHandlerId) {
            case OrderHandlerIds.Telegram: return (
                <Space direction='vertical'>
                    <p>Шаг 1. Перейдите в чат-бот <a href='https://t.me/ep_notification_bot' target='_blank'>@ep_notification_bot</a></p>
                    <p>Шаг 2. Нажмите старт и скопируйте идентификатор, который отправит чат-бот</p>
                    <p>Сохраните настройки. При успешной настройке чат-бот отправит вам сообщение</p>
                </Space>
            );
            default: <></>
        };
    }

    useEffect(() => {
        setSeller(props.item);
     }, [props.item]);
 
     useEffect(() => {
        loadHandlers();
        loadSettings();
     }, [seller])

    useEffect(() => {
        form.setFieldsValue(settings);
    }, [settings])

    useEffect(() => {
        if (settings && settings.handlerId !== selectedHandlerId) {
            form.setFieldValue('data', {});
        }
    }, [selectedHandlerId])

    return(
        <Form
        form={form}
        onFinish={onFinish}
        layout="vertical">
            <Form.Item name="id" hidden>
                <Input hidden={true}/>
            </Form.Item>

            <Form.Item name="sellerId" hidden>
                <Input hidden={true}/>
            </Form.Item>

            <Form.Item
                    name="handlerId"
                    label="Выберите способ отправки заказов"
                    required={true}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Выберите способ отправки"
                        options={tags}
                    />
            </Form.Item>

            <Divider className='mb-1' />

            { handlers?.find(x => x.id === selectedHandlerId)?.fields?.map((i, index) => (
                <Form.Item name={['data', i]} label={i} key={index} required={true}>
                    <Input />
                </Form.Item>
            ))}
            <Form.Item>
                { getDescriptionForHandler()}
            </Form.Item>

            <Button type="primary" htmlType="submit" className='ml-2'> Сохранить </Button>
        </Form>
    )
}