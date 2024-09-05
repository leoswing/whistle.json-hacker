import React from "react";
import { Row, Col, Input } from "antd";

import { RulePairProps } from './types';

type ReplaceRowProps = RulePairProps & { rowIndex: number }

const ReplacePartRow = ({ rowIndex, pair, pairIndex, isInputDisabled }: ReplaceRowProps) => {
  const updateRulePairAtGivenPath = () => {
    console.log('>>> updateRulePairAtGivenPath trigger');
  };

  const handleInputChange = (e?: any, source?: string) => {
    e?.preventDefault?.();

    console.log('>>> handleInputChange', e, source);
  };

  return (
    <Row align="middle" key={rowIndex} span={24} gutter={16} className="margin-top-one">
      <Col span={12} data-tour-id="rule-editor-replace-from">
        <Input
          type="text"
          value={pair.from}
          addonBefore="Replace"
          placeholder="This part in URL"
          disabled={isInputDisabled}
          onChange={(e) => handleInputChange(e, "from")}
          data-selectionid="replace-from-in-url"
        />
      </Col>
      <Col span={12} data-tour-id="rule-editor-replace-to">
        <Input
          type="text"
          value={pair.to}
          addonBefore="With"
          placeholder="This part"
          disabled={isInputDisabled}
          onChange={(e) => handleInputChange(e, "to")}
          data-selectionid="replace-to-in-url"
        />
      </Col>
    </Row>
  );
};

export default ReplacePartRow;
