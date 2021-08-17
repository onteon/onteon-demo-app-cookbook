import React from 'react';
import {Button, Form, Input} from "antd";
import ContentCard from "../../components/ContentCard/ContentCard";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const IngredientsFormItemsContentCard = props => {
    const {ingredients} = props;


    return (
        <ContentCard title="Ingredients">
            <Form.List
                name="ingredients"
                initialValue={ingredients ? ingredients : []}
                rules={[
                    {
                        validator: async (_, ingredients) => {
                            if (!ingredients || ingredients.length < 1) {
                                return Promise.reject(new Error('At least 1 ingredient.'));
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
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input ingredient",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="Ingredient" style={{width: '60%'}}/>
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                            style={{fontSize: "18px", position: "relative", top: "-4px", left: "10px"}}
                                        />
                                    </Form.Item>
                                ))
                            }
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{width: '60%'}}
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

export default IngredientsFormItemsContentCard;