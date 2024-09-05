import React, { useRef, useState, useContext, useEffect } from 'react';
import { Form, Input, Select, Space, Table, Button, Popconfirm } from 'antd';
import type { TableProps, GetRef, InputRef } from 'antd';

import { RULE_FUNCTIONS_LIST } from './RuleFunction';

type FormInstance<T> = GetRef<typeof Form<T>>;
type ColumnTypes = Exclude<TableProps['columns'], undefined>;
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface DataType {
  idx: number;
  key: string;
  value: string;
  editable?: boolean;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  key: React.ReactNode;
  editable: boolean;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
  isFunctionEditor?: boolean;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
    
// 单元格配置
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  key,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  isFunctionEditor,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
    
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
    
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
    
  const save = async () => {
    try {
      const values = await form.validateFields();
    
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
    
  const handleFnEditorChange = (value: string) => {
    console.log(`selected ${value}`);
  };
    
  let childNode = children;
    
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `field is required.` }]}
      >
        {
          isFunctionEditor ?
            <Select
              mode="tags"
              maxCount={1}
              style={{ width: '100%' }}
              onChange={handleFnEditorChange}
              tokenSeparators={[',']}
              options={RULE_FUNCTIONS_LIST}
            /> : 
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        }
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
    
  return <td {...restProps}>{childNode}</td>;
};

const RuleBody = () => {
  const [requestParams, setRequestParams] = useState<Array<DataType | unknown>>([]);
  const [idx, setIdx] = useState(0);

  const handleAdd = () => {
    setIdx(idx + 1);

    const newData: DataType = {
      idx,
      key: 'Key',
      value: 'none',
    };

    console.log('>>> current idx', idx);

    console.log('>>> handleAdd newData', newData);

    console.log('>>> requestParams', requestParams);

    console.log('>>> final results', [...requestParams, newData]);

    setRequestParams([...requestParams, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...requestParams];
    const index = newData.findIndex((item: DataType) => row.idx === item.idx);
    const item: DataType | any = newData[index];
    
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setRequestParams(newData);
  };
    
  const handleDelete = (idx: React.Key) => {
    const newData = requestParams.filter((item: DataType) => item.idx !== idx);
    setRequestParams(newData);
  };

  /**
   * isFunctionEditor: whether open function editor mode
   */
  const defaultColumns : (ColumnTypes[number] & { editable?: boolean; dataIndex: string; isFunctionEditor?: boolean })[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      editable: true,
    },
    {
      title: 'Value转换规则',
      dataIndex: 'value',
      key: 'value',
      editable: true,
      isFunctionEditor: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record: DataType) =>
        requestParams.length >= 1 ? (
          <Space>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.idx)}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ) : null,
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: DataType) => {
        console.log('>>> onCell with current record', record);

        return ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          key: col.key,
          handleSave,
          isFunctionEditor: col.isFunctionEditor,
        });
      },
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        columns={columns as ColumnTypes}
        dataSource={requestParams}
      />
    </div>
  );
};

export default RuleBody;
