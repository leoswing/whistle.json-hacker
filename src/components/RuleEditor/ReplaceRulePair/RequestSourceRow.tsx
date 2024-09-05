import { Row, Col, Typography, Input } from 'antd';
import { DownOutlined } from "@ant-design/icons";

import { RQDropdown } from '../Dropdown';

import { RulePairProps } from './types';

import './RequestSourceRow.css';

type RequestSourceRowProps = RulePairProps & {
  rowIndex: number;
}

const { Text } = Typography;

const RequestSourceRow = ({ rowIndex, pair, pairIndex, ruleDetails, isInputDisabled = false }: RequestSourceRowProps) => {
  return (
    <div className="rule-pair-source-row-wrapper">
      <Row
        gutter={6}
        key={rowIndex}
        align="middle"
        data-tour-id="rule-editor-source"
        className="rules-pair-content-header w-full"
        style={{ marginLeft: 0, marginRight: 0 }}
        wrap={false}
      >

        <Col className="shrink-0">
          <RQDropdown disabled={isInputDisabled}>
            <Text
              strong
              className="rule-pair-source-dropdown cursor-pointer uppercase"
              onClick={(e) => e.preventDefault()}
            >
              {pair.source.key} {!isInputDisabled && <DownOutlined />}
            </Text>
          </RQDropdown>
        </Col>
        <Col className="shrink-0">
          <RQDropdown disabled={isInputDisabled}>
            <Text
              strong
              className="rule-pair-source-dropdown cursor-pointer"
              onClick={(e) => e.preventDefault()}
              style={{ textTransform: "capitalize" }}
            >
              { "RegEx"}
              {!isInputDisabled && <DownOutlined />}
            </Text>
          </RQDropdown>
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
            value={pair.source.value}
            disabled={isInputDisabled}
            data-selectionid="source-value"
          />
        </Col>

      </Row>
    </div>
  );
};

export default RequestSourceRow;
