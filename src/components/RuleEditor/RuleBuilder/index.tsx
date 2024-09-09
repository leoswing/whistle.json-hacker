import { CardBody } from "reactstrap";
import { Row, Col, Collapse, Popconfirm, Tooltip, Button } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';

import EditorTitle from '../EditorTitle';
import ReplaceRulePair from '../ReplaceRulePair';

import './index.css';

interface RuleBuilderProps {
  mode?: string;
  currentlySelectedRuleData: Record<string, any>;
}

interface RulePariProps {
  pairIndex: number;
}

const Body = ({ currentlySelectedRuleData = [{}] }: RuleBuilderProps) => {

  const removeRulePairByIndex = ({ pairIndex }: RulePariProps) => {
    console.log('>>> removeRulePairByIndex with index', pairIndex);
  };

  const deleteButton = (pairIndex: number) => {
    if (pairIndex === 0) {
      return null;
    }
    return (
      <Popconfirm
        placement="left"
        title="Are you sure you want to delete this rule pair?"
        onConfirm={() => removeRulePairByIndex({ pairIndex })}
      >
        <Tooltip title="Remove Pair" placement="bottom" overlayClassName="rq-tooltip">
          <DeleteOutlined
            className="delete-pair-icon cursor-pointer text-gray"
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          />
        </Tooltip>
      </Popconfirm>
    );
  };

  const collapseItems: CollapseProps['items'] = currentlySelectedRuleData.map((pair: any, pairIndex: number) => (
    <Collapse.Panel
      key={pair.index || pairIndex || 1}
      className="rule-pairs-panel"
      extra={deleteButton(pairIndex)}
      header={<span className="panel-header">If request</span>}
    >
      <ReplaceRulePair pair={pair} pairIndex={pairIndex} />

    </Collapse.Panel>
  ));

  return (
    <>
      <EditorTitle
        titleName={currentlySelectedRuleData.name}
        description={currentlySelectedRuleData.description}
      />
      <Row
        className={`rule-builder-body`}
        id="rule-builder-body"
      >
        <Col span={24} style={{ minWidth: "300px" }}>
          <CardBody>
            <Collapse
              className="rule-pairs-collapse"
              defaultActiveKey={['1']}
              expandIconPosition="end"
              items={collapseItems}
            >
            </Collapse>

            <Row justify="end">
              <Col span={24}>
                <Button block type="dashed" className="add-pair-btn" icon={<PlusOutlined />} >
                  <span>
                    <Row align="middle" wrap={false} className="shrink-0">
                      Add a new condition
                    </Row>
                  </span>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Col>
      </Row>
    </>
  );

};

export default Body;
