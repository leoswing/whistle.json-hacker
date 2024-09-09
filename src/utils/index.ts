/**
 * 判断是否为 FormData request
 * @param contentType request content type
 * @returns 
 */
export const isFormDataRequest = (contentType: string): boolean => {
  const re1 = new RegExp('^multipart/form-data; *boundary=(.+)$');

  return re1.test(contentType);
};

export const getFormDataAsJson = (contentType: string, body: string) => {
  const re1 = new RegExp('^multipart/form-data; *boundary=(.+)$');
  let match = re1.exec(contentType);
  const boundary = match[1];
  const blength = boundary.length;
  const re2 = new RegExp('^--' + boundary + '$', 'gm');
  const re3 = new RegExp('^Content-Disposition: form-data; name="(.+)"$[\r\n]+(.+)$', 'm');
  let section: any;
  const payload: any = {};
  let property: string;

  while ((section = re2.exec(body)) !== null) {
    const start = section.index + blength + 1;
    const blob = body.substring(start, section.lastIndex);
    match = re3.exec(blob);

    if (match) {
      property = match[1];

      payload[property] = match[2];
    }
  }

  return {
    payload,
    property,
  };
};