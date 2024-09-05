import React, { ChangeEvent, useEffect, useState, KeyboardEvent, useRef } from "react";
import { Row, Col, Input, Form, Button, Select, Descriptions } from 'antd';
import type { TableProps, GetRef, InputRef } from 'antd';

import { RULE_FUNCTIONS_LIST } from './RuleFunction';

interface RuleInfoListProps {
  ruleInfoList?: any[];
}

interface RuleDataItemType {
    index: number;
    key: string;
    valueRule?: string;
}

export default function ParamsBody({ ruleInfoList = [] }: RuleInfoListProps) {
  const [insertRow, setInsertRow] = useState(false);
  const [rulesInfoData, setRulesInfoData] = useState(ruleInfoList);
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleAdd = () => {
    setRulesInfoData([...rulesInfoData, {
      index: getRuleMaxIndexById() + 1,
      key: '',
      valueRule: 'none',
    }]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('>>> handleInputChange', e.target.value);
    const target = e.target.value;

    if (target.length > 0) {
      const newData = {
        key: 'xxx',
        valueRule: 'none',
      };

      const newArrayList = [...ruleInfoList, newData];

      ruleInfoList.push(newData);

      console.log('>> 写入数组，当前数组length是', newArrayList.length);

      setRulesInfoData(newArrayList);
    }

  };

  const getRuleMaxIndexById = (id?: string | number) => {
    console.log('>>> id', id);

    if (rulesInfoData.length === 0) {
      return 0;
    }

    const rulesItem = rulesInfoData.map(item => (item.index));

    return Math.max(...rulesItem);
  };

  // 保存当前item
  const saveRuleItem = (item: RuleDataItemType) => {
    const { index = 1, key = '', valueRule = 'none' } = item || {};

  };

  // @ts-ignore
  const handleReqKeyChange = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = '';

    console.log('>>> handleReqKeyChange', target);

    const nextRulesInfoData = rulesInfoData.map(item => {

      console.log('>>>> handleReqKeyChange current item', item);

      if (item.index === index) {
        return {
          ...item,
          key: target
        };
      } else {
        return item;
      }
    });

    console.log('>>> nextRulesInfoData', nextRulesInfoData);

    setRulesInfoData(nextRulesInfoData);
  };

  const toggleEdit = () => {
    setEditing(!editing);
    // form.setFieldsValue({ reqKey: record[index] });
  };

  const save = async () => {
    const values = await form.validateFields();

    toggleEdit();

    console.log('>>> save with values', values);
  };

  const handleFnEditorChange = (value: string, item: RuleDataItemType) => {
    console.log(`selected ${value}`);
    console.log('selected item index', item);

    const nextRulesInfoData = rulesInfoData.map(item => {
      if (item.index === item.index) {
        return {
          ...item,
          valueRule: value
        };
      } else {
        return item;
      }
    });

    setRulesInfoData(nextRulesInfoData);
  };

  const setDynamicFieldValue = (index: number, value: string) => {
    const fieldsValue = form.getFieldsValue();
    const dynamicFieldsValue = fieldsValue.dynamicFields || [];
    dynamicFieldsValue[index] = value;
    form.setFieldsValue({ dynamicFields: dynamicFieldsValue });
  };

  return (
    <>
      <Form form={form}>
        <Form.Item>
          Request params
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAdd}>Add a row</Button>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={4}>Key</Col>
            <Col span={20}>Value转换规则</Col>
          </Row>
          <Row>
            {/* <Form.List name="dynamicFields"> */}
            {rulesInfoData && rulesInfoData.length >0 ? rulesInfoData.map((item: any) => (
              <>
                <Col span={4}>
                  <Form.Item name="reqKey">
                    <Input ref={inputRef} key={item.key} value={item.key} onChange={(e: any) => setDynamicFieldValue(item.index, e.target.value)} onPressEnter={() => save()} onBlur={save}></Input>
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Select
                    mode="tags"
                    maxCount={1}
                    style={{ width: '100%' }}
                    onChange={(value) => handleFnEditorChange(value, item)}
                    tokenSeparators={[',']}
                    options={RULE_FUNCTIONS_LIST}
                  />
                </Col>
              </>
            )) : 
              <>
                <Descriptions items={[{
                  key: '1',
                  label: 'No data',
                  span: 4,
                  children: 'empty'
                }]}></Descriptions>
              </>}
            {/* </Form.List> */}
          </Row>

        </Form.Item>
      </Form>
    </>
  );
}