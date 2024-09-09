// @ts-ignore
import React, { useState, useEffect } from 'react';

import RequestTabComp from './RequestTabComp';
import { getFormDataAsJson, isFormDataRequest } from './utils/index';

import './req-tab.css';

export default function ReqTab() {
  const [jsonData, setJsonData] = useState({});

  const safetyParseJSON = (jsonStr: string) => {
    let result = {};

    try {
      result = JSON.parse(jsonStr);
    } catch (error) {
      // noop
    }

    return result;
  };

  useEffect(() => {
    const onSubscribeMessage = (item: any) => {
      if (!item) {
        return (new Error('请选择抓包内容'));
      }
    
      const base64 = item.req.base64;
    
      if (!base64) {
        setJsonData({});

        return new Error('Body 为空');
      }

      const wb = window.whistleBridge;
    
      // 解密base64的字符串
      const decodedBodyText = wb.decodeBase64(base64).text;
      const contentType = item.req?.rawHeaders?.['content-type'];
      let parsedBody = {};

      if (contentType && isFormDataRequest(contentType)) {
        try {
          const { payload, property } = getFormDataAsJson(contentType, decodedBodyText);
          const details = payload[property];
          parsedBody = safetyParseJSON(details);
  
        } catch (error) {
          console.debug('>>> getFormDataAsJson occur error', error);
        }
      } else {
        parsedBody = safetyParseJSON(decodedBodyText);
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