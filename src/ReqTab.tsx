// @ts-ignore
import React, { useState, useEffect } from 'react';

import RequestTabComp from './RequestTabComp';

import './req-tab.css';

export default function ReqTab() {
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    const onSubscribeMessage = (item: any) => {
      if (!item) {
        return (new Error('请选择抓包内容'));
      }
    
      const base64 = item.req.base64;
    
      if (!base64) {
        return new Error('Body 为空');
      }

      const wb = window.whistleBridge;
    
      // 解密base64的字符串
      const decodedBodyText = wb.decodeBase64(base64).text;
    
      let parsedBody = {};
    
      try {
        parsedBody = JSON.parse(decodedBodyText);
      } catch (error) {
        // noop
      }
  
      const cgiOpts = {
        url: 'whistle.json-hacker/cgi-bin/json-inspect',
        type: 'post',
        mode: 'cancel',
      };
      const getBodyAsPureJson = wb.createRequest(cgiOpts);
        
      getBodyAsPureJson({ parsedBody: parsedBody }, (data: any) => {
        if (!data) {
          return new Error('请求失败, 请点击重试');
        }
  
        setJsonData(data);
      });
    };

    // subscribe events
    window.whistleBridge.addSessionRequestListener(onSubscribeMessage);

    return () => {
      window.whistleBridge.removeSessionRequestListener(onSubscribeMessage);
    };
  }, []);

  return (<RequestTabComp jsonData={jsonData}></RequestTabComp>);

};