/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import positionService from '../../services/position-service'
import { Avatar, Row, Col, Button, Tag, Table } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import PositionCategoryDialog from './categories-edit-dialog';
import SellerPositionDialog from './position-edit-dialog';
import SellerMenu from '../page/seller-menu';
import type { ColumnsType } from 'antd/es/table';
import { Position } from '../../models/interfaces';


export default  function Positions(props) {
    const [seller, setSeller] = useState();
    const [positions, setPositions] = useState([]);
    const positionDialog = useRef();
    const categoryDialog = useRef();

    const loadPositions = async () => {
        if (!seller) return;
        const positions = await positionService.byFilter({sellerId: seller.id});
        setPositions(positions);
    };

    const columns: ColumnsType<Position> = [
        {
          title: '',
          dataIndex: 'image',
          key: 'image',
          render: (_, { image, title }) => (
          <Avatar
            shape="square"
            size='small'
            src={image}>
                {title}
          </Avatar>)
        },
        {
          title: 'Название',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) => (a.title > b.title ? -1 : 1),
        },
        {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
          sorter: (a, b) => (a.description > b.description ? -1 : 1),
        },
        {
          title: 'Стоимость',
          dataIndex: 'price',
          key: 'price',
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: 'Категории',
          key: 'categoryIds',
          dataIndex: 'categoryIds',
          render: (_, { categoryIds }) => (
            <>{categoryIds.map((id) => {
                const tag = seller.categories.find(x => x.id === id);
                return (
                <Tag key={id} color={tag ? 'processing' : 'error'} >{tag?.title || 'Удалена'}</Tag>)})}
            </>
          ),
          filters: (seller?.categories || []).map((item) => {
              return {
                text: item.title,
                value: item.id,
              }
          }),
          onFilter: (value, record) => record.categoryIds.findIndex(id => id === value) !== -1,
        },
        {
          title: '',
          key: 'action',
          render: (_, record) => (<Button icon={<EditOutlined/>} shape='circle' type='text' onClick={() => positionDialog.current.openDialog(record)} />),
        },
      ];

    useEffect(() => {
       setSeller(props.item);
    }, [props.item]);

    useEffect(() => {
        loadPositions();
    }, [seller])

    return (
        <Row>
            <Col flex={3}>
                <Row>
                    <Button  onClick={e => categoryDialog.current.openDialog()} icon={<EditOutlined/>}>Редактировать категории</Button>
                    <Button onClick={e => positionDialog.current.openDialog()} icon={<PlusOutlined/>}>Создать позицию</Button>
                </Row>
                <Row className='mt-2'>
                <Table style={{ width: '100%' }}
                    columns={columns}
                    dataSource={positions}
                    pagination={{ pageSize: 20, showTotal: (total) => <div>Всего: {total}</div> }}
                    size='small' />
                </Row>
            </Col>
            <Col flex={2}>
                <Row>Предпросмотр</Row>
                <Row>
                    <SellerMenu
                    item={seller}
                    positions={positions}
                    editor={(e) => positionDialog.current.openDialog(e)}/>
                </Row>
            </Col>

            <SellerPositionDialog seller={seller} onUpdate={loadPositions} ref={positionDialog}/>
            <PositionCategoryDialog seller={seller} onUpdate={props.onUpdated} ref={categoryDialog}/>
        </Row>
    )}