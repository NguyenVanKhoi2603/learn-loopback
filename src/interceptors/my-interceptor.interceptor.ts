import {
  globalInterceptor,
  inject, Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';
import {
  Response,
  RestBindings
} from '@loopback/rest';

@globalInterceptor('', {tags: {name: 'myInterceptor'}})
export class MyInterceptorInterceptor implements Provider<Interceptor> {
  constructor(@inject(RestBindings.Http.RESPONSE) private response: Response) { }
  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }



  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      const result = await next();
      if (invocationCtx.methodName === 'find') {
        //this.response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        // this.response.set('X-Total-Count', `7`)
      }

      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
