import React, {useRef} from 'react';
import {Button, Form, Input} from "antd";
import ContentCard from "../../components/ContentCard/ContentCard";

const BasicDataFormItemsContentCard = props => {
    const {image, setImage} = props;
    const labelCol = {offset: 0, span: 4};

    const hiddenFileInput = useRef(null);

    return (
        <ContentCard title="Basic data">
            <Form.Item
                label="Title"
                name="title"
                rules={[{required: true, message: 'Please input title!'}]}
                labelCol={labelCol}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="image"
                label="Image"
                rules={[
                    {
                        validator: async () => {
                            if (hiddenFileInput.current.files.length === 0) {
                                return Promise.reject(new Error('Please add image!'));
                            }
                        },
                    },
                ]}
                labelCol={labelCol}
            >
                <input
                    ref={hiddenFileInput}
                    type="file"
                    onChange={event => setImage(event.target.files[0])}
                    style={{display: "none"}}/>
                <Button onClick={() => hiddenFileInput.current.click()}>
                    Upload a image
                </Button>
                {image ? <span style={{marginLeft: "10px"}}>{image.name}</span> : ""}

            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{required: true, message: 'Please input description!'}]}
                labelCol={labelCol}
            >
                <Input.TextArea/>
            </Form.Item>
        </ContentCard>
    );
}

export default BasicDataFormItemsContentCard;