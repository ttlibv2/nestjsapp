export class ProxyHelper {

  static requiresRequestBody(method: string): boolean {
    method = method.toLowerCase();
    return ['post', 'patch', 'put'].includes(method);
  }
}