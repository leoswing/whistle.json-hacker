import React, { useState } from 'react';
import { Row, Col, Typography, Input, Dropdown } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';

import { RulePairProps } from './types';

import './RequestSourceRow.css';

type RequestSourceRowProps = RulePairProps & {
  rowIndex: number;
}

const { Text } = Typography;

const RequestSourceRow = ({ rowIndex, pair, isInputDisabled = false }: RequestSourceRowProps) => {
  const [sourceType, setSourceType] = useState('URL');
  const [condtion, setCondition] = useState('Contains');

  const sourceTypeItems: MenuProps['items'] = [
    {
      label: 'URL',
      key: '0',
    },
    {
      label: 'Host',
      key: '1',
    },
  ];

  const conditionItems: MenuProps['items'] = [
    {
      label: 'Contains',
      key: '2',
    },
    {
      label: 'Matches (Regex)',
      key: '3',
    },
  ];

  const onSourceTypeClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`);

    const target = sourceTypeItems.filter((item) => item.key === key);
    const targetSourceType = (target[0] as any)?.label;

    setSourceType(targetSourceType);
  };

  const onConditionClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`onConditionItemsClick ${key}`);

    const target = conditionItems.filter((item) => item.key === key);
    const targetCondition = (target[0] as any)?.label;

    setCondition(targetCondition);
  };

  return (
    <div className="rule-pair-source-row-wrapper">
      <Row
        gutter={6}
        key={rowIndex}
        align="middle"
        data-tour-id="rule-editor-source"
        className="rule-editor-source rules-pair-content-header w-full"
        style={{ marginLeft: 0, marginRight: 0 }}
        wrap={false}
      >
        <Col className="shrink-0">
          <Dropdown menu={{ items: sourceTypeItems, onClick: onSourceTypeClick }}>
            <Text
              strong
              className="rule-pair-source-dropdown cursor-pointer uppercase rq-dropdown"
              onClick={(e) => e.preventDefault()}
            >
              {sourceType}
              <DownOutlined />
            </Text>
          </Dropdown>
        </Col>
        <Col className="shrink-0">
          <Dropdown menu={{ items: conditionItems, onClick: onConditionClick }}>
            <Text
              strong
              className="rule-pair-source-dropdown cursor-pointer rq-dropdown"
              onClick={(e) => e.preventDefault()}
              style={{ textTransform: "capitalize" }}
            >
              {condtion}
              <DownOutlined />
            </Text>
          </Dropdown>
        </Col>
        <Col className="w-full">
          <Input
            autoFocus={true}
            placeholder={
              "Enter url here or leave this field empty to apply rule to all url’s..."  
            }
            type="text"
            onChange={(event: any) => {
              event?.preventDefault?.();
              
              console.log('>>> event?.target?.value', event?.target?.value);
            }}
            className="rules-pair-input"
            value={''}
            disabled={isInputDisabled}
            data-selectionid="source-value"
          />
        </Col>

      </Row>
    </div>
  );
};

export default RequestSourceRow;
