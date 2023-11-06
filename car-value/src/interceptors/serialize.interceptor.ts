import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run something before a request is handled by the request handler
    console.log('running before the handler', context);

    return next.handle().pipe(
      map((data) => {
        // run something before the response is sent out
        console.log('running before response is sent out', data);
      }),
    );
  }
}
