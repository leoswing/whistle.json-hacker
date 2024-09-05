import { Form, Input, Select, Space, Flex } from 'antd';

const RuleHeaderInfo = () => {
  const requestConfigItems = [
    {
      value: 'URL',
      label: 'URL',
    }, {
      value: 'Host',
      label: 'Host',
    }
  ];
    
  const ruleMatchOpts = [
    {
      value: 'Contains',
      label: 'Contains',
    }, {
      value: 'RegEx',
      label: 'Matches (RegEx)',
    }
  ];

  return (
    <Form.Item>
      <Flex gap='small'>
        <Space direction='horizontal'>
          <Select defaultValue="URL" options={requestConfigItems} />
          <Select defaultValue="Contains" options={ruleMatchOpts} />
        </Space>
        <Input defaultValue="report/minipro/v2" />
      </Flex>
    </Form.Item>
  );
};

export default RuleHeaderInfo;
