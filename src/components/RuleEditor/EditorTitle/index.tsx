import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Row, Col, Input, Typography, InputRef } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { TextAreaRef } from "antd/lib/input/TextArea";

import './index.css';

interface BuilderBodyProps {
  titleName: string;
  disabled?: boolean;
  description?: string;
}

const RuleEditorTitle = ({ titleName, disabled = false, description = '' }: BuilderBodyProps) => {
  const [isNameEditable, setIsNameEditable] = useState<boolean>(false);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState<boolean>(false);
  const nameInputRef = useRef<InputRef | null>(null);
  const textAreaRef = useRef<TextAreaRef | null>(null);

  const nameChangeCallback = (value: string | number) => {
    console.log('>> nameChangeCallback value', value);
  };

  const descriptionChangeCallback = (value: string) => {
    console.log('>>> descriptionChangeCallback value', value);
  };

  const namePlaceholder = () => {
    return `replace-${Date.now()}`;
  };

  const { TextArea } = Input;

  return (
    <div className="rule-editor-title-container">
      {(

        <Row className="editor-title-container">
          <Col className="flex-1">
            <Row className="editor-title-name">
              {titleName.length === 0 || isNameEditable ? (
                <div className="editor-title-name-wrapper">
                  <Input
                    disabled={disabled}
                    ref={nameInputRef}
                    data-tour-id="rule-editor-title"
                    className={`${!titleName ? "error" : null} editor-title-input`}
                    autoFocus={true}
                    onFocus={() => setIsNameEditable(true)}
                    onBlur={() => setIsNameEditable(false)}
                    bordered={false}
                    spellCheck={false}
                    value={titleName}
                    onChange={(e) => nameChangeCallback(e.target.value)}
                    placeholder={'Enter rule name'}
                    onPressEnter={() => setIsNameEditable(false)}
                  />
                </div>
              ) : (
                <div className="editor-title" data-tour-id="rule-editor-title">
                  <Typography.Text
                    ellipsis={true}
                    onClick={() => {
                      if (disabled) {
                        return;
                      }

                      setIsNameEditable(true);
                    }}
                  >
                    {titleName || namePlaceholder()}
                  </Typography.Text>
                  {disabled ? null : <EditOutlined onClick={() => setIsNameEditable(true)} />}
                </div>
              )}
            </Row>
            {(
              <Row className="editor-title-description">
                {(
                  <TextArea
                    disabled={disabled}
                    ref={textAreaRef}
                    autoSize={{ minRows: 1, maxRows: 3 }}
                    onBlur={() => setIsDescriptionEditable(false)}
                    bordered={false}
                    maxLength={180}
                    value={description}
                    onChange={(e) => descriptionChangeCallback(e.target.value)}
                    placeholder={'Add description (optional)'}
                    onPressEnter={() => setIsDescriptionEditable(false)}
                  />
                )}
              </Row>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default RuleEditorTitle;
