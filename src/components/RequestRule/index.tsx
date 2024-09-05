import React, { useEffect, useState, useRef } from 'react';
import { Form, Collapse, Space, Divider, Button, Switch, Flex, Card, Input, Col, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import RuleHeaderInfo from './RuleHeaderInfo';
import RuleBody from './RuleBody';
import ParamsBody from './ParamsBody';


import './index.css';

const FORM_ID_PREFIX = 'request_rule_';

interface DataType {
  idx: number;
  key: string;
  value: string;
  editable?: boolean;
}

// 每一个分组ruleId下的对象有对应的数据
interface GroupRuleConfig {
  ruleId: string;
  ruleKey: string;
  /**
   * Condition contains/regex
   */
  condition: string;
  ruleValue: string;
  requestParams: Array<DataType>, // 对应明细的key 规则: key --> 转换规则
}

export default function RequestRule() {
  const [ruleId, setRuleId] = useState(0);
  const baseRule = {
    key: 0,
    label: 'If request',
    children: (
      <Form id={FORM_ID_PREFIX + ruleId}>
        <RuleHeaderInfo></RuleHeaderInfo>
          
        <Divider />
          
        <Form.Item>
          <label>Request params</label>
        </Form.Item>
          
        <Form.Item>
          <RuleBody></RuleBody>
        </Form.Item>
      </Form>
    ),
  };
  const [collapseItem, setCollapseItem] = useState([baseRule]);
  const [switchText, setSwitchText] = useState('');
  const [enableRule, setEnableRule] = useState(true);
  const [ruleInfoList, setRuleInfoList] = useState([{}]);

  useEffect(() => {
    if (enableRule) {
      setSwitchText('Enable');
    } else {
      setSwitchText('Disable');
    }
  }, [enableRule]);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setEnableRule(checked);
  };

  // 保存规则
  const handleSaveRule = () => {
    console.log('>>> save rule',);

    const cgiOpts = {
      url: 'whistle.json-hacker/cgi-bin/set-config',
      type: 'post',
      mode: 'cancel',
    };
    const getBodyAsPureJson = window.whistleBridge.createRequest(cgiOpts);

    // const ruleData = [{ ruleId: '1', ruleData: { 
    //     condtionKey, 
    //     condtionRule,
    //     condtionValue,
    //     ruleSet: [
    //         { key: function(values)}]}
    //     }];
        
    getBodyAsPureJson({ ruleData: {

    } }, (data: any) => {
      if (!data) {
        return new Error('请求失败, 请点击重试');
      }
  
      console.log('>>> print final data output', data);

      
    });

  };

  const onCollapseChange = () => {
    //
  };

  // 新增规则
  const handleAddRule = () => {
    console.log('>>> add rule with ruleId', ruleId);

    // rule 自增处理
    setRuleId(ruleId + 1);

    const newRuleItem = generateRule();

    // 手风琴新增item
    setCollapseItem([...collapseItem, newRuleItem]);
  };

  const generateRule = () => {
    return {...baseRule, ...{
      key: ruleId + 1,
    }};
  };

  const handleDeleteRule = (ruleItemIndex: number) => {
    console.log('>>> delete rule with ruleId', ruleItemIndex);
  };

  return (
    <Form
      name='rules-details'
    >
      <Form.Item>
        <Flex gap='middle' justify="space-between" align='center'>
          <label className='editor-title'>Override API Request</label>
          <Flex align='center' justify="space-between" gap='small' >
            <Button type='primary' onClick={handleAddRule}>
              Add a rule
            </Button>
            <Button type="primary" onClick={handleSaveRule}>
              Save rule
            </Button>
            <label>{switchText}</label>
            <Switch defaultChecked onChange={onChange} />
          </Flex>
        </Flex>
      </Form.Item>

      <Divider />

      <Collapse
        expandIconPosition={'end'}
        onChange={onCollapseChange}
        items={collapseItem}
        defaultActiveKey={['0']}
      />
      {/* <Form.Item id={FORM_ID_PREFIX + ruleId}>
        <RuleHeaderInfo></RuleHeaderInfo>
          
        <Divider />
          
        <ParamsBody></ParamsBody>
          
      </Form.Item> */}
    </Form>
  );
};
