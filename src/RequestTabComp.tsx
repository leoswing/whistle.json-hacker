// @ts-ignore
import React, { useState, useEffect, useRef } from 'react';
import { JSONTree } from 'react-json-tree';
import Clipboard from 'clipboard';

import ContextMenu from './components/ContextMenu';

import './req-tab.css';

type RequestTabProps = {
  isJsonView?: boolean;
  jsonData?: Record<string, any>;
}

const RequestTabComp = ({ jsonData }: RequestTabProps) => {
  const [jsonView, setJsonView] = useState(true);
  const [copied, setCopied] = useState(false);
  const copyBtnRef = useRef(null);
  const [shouldExpandNode, setShouldExpandNode] = useState(true);

  const handleExpandAll = (event: any) => {
    event.preventDefault();
    console.log('>>> expand all');
    setShouldExpandNode(true);
  };

  const handleCollapseAll = (event: any) => {
    event.preventDefault();
    console.log('>>> collapse all');
    setShouldExpandNode(false);
  };

  const contextMenuList = [
    { name: 'Expand All', onClick: handleExpandAll },
    { name: 'Collapse All', onClick: handleCollapseAll }
  ];
  
  useEffect(() => {
    if (copyBtnRef.current) {
      const clipboard = new Clipboard(copyBtnRef.current, {
        text: () => jsonData.txt
      });

      clipboard.on('success', () => {
        console.log('copy success');
      });

      clipboard.on('error', () => {
        clipboard?.destroy?.();
      });

      return () => {
        clipboard?.destroy?.();
      };
    }
  }, [copyBtnRef, jsonData]);

  const toggleJsonView = () => {
    setJsonView(!jsonView);
  };

  const handleLeave = () => {
    setCopied(false);
  };


  const handleCopy = () => {
    setCopied(true);
  };

  // @ts-ignore
  const theme = {
    scheme: 'monokai',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
  };

  const noData = !jsonData || Object.keys(jsonData).length === 0;

  return (
    <>
      {jsonData && Object.keys(jsonData).length > 0 &&
        <div
          className={
            'fill orient-vertical-box w-properties-wrap w-json-viewer' +
          (noData ? ' hide' : '')
          }
        >
          <div className='w-textarea-bar'>
            <a
              onMouseLeave={handleLeave}
              onClick={handleCopy}
              style={copied && copyBtnRef ? { color: '#ccc', cursor: 'not-allowed' } : undefined}
              className={'w-copy-btn' + (copied ? '' : ' w-copy-text')}
              draggable="false"
              ref={copyBtnRef}
            >
              {(copied ? 'Copied' : 'Copy')}
            </a>
            <a onClick={toggleJsonView} className="w-properties-btn">
              {jsonView ? 'Text' : 'JSON'}
            </a>
          </div>
          <div
            className={'fill w-json-viewer-tree' + (jsonView ? ' hide' : '')}
          >
            {jsonView ?
              (
                <JSONTree data={jsonData.json} theme={theme} invertTheme shouldExpandNode={() => shouldExpandNode} />
              ) :
              (<textarea value={jsonData.txt} readOnly className={'fill w-json-viewer-str' + (jsonView ? '' : ' hide')} />)
            }
          </div>
          <ContextMenu menu={contextMenuList} shouldCustomContextMenu={jsonView} />
        </div>
      }
    </>
  );
};

export default RequestTabComp;
