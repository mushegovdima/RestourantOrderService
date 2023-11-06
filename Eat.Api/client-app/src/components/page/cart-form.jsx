import React, { useEffect, useState } from "react";
import { Affix, Avatar, Badge, Button, Col, Row, Table } from 'antd';
import { ShoppingCartOutlined, RightCircleFilled} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import orderService from "../../services/order-service";
import { NewOrder } from '../../models/interfaces';

export default function CartForm(props) {
    const [cart, setCart] = useState();
    const [loading, setLoading] = useState(true);

    const getItemValue = (item: any) => {
        const amount = item.count * (item.position.price - (item.position.discount || 0))
        return formatValue(amount);
    }
    const formatValue = (amount) => {
        return new Intl.NumberFormat("ru", { style: 'currency', currency: "RUB", maximumFractionDigits: 0}).format(amount);
    }

    const scroll = () => {
        const section = document.querySelector(`#cart`);
        section.scrollIntoView( { behavior: 'smooth', block: 'start', top: '20px' } );
      };

    const sendOrder = async () => {
        const newOrder = cart;
        newOrder.sellerId = props.seller.id;
        newOrder.TotalPrice = newOrder.totalPrice;
        await orderService.post(newOrder);
    };


    useEffect(() => {
        setCart(props.cart);
        setLoading(false);
    }, [props.trigger, props.cart]);

    const positions = (cart?.positions || []).map(x => {
        return {
            id: x.position.id,
            image: x.position.image,
            title: x.position.title,
            count: x.count,
            total: getItemValue(x),
            discount: x.position.discount,
        }})

    const columns: ColumnsType<any> = [
        {
          title: '',
          key: 'image',
          dataIndex: 'image',
          render: (_, { image, title }) => (<Avatar shape="square" size='small' src={image}> {title} </Avatar>)
        },
        {
          title: 'Название',
          key: 'title',
          dataIndex: 'title',
          render: (_, { title }, index) => (<div>{title}</div>)
        },
        {
          title: 'Кол-во',
          dataIndex: 'count',
          key: 'count',
          render: (_, { count }, index) => (<Button shape='circle' >{count}</Button>)
        },
        {
          title: '',
          key: 'total',
          dataIndex: 'total',
          align: 'right',
        }
    ];

    return (
        <>
            <Row justify={'end'} className="mr-2 mt-4" style={{ height: 0 }}>
                <Affix offsetBottom={24} className="ant-btn ant-btn-default mt-4">
                    <Badge count={positions.length} color="green">
                        <Avatar shape='square'
                            onClick={scroll}
                            icon={<ShoppingCartOutlined/>}
                            size={{ xs: 60, sm: 60, md: 70, lg: 70, xl: 80, xxl: 80 }}
                            style={{ cursor:'pointer' }}
                        />
                    </Badge>
                </Affix>
            </Row>
            <Row id='cart' justify={'center'} className="mt-2">
                <h1>Ваш заказ</h1>
            </Row>
            <Row justify={'center'} className="m-2">
                <Table
                    dataSource={positions}
                    columns={columns}
                    loading={loading}
                    style={{ minWidth: '50%' }}
                    showHeader={false}
                    pagination={false}
                    rowKey={'id'}
                    size={'small'}/>
            </Row>
            <Row justify={'center'} align={'middle'} className="m-2 mb-4">
                <Col>
                    <h2>Всего: {formatValue(cart?.totalPrice)}</h2>
                </Col>
                <Col className="ml-2">
                    <Button type='primary' shape='round' size='large' 
                        icon={<RightCircleFilled />} disabled={!positions.length}
                        onClick={sendOrder}>Далее</Button>
                </Col>
            </Row>
        </>
    );
}