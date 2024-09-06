interface StoreDataOptions {
    key: string;
    value: string;
}

export function setStore(ctx: any, dataOptions: StoreDataOptions): void {
  const { localStorage } = ctx.req;
  const { key, value } = dataOptions || {};
    

  localStorage.setProperty(key, value);
}

export function getStore(ctx: any, key: string) {
  const { localStorage } = ctx.req;

  return localStorage.getProperty(key);
}
