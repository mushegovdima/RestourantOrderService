/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useImperativeHandle } from 'react';
import { Form, Input, notification, Row, Button, Space, Switch, Drawer, List, ColorPicker } from 'antd';
import { TagOutlined, UpOutlined, DownOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Category } from '../../models/interfaces';
import sellerService from '../../services/seller-service';
import uuid from 'react-uuid';


function PositionCategoryDialog(props, ref) {
    const [seller, setSeller] = useState();
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openDialog(){
            setOpen(true);
        }
    }));

    const updateCategory = (index, value) => {
        if (!categories) return;
        categories[index] = value
        setCategories(categories);
    }

    const changeOrder = (index, flex) => {
        if (!categories) return;
        const newIndex = index + flex;
        const items = categories;

        if (newIndex < 0 || newIndex > items.length - 1) return;
        items[index] = items.splice(newIndex, 1, items[index])[0];
        setCategories([...items]);
    }

    const appendItem = () => {
        const defaultValue: Category = {
            id: uuid(),
            hide: false,
            sortOrder: categories.length + 1,
            title: 'Новая категория',
        }
        setCategories([ ...categories, defaultValue ])
    }

    const deleteRow = (index) => {
        const items = categories;
        items.splice(index, 1);
        setCategories([ ...items])
    }

    useEffect(() => {
        if (!props.seller || !open) return;

        setSeller(props.seller);
        setCategories(props.seller.categories);
    }, [props.seller, open]);

    useEffect(() => {
        if (!props.seller) return;

        setSeller(props.seller);
        setCategories(props.seller.categories.sort((a,b) => a.sortOrder - b.sortOrder));
    }, [props.seller]);
    
    const save = async () => {
        try {
            await sellerService.updateCategories(seller.id, categories);
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
        setCategories([]);
    }

    return (
      <Drawer
        title={"Категории"}
        open={open}
        closable={false}
        width={720}
        extra={
            <Space>
              <Button onClick={close}>Отмена</Button>
              <Button onClick={save} type="primary">Сохранить</Button>
            </Space>
          }>
        <List
            itemLayout="horizontal" 
            dataSource={categories}
            renderItem={(item, index) => (
                <List.Item key={index} extra={
                    <>
                        <Row>
                        <Button icon={<UpOutlined/>} shape='circle' onClick={() => changeOrder(index, -1)} type='text' />
                        <Button icon={<DownOutlined/>} shape='circle' onClick={() => changeOrder(index, +1)} type='text'/>
                        <Button icon={<DeleteOutlined/>} shape='circle' onClick={() => deleteRow(index)} type='text' danger/>
                        </Row>
                    </>
                    }>
                    <PositionCategoryEditor item={item} change={(v) => updateCategory(index, v)} />
                </List.Item>
              )}
        />
        <Button onClick={() => appendItem()} >Добавить</Button>
    </Drawer>
)}

function PositionCategoryEditor({ change, item }) {
    const [form] = Form.useForm();

    const onRequiredTypeChange = (item, values) => {
        if (values.ribbonColor && values.ribbonColor.toHex) values.ribbonColor = values.ribbonColor.toHex();
        change(values);
      };

    useEffect(() => {
        form.setFieldsValue(item);
    }, [item])

    return(
        <Form
        form={form}
        layout="vertical"
        onValuesChange={onRequiredTypeChange}>
            <Row align={'middle'}>
                <Form.Item name="id" hidden>
                    <Input hidden={true}/>
                </Form.Item>
                <Form.Item name="sortOrder" hidden rules={[{ required: true, message: 'required' }]} className='ml-2 mb-0'>
                    <Input hidden={true}/>
                </Form.Item>

                <Form.Item name="title" tooltip={{ title:"Название" }} rules={[{ required: true, message: 'required' }]} className='ml-2 mb-0'>
                    <Input placeholder="Please input" prefix={<TagOutlined />} />
                </Form.Item>

                <Form.Item name="ribbonColor" tooltip={{ title:"Цвет ярлыка" }} className='ml-2 mb-0'>
                    <ColorPicker allowClear={true}/>
                </Form.Item>

                <Form.Item name="ribbonTitle" className='ml-2 mb-0'>
                    <Input placeholder="Текст ярлыка" />
                </Form.Item>

                <Form.Item name="hide" valuePropName="checked" className='ml-2 mb-0'>
                    <Switch title='Скрыто' size='sm'
                        checkedChildren={<CloseCircleOutlined />}
                        unCheckedChildren={<CheckCircleOutlined />}
                    />
                </Form.Item>
            </Row>
        </Form>
    )
}


export default React.forwardRef(PositionCategoryDialog)