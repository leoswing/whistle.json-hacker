import { useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Layout, Divider, Tooltip, Button } from "antd";

interface HeaderProps {
  mode: string;
}

const Header = ({ mode }: HeaderProps) => {
  const getRuleTitle = () => {
    return mode === "create" ? "new rule" : "rule";
  };

  return (
    <Layout.Header className="rule-editor-header" key={''}>
      <Row wrap={false} align="middle" className="rule-editor-row">
        <Col span={6}>
          <Row wrap={false} align="middle">
            <div className="text-gray rule-editor-header-title">
              {getRuleTitle()}
            </div>
          </Row>
        </Col>
  
        (
        <Col span={18} className="ml-auto rule-editor-header-actions-container">
          <Row gutter={8} wrap={false} justify="end" align="middle">
            {/* Enabled 处理 */}

            <Divider type="vertical" />
          </Row>
        </Col>
        )
      </Row>
    </Layout.Header>
  );
};

export default Header;
