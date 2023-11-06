import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Input, Row, Upload } from 'antd';
import imageService from '../../services/image-service';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload: React.FC<CustomFormItemProps> = ({ value, onChange, className  }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (event) => {
        if (!event.file) return;

        const file = event.file;
        const url = await imageService.uploadImage(file);
        onChange(url);
    };

    useEffect(() => {
        setUrl(value);
    }, [value]);


    return (
        <>
            <Row wrap={false}>
                <Col flex={'auto'}>
                    <Input className={className} type="url" value={value} onChange={onChange} allowClear/>
                </Col>
                <Col flex={'none'} className='ml-1'>
                    <Upload type="file" onChange={handleFileUpload}
                        action={imageService.uploadImage}
                        accept="image/png, image/jpeg"
                        showUploadList={false}
                        beforeUpload={file => {
                            const reader = new FileReader();
                            reader.onloadstart = (e) =>  setLoading(true);
                            reader.onloadend = (e) => setLoading(false);
                            reader.readAsText(file);
                            return false;
                        }}>
                        <Button icon={<UploadOutlined spinning={loading.toString()}/>}>
                        </Button>
                    </Upload>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <Image src={url} alt='Выберите изображение' style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </Col>
            </Row>
        </>
    );
}

export default FileUpload;