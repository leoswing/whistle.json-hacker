import { Row, Col, Divider, Button } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';

// import './index.css';

interface HeaderProps {
  mode: string;
}

const Header = ({ mode }: HeaderProps) => {
  const getRuleTitle = () => {
    return mode === "create" ? "Create new rule" : "Edit rule";
  };

  const navigateToHelp = () => {
    console.log('>>> navigateToHelp');
    window.open('https://github.com/leoswing/whistle.json-hacker/blob/main/README.md', '_blank');
  };

  return (
    <Row wrap={false} align="middle" className="rule-editor-row">
      <Col span={6}>
        <Row wrap={false} align="middle">
          <div className="text-gray rule-editor-header-title">
            {getRuleTitle()}
          </div>
        </Row>
      </Col>
  
      <Col span={18} className="ml-auto rule-editor-header-actions-container">
        <Row gutter={8} wrap={false} justify="end" align="middle">
          <QuestionCircleOutlined  onClick={navigateToHelp}/>
          <Divider type="vertical" />
          <Button type="primary">Save rule</Button>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
