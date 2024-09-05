import Router from 'koa-router';

const JSON_HACKER_RULE = 'json_hacker_rules';

const safetyStringify = (data: Record<string, unknown> | string | unknown) => {
  let dataStringify;

  try {
    if (typeof data === 'string') {
      dataStringify = data;
    } else {
      dataStringify = JSON.stringify(data, null, 2);
    }
  } catch (error) {
    // noop
  }

  return dataStringify;
};

// For help see https://github.com/ZijianHe/koa-router#api-reference
export default (router: Router) => {
  router.post('/cgi-bin/json-inspect', (ctx) => {
    const { parsedBody } = (ctx.request.body) as Record<string, unknown>;

    const shouldParseAsJsonKeys = ['r5', 'ext'];

    try {
      if (Array.isArray(parsedBody)) {
        parsedBody.map((item: any) => {
          Object.keys(item).forEach(itemKey => {
            // 仅对特定的key的数据进行JSON处理
            if (shouldParseAsJsonKeys.includes(itemKey)) {
              try {
                const result = JSON.parse(decodeURIComponent(item[itemKey]));

                // 重写使用对应的json数据
                item[itemKey] = result;
              } catch (error) {
                console.warn('>>> Fail to parse JSON data and set with pure JSON content', error);
              }
            }
          });

          return item;
        });
      }

      const parsedResult = { json: parsedBody, txt: safetyStringify(parsedBody) };

      ctx.body = parsedResult;
    } catch (error) {
      // noop
    }
  });

  // 定义配置数据写入接口
  router.post('/cgi-bin/set-config', (ctx) => {
    const { localStorage } = ctx.req as any;
    const { ruleData } = ctx.request.body as any;

    // 获取原来的数据
    const originRuleData = localStorage.getProperty(JSON_HACKER_RULE);

    console.log('>>> originRuleData', originRuleData);
    
    // [{ ruleId: '', ruleData: { condtionKey, condtionRule, condtionValue, ruleSet: [{ key: function(values) }] } }]
  
    localStorage.setProperty(JSON_HACKER_RULE, ruleData);
  });

  router.post('/cgi-bin/get-config', (ctx) => {
    const { localStorage } = ctx.req as any;    
    const ruleData = localStorage.getProperty(JSON_HACKER_RULE);

    console.log('>>> getConfig ruleData', ruleData);
  
    ctx.body = ruleData;
  });
};
