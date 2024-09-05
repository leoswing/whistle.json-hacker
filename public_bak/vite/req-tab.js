
;(function() {
    function $(selector) {
      return document.querySelector(selector);
    }
  
    function onClick(elem, l) {
      elem.addEventListener('click', l);
    }
  
    var urlTab = $('#urlTab');
    var bodyTab = $('#bodyTab');
    var urlResult = $('#urlResult');
    var bodyResult = $('#bodyResult');
    var noop = function() {
      //
    };

    function showJsonInspect() {
      urlTab.className = 'active';
      bodyTab.className = '';
      urlResult.style.display = 'block';
      bodyResult.style.display = 'none';
    }
  
    showJsonInspect();
    onClick(urlTab, showJsonInspect);
    onClick(bodyTab, function() {
      urlTab.className = '';
      bodyTab.className = 'active';
      urlResult.style.display = 'none';
      bodyResult.style.display = 'block';
    });
  
    var wb = window.whistleBridge;
    var cgiOpts = {
      url: 'whistle.json-hacker/cgi-bin/json-inspect',
      type: 'post',
      mode: 'cancel',
    };
    var getBodyAsPureJson = wb.createRequest(cgiOpts);

    wb.addSessionActiveListener(function(item) {
        if (!item) {
          urlResult.innerHTML = '请选择抓包数据';
          bodyResult.innerHTML = '请选择抓包数据';
          return;
        }

        bodyResult.innerHTML = '计算中...';

        console.log('>> print item when addSessionActiveListener', item);
    });
  
    wb.addSessionRequestListener(function(item) {
      bodyResult.innerHTML = '测试plugin处理';

      if (!item) {
        return;
      }

      console.log('>>> print item');
      console.log(item);
      console.log('>>> print request item', item.req);

      console.log('>>> print origin request item body >> ');
      console.log(item.req.body);

      var base64 = item.req.base64;

      if (!base64) {
        bodyResult.innerHTML = 'Body 为空';
        return;
      }

      // 解密base64的字符串
      var decodedBodyText = wb.decodeBase64(base64).text;

      console.log('>>> decodedBodyText', decodedBodyText);

      console.log('>>> typeof decodedBodyText', typeof decodedBodyText);

      var parsedBody = {};

      try {
        parsedBody = JSON.parse(decodedBodyText);

        console.log('>>> print parsed object');
        console.log(parsedBody);
      } catch (error) {
        console.warn('>>> Fail to parse json for decodedBody', error);
      }

      var loadParsedJson = function() {
        bodyResult.innerHTML = '计算中...';
        bodyResult.onclick = noop;

        getBodyAsPureJson({ parsedBody: parsedBody }, function(data) {
          if (!data) {
            bodyResult.onclick = loadParsedJson;
            bodyResult.innerHTML = '请求失败，请点击<strong>重试</strong>！';
            return;
          }

          console.log('>>> print final data output', data);

          bodyResult.innerHTML = data.json;
        });
      };
      loadParsedJson();
    });
  })();