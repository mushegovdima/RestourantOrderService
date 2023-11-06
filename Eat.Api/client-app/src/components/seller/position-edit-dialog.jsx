/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useImperativeHandle } from 'react';
import { Form, Input, notification, Modal, Row, Select, Button } from 'antd';
import { Position } from '../../models/interfaces';
import positionService from '../../services/position-service';
import FileUpload from '../common/file-upload';

function SellerPositionDialog(props, ref) {
    const [form] = Form.useForm();
    const price = Form.useWatch('price', form);
    const discount = Form.useWatch('discount', form);

    const [seller, setSeller] = useState();
    const [item, setItem] = useState();
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState([]);

    useImperativeHandle(ref, () => ({
        openDialog(position?: Position){
            if (position) setItem(position);
            setOpen(true);
        }
    }));

    useEffect(() => {
       setSeller(props.seller);
    }, [props.seller]);

    useEffect(() => {
        const res = seller?.categories?.map((x) => { return { value: x.id, label: x.title }}) || [];
        setTags(res);
     }, [seller]);

    useEffect(() => {
        item ? form.setFieldsValue(item) : form.resetFields();
    }, [item])
    
    const onFinish = async (model: Position) => {
        try {
            model.id > 0 
                ? await positionService.update(model)
                : await positionService.post(model);

            notification.success({ message: 'Успешно'});
            if (props.onUpdate) props.onUpdate();
            close();
        }
        catch(e) {
            notification.error(e);
        }
    };

    function close() {
        setOpen(false);
        setItem(null);
        form.resetFields();
    }

    return (
      <Modal
        title={"Позиция " + (item?.title || '(cоздание)')}
        open={open}
        width={'800px'}
        okButtonProps={{ title: 'Сохранить', onClick: () => form.submit()}}
        cancelButtonProps={{title: 'Отмена', onClick: () => close()}}
        closeIcon={<Button type='ghost' onClick={() => close()}>x</Button>}
        closable
        >
        <Form
            form={form}
            name="position-dialog-form"
            onFinish={onFinish}
            initialValues={{ id: 0, sellerId: seller?.id }}
        >
            <Form.Item name="id" hidden>
                <Input hidden={true}/>
            </Form.Item>
            <Form.Item
                name="title"
                label="Название"
                rules={[{ required: true, message: 'required' }]}
                >
                <Input placeholder="Please input" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Описаниие"
                rules={[{ required: true, message: 'required' }]}
                >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                name="weight"
                label="Вес/объем">
                <Input placeholder="Please input" type='number'/>
            </Form.Item>

            <Form.Item
                name="price"
                label="Стоимость(1ед)"
                rules={[{ required: true, message: 'required' }]}>
                <Input placeholder='30' type='number'/>
            </Form.Item>

            <Row>
                <Form.Item
                    name="discount"
                    label="Скидка %">
                    <Input placeholder="Please input" type='number'/>
                </Form.Item>
                <Form.Item label="Итого:" className='ml-2'>
                    { (price || 0) - (discount || 0)}
                </Form.Item>
            </Row>

            <Form.Item
                    name="categoryIds"
                    label="Категории">
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Выберите категории"
                        options={tags}
                    />
            </Form.Item>

            <Form.Item
                name="image"
                label="Заставка"
                rules={[{ required: false}]}>
                <FileUpload />
            </Form.Item>

            <Form.Item >
                <Form.Item name="sellerId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ресторан"
                    >
                    {seller?.title}
                </Form.Item>
            </Form.Item>
        </Form>
    </Modal>
)}

export default React.forwardRef(SellerPositionDialog)