/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import positionService from '../../services/position-service'
import { Card, Avatar, Row, Col, Divider, List, Button, Anchor, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

export default  function SellerMenu(props) {
    const [seller, setSeller] = useState();
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState();
    const { Meta } = Card;

    const loadPositions = async () => {
        if (!seller) return;
        setLoading(true)
        const positions = await positionService.byFilter({sellerId: seller.id});
        setPositions(positions);
        setLoading(false);
    };

    const getCount = (id) => {
        return cart?.positions.find(x => x.position.id === id)?.count || 0;
    }

    const formatValue = (amount) => {
        return new Intl.NumberFormat("ru", { style: 'currency', currency: "RUB", maximumFractionDigits: 0}).format(amount);
    }
    
    const getPriceElement = (item) => {
        const price = item.price;
        const offer = item.price - item.discount;
        if (item.discount) {
            return (
                <Space direction='horizontal'>
                    <del>{formatValue(price)}</del>
                    {offer &&(<div className='success'>{formatValue(offer)}</div>)}
                </Space>)
            }
        return (<div >{formatValue(price)}</div>);
    }

    useEffect(() => {
        setCart(props.cart);
    }, [props.trigger, props.cart]);

    useEffect(() => {
       setSeller(props.item);
    }, [props.item]);

    useEffect(() => {
        if (!props.positions) return;
        setPositions(props.positions);
     }, [props.positions]);

    useEffect(() => {
        loadPositions();
    }, [seller])
    
    const groupedByTags = positions.reduce((res, product) => {
        product.categoryIds?.map(x => {
            res[x] = res[x] ?? [];
            res[x].push(product);
        })
        return res;
      }, {});

    const tags = (seller?.categories || [])
        .sort((a,b) => a.sortOrder - b.sortOrder)
        .map((c: Category) => ({
            title: c.title,
            value: c.id,
            key: c.id,
            href: `#g${c.id}`,
        }))

    return (
        <Col>
            <Row justify={'center'}>
                <Col>
                    <Anchor
                        direction="horizontal" 
                        style={{ 
                            transition: '.3s all',
                            padding: "0px 10px",
                            backgroundColor: 'var(--essential-base)',
                            borderRadius: '3em',
                        }}
                        offsetTop={15}
                        bounds={15}
                        
                        className='menu-anchor ml-1 mr-1 horizontal-scroll'
                        items={tags} />
                </Col>
            </Row>
            <div className='positions-card'>
                    { tags.map(({ title, value }) => {
                        return (
                        <Col key={value}>
                            <Divider id={`g${value}`}
                                key={value}
                                type='horizontal'
                                orientation='left'
                                style={{ width: "100%" }}>
                            {title}
                            </Divider>
                            <List
                                className='positions-list'
                                dataSource={groupedByTags[value]}
                                loading={loading}
                                renderItem={(item, index) => (
                                    <Card 
                                        key={value + item.id}
                                        className='position-card'>
                                        <Meta
                                            avatar={<Avatar
                                                shape="square"
                                                size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 150, xxl: 200 }}
                                                src={item.image}>
                                                    {item.title}
                                                </Avatar>}
                                            
                                            title={
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Row className='position-card-title'>{item.title}</Row>
                                                        <Row className='ant-card-meta-description'>{item.weight ? item.weight : ''}</Row>
                                                    </Col>
                                                </Row>
                                                <Row align={'middle'} justify={'space-between'}>
                                                    <Col>{getPriceElement(item)}</Col>
                                                    <Col>
                                                        <Row justify={'end'} align={'middle'}>
                                                            { getCount(item.id) > 0 &&(<Button icon={<MinusCircleOutlined />} type='text' shape='circle' danger onClick={() => props.cartService.minusPosition(cart, item)} />)}
                                                            <div>{getCount(item.id)}</div>
                                                            <Button icon={<PlusCircleOutlined style={{ color: 'green'}}/>} type='text' shape='circle' onClick={() => props.cartService.plusPosition(cart, item)} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>}
                                        />
                                    </Card>
                                )}
                            />
                        </Col>
                        );
                    })}
            </div>
        </Col>
    )}