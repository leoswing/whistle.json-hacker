import React, { useEffect } from 'react';
import { Col } from "antd";
import ProCard from "@ant-design/pro-card";

import RuleBuilder from "./RuleBuilder";
import EditorHeader from "./Header";

const RuleEditor = ({ mode = 'create' }) => {
  // test rule data
  const currentlySelectedRuleData = {};

  return (
    <Col className="overflow-hidden h-full">
      <EditorHeader
        mode={mode}
      />
  
      <ProCard className="rule-editor-procard rule-editor-body-scroll">
        <RuleBuilder currentlySelectedRuleData = {currentlySelectedRuleData} />
      </ProCard>
    </Col>
  );
};

export default RuleEditor;
