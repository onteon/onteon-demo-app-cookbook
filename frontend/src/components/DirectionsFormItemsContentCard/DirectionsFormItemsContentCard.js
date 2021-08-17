import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import ContentCard from "../../components/ContentCard/ContentCard";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const DirectionsFormItemsContentCard = props => {
    const {directions} = props;

    return (
        <ContentCard title="Directions">
            <Form.List
                name="directions"
                initialValue={directions ? directions : []}
                rules={[
                    {
                        validator: async (_, directions) => {
                            if (!directions || directions.length < 1) {
                                return Promise.reject(new Error('At least 1 direction.'));
                            }
                        },
                    }
                ]}
            >
                {
                    (fields, {add, remove}, {errors}) => (
                        <>
                            {
                                fields.map(field => (
                                    <Form.Item
                                        required={false}
                                        key={field.key}
                                    >
                                        <Row align="middle" gutter={10}>
                                            <Col xs={22}>
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Please input direction",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input.TextArea
                                                        placeholder="Direction"
                                                        autoSize={true}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={2}>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                    style={{fontSize: "16px", position: "relative", top: "-5px"}}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                ))
                            }
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{width: '91.6%'}}
                                    icon={<PlusOutlined/>}
                                />
                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </>
                    )
                }
            </Form.List>
        </ContentCard>
    );
}

export default DirectionsFormItemsContentCard;